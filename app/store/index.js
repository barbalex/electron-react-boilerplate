import { extendObservable } from 'mobx'

import app from './app'
import appActions from './actions/app'
import user from './user'
import userActions from './actions/user'
import table from './table'
import tableActions from './actions/table'
import pages from './pages'
import pagesActions from './actions/pages'
import geschaefteKontakteIntern from './geschaefteKontakteIntern'
import geschaefteKontakteInternActions from './actions/geschaefteKontakteIntern'
import geschaefteKontakteExtern from './geschaefteKontakteExtern'
import geschaefteKontakteExternActions from './actions/geschaefteKontakteExtern'
import geschaefte from './geschaefte'
import geschaefteActions from './actions/geschaefte'

function Store() {
  this.app = app
  extendObservable(this, appActions(this))
  this.geschaefte = geschaefte
  extendObservable(this, geschaefteActions(this))
  this.geschaefteKontakteExtern = geschaefteKontakteExtern
  extendObservable(this, geschaefteKontakteExternActions(this))
  this.geschaefteKontakteIntern = geschaefteKontakteIntern
  extendObservable(this, geschaefteKontakteInternActions(this))
  this.pages = pages
  extendObservable(this, pagesActions(this))
  this.table = table
  extendObservable(this, tableActions(this))
  this.user = user
  extendObservable(this, userActions(this))
}

export default new Store()
