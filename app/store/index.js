import {
  extendObservable,
} from 'mobx'

import app from './app'
import appActions from './actions/app'
import user from './user'
import userActions from './actions/user'
import table from './table'
import tableActions from './actions/table'

function Store() {
  this.app = app
  extendObservable(this, appActions(this))
  this.geschaefte = {}
  this.geschaefteKontakteExtern = {}
  this.geschaefteKontakteIntern = {}
  this.pages = {}
  this.table = table
  extendObservable(this, tableActions(this))
  this.user = user
  extendObservable(this, userActions(this))
}

export default new Store()
