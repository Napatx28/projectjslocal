const { Router } = require('express')
const { guardMiddleware } = require('../middleware/guard.js')
const { bookTransactionModel } = require('../models/book-transaction.js')
const { query, body } = require('express-validator')
const logger = require('node-color-log')
const { userModel } = require('../models/user.js')
const { BorrowCounter, BORROW_LIMIT } = require('../utils/borrow-counter.js')
const { getLimitDate } = require('../utils/limit-borrow-date.js')
const { bookModel } = require('../models/book.js')
const { BORROW_FINE_RATE, getFineRate } = require('../utils/fine-rate.js')

const router = Router()

router.put(
  '/return',
  guardMiddleware('admin'),
  query('id').isString(),
  async (req, res) => {
    try {
      const { id } = req.query
      const book = await bookTransactionModel.findByIdAndUpdate(
        id,
        {
          returned_date: new Date(),
        },
        {
          new: true,
        }
      )
      res.json(book)
    } catch (e) {
      logger.color('red').error(e.stack)
      res.status(500).json({
        error: e.message,
      })
    }
  }
)

router.put(
  '/borrow',
  guardMiddleware('admin'),
  body('id').isString(),
  body('user').isString(),
  body('endDate').optional({ nullable: true }).isDate(),
  async (req, res) => {
    try {
      const { id, ...updateField } = req.body
      const book = await bookTransactionModel.create({
        book: id,
        ...updateField,
      })
      res.json(book)
    } catch (e) {
      logger.color('red').error(e.stack)
      res.status(500).json({
        error: e.message,
      })
    }
  }
)

router.get('/available', guardMiddleware('admin'), async (req, res) => {
  try {
    const books = await bookTransactionModel.find({
      returned_date: null,
    })
    res.json(books)
  } catch (e) {
    logger.color('red').error(e.stack)
    res.status(500).json({
      error: e.message,
    })
  }
})

router.get(
  '/all-borrow',
  guardMiddleware('admin', 'user'),
  async (req, res) => {
    const transactions = await bookTransactionModel
      .find({
        user: req.user.id,
        returned_date: null,
      })
      .populate('book')
      .populate('user')
      .exec()

    res.json(transactions)
  }
)

router.get('/all', guardMiddleware('admin', 'user'), async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const transactions = await bookTransactionModel
        .find({})
        .populate('book')
        .populate('user')
        .exec()

      res.json(
        transactions.map((transaction) => {
          const _ = { ...transaction, fine: getFineRate(transaction) }
          console.log(_)
          return _
        })
      )
    } else {
      const transactions = await bookTransactionModel
        .find({
          user: req.user.id,
        })
        .populate({
          path: 'book',
          select: 'title',
        })
        .populate({
          path: 'user',
          select: 'firstName lastName',
        })
        .exec()

      res.json(transactions)
    }
  } catch (e) {
    logger.color('red').error(e.stack)
    res.status(500).json({
      error: e.message,
    })
  }
})

router.get(
  '/borrow-remain',
  query('type').isIn(['หนังสือ', 'ซีดี', 'หนังสือจอง']),
  guardMiddleware('admin', 'user'),
  async (req, res) => {
    const user = await userModel.findById(req.user.id)
    const borrowCounter = new BorrowCounter(user)
    const remain = await borrowCounter.count(req.query.type)
    console.log(remain)
    res.json(remain)
  }
)

router.get(
  '/rate',
  query('job').isIn(['ครู', 'นักเรียน', 'เจ้าหน้าที่', 'บุคคลภายนอก']),
  async (req, res) => {
    console.error(req.query.job)
    res.json({
      book: BORROW_LIMIT[req.query.job]?.['หนังสือ'],
      cd: BORROW_LIMIT[req.query.job]?.['ซีดี'],
      reservedBook: BORROW_LIMIT[req.query.job]?.['หนังสือจอง'],
    })
  }
)

router.get(
  '/end-date',
  query('type').isIn(['หนังสือ', 'ซีดี', 'หนังสือจอง']),
  query('job').isIn(['นักเรียน', 'ครู', 'เจ้าหน้าที่', 'บุคคลภายนอก']),
  async (req, res) => {
    res.json({ limitDate: getLimitDate(req.query.job, req.query.type) })
  }
)

module.exports = router
