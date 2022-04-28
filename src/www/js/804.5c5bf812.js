"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[804],{6097:function(e,t,s){s.d(t,{Z:function(){return v}});var i=s(5615),n=s(8488),l=s(1327),r=s(9132),a=Object.defineProperty,h=Object.defineProperties,o=Object.getOwnPropertyDescriptors,c=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,p=(e,t,s)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,m=(e,t)=>{for(var s in t||(t={}))u.call(t,s)&&p(e,s,t[s]);if(c)for(var s of c(t))d.call(t,s)&&p(e,s,t[s]);return e},I=(e,t)=>h(e,o(t));const f=I(m({},i.l),{offsetY:!0,offsetOverflow:!0,transition:!1});var v=i.Z.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,s)=>s.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:i.Z.options.props.menuProps.type,default:()=>f},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return I(m({},i.Z.options.computed.classes.call(this)),{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map((e=>this.getValue(e)))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some((e=>!this.hasItem(e))):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((e=>{const t=(0,r.qF)(e,this.itemText),s=null!=t?String(t):"";return this.filter(e,String(this.internalSearch),s)}))},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=i.Z.options.computed.$_menuProps.call(this);return e.contentClass=`v-autocomplete__content ${e.contentClass||""}`.trim(),m(m({},f),e)},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find((e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue))))},listData(){const e=i.Z.options.computed.listData.call(this);return e.props=I(m({},e.props),{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=null)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(e,t){if(e!==t){if(!this.autoSelectFirst){const s=t[this.$refs.menu.listIndex];s?this.setMenuIndex(e.findIndex((e=>e===s))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.autoSelectFirst&&e.length&&(this.setMenuIndex(0),this.$emit("update:list-index",this.$refs.menu.listIndex)))}))}},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===r.Do.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===r.Do.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==r.Do.backspace&&e!==r.Do["delete"]||this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const s=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==s)return void(this.selectedIndex=s);const i=this.selectedItems.length,n=e!==i-1?e:e-1,l=this.selectedItems[n];l?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=n},clearableCallback(){this.internalSearch=null,i.Z.options.methods.clearableCallback.call(this)},genInput(){const e=n.Z.options.methods.genInput.call(this);return e.data=(0,l.ZP)(e.data,{attrs:{"aria-activedescendant":(0,r.vO)(this.$refs.menu,"activeTile.id"),autocomplete:(0,r.vO)(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=i.Z.options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?i.Z.options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,s=t.value;t.value&&this.activateMenu(),this.multiple||""!==s||this.deleteCurrentItem(),this.internalSearch=s,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[r.Do.home,r.Do.end].includes(t)||i.Z.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){i.Z.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){i.Z.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){i.Z.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick((()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))}))},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){var t,s;if(-1===this.selectedIndex)return;const i=this.selectedItems[this.selectedIndex],n=this.getText(i);null==(t=e.clipboardData)||t.setData("text/plain",n),null==(s=e.clipboardData)||s.setData("text/vnd.vuetify.autocomplete.item+plain",n),e.preventDefault()}}})},2804:function(e,t,s){s.r(t),s.d(t,{default:function(){return S}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-form",[s("v-row",[s("v-col",{staticClass:"pt-6 pb-0",attrs:{cols:"12"}},[s("v-autocomplete",{attrs:{items:e.transactions,"item-text":"_id","item-value":"_id",label:"หนังสือ",outlined:""},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),e.error?s("v-col",{staticClass:"pt-0 pb-0",attrs:{cols:"12"}},[s("v-alert",{attrs:{type:"error"}},[e._v(e._s(e.error))])],1):e._e(),s("v-col",{staticClass:"pt-0 pb-0 text-right",attrs:{cols:"12"}},[s("v-btn",{attrs:{color:"primary"},on:{click:e.click}},[e._v(" สร้างรายการ ")])],1)],1)],1)},n=[],l=(e,t,s)=>new Promise(((i,n)=>{var l=e=>{try{a(s.next(e))}catch(t){n(t)}},r=e=>{try{a(s.throw(e))}catch(t){n(t)}},a=e=>e.done?i(e.value):Promise.resolve(e.value).then(l,r);a((s=s.apply(e,t)).next())})),r={data:()=>({form:{},error:null}),computed:{transactions(){return this.$store.state.transaction.transactions}},created(){return l(this,null,(function*(){yield this.$store.dispatch("transaction/fetchNotReturnedTransactions")}))},methods:{click(){return l(this,null,(function*(){yield this.$store.dispatch("transaction/return",this.form.id).then((()=>this.$router.push("/history-transaction"))).catch((e=>{this.error=e}))}))}}},a=r,h=s(1001),o=s(3453),c=s.n(o),u=s(3007),d=s(6097),p=s(9856),m=s(8154),I=s(9961),f=s(7714),v=(0,h.Z)(a,i,n,!1,null,null,null),S=v.exports;c()(v,{VAlert:u.Z,VAutocomplete:d.Z,VBtn:p.Z,VCol:m.Z,VForm:I.Z,VRow:f.Z})}}]);
//# sourceMappingURL=804.5c5bf812.js.map