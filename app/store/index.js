import { extendObservable, computed } from 'mobx'

import observablehistory from './observableHistory'
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
import geschaefteActions from './actions/geschaefte'
import addComputedValuesToGeschaefte from '../src/addComputedValuesToGeschaefte'
import filterGeschaeftePlus from '../src/filterGeschaeftePlus'
import sortGeschaeftePlusFiltered from '../src/sortGeschaeftePlusFiltered'

function Store() {
  this.history = observablehistory
  this.app = app
  extendObservable(this, appActions(this))
  this.geschaefte = {}
  extendObservable(this.geschaefte, {
    fetching: false,
    error: [],
    geschaefte: [],
    geschaeftePlus: computed(() =>
      addComputedValuesToGeschaefte(this)
    ),
    geschaeftePlusFiltered: computed(() =>
      filterGeschaeftePlus(this)
    ),
    geschaeftePlusFilteredAndSorted: computed(() =>
      sortGeschaeftePlusFiltered(this)
    ),
    links: [],
    geko: [],
    filterFields: [],
    filterFulltext: '',
    filterType: null,
    sortFields: [],
    // dropdown lists
    abteilungOptions: [],
    rechtsmittelErledigungOptions: [],
    parlVorstossTypOptions: [],
    statusOptions: [],
    geschaeftsartOptions: [],
    aktenstandortOptions: [],
    interneOptions: [],
    externeOptions: [],
    // following: state for active geschaeft
    activeId: null,
    willDelete: false,
  })
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
