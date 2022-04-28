const { bookTransactionModel } = require('../models/book-transaction.js')

const BORROW_LIMIT = {
  นักเรียน: {
    หนังสือ: 5,
    ซีดี: 5,
    หนังสือจอง: 2,
  },
  ครู: {
    หนังสือ: 10,
    ซีดี: 10,
    หนังสือจอง: 2,
  },
  เจ้าหน้าที่: {
    หนังสือ: 5,
    ซีดี: 5,
    หนังสือจอง: 2,
  },
  บุคคลภายนอก: {
    หนังสือ: 5,
    ซีดี: 5,
    หนังสือจอง: 2,
  },
}

class BorrowCounter {
  /**
   *
   * @param {*} user User Document (require job,_id)
   */
  constructor(user) {
    this.user = user
  }

  async count(type) {
    const borrowList = await bookTransactionModel
      .find({
        user: this.user._id,
        returned_date: null,
      })
      .populate('book')
      .exec()

    const typedBorrow = borrowList.filter(
      ({ book }) => book.book_type === type
    ).length

    return {
      remain: BORROW_LIMIT[this.user.job][type] - typedBorrow,
      borrowed: typedBorrow,
    }
  }
}

module.exports = { BorrowCounter, BORROW_LIMIT }
