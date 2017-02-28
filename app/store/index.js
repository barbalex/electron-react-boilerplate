/* eslint-disable no-param-reassign */
import { extendObservable, computed } from 'mobx'

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
import getDauerBisFristMitarbeiter from '../src/getDauerBisFristMitarbeiter'
import getFristMitarbeiterWarnung from '../src/getFristMitarbeiterWarnung'
import getItKontoForVerantwortlich from '../src/getItKontoForVerantwortlich'

function Store() {
  this.app = app
  extendObservable(this, appActions(this))
  this.geschaefte = {}
  extendObservable(this.geschaefte, {
    fetching: false,
    error: [],
    geschaefte: [],
    geschaeftePlus: computed(() =>
      this.geschaefte.geschaefte.map((g) => {
        const { interneOptions, externeOptions, geko, links, faelligeStatiOptions } = this.geschaefte
        const interne = this.geschaefteKontakteIntern.geschaefteKontakteIntern
        const externe = this.geschaefteKontakteExtern.geschaefteKontakteExtern
        g.verantwortlichName = interneOptions
          .filter(i => i.kurzzeichen === g.verantwortlich)
          .map(i =>
            (i.name ? `${i.vorname} ${i.name}` : '')
          )
          .join(', ')
        g.interne = interne
          .filter(i => i.idGeschaeft === g.idGeschaeft)
          .map((gk) =>
            interneOptions.find(i => i.id === gk.idKontakt) || null
          )
        g.externe = externe
          .filter(i => i.idGeschaeft === g.idGeschaeft)
          .map((gk) =>
            externeOptions.find(i => i.id === gk.idKontakt) || null
          )
        g.verantwortlichItKonto = getItKontoForVerantwortlich(this.geschaefte.interneOptions, g.verantwortlich)
        g.geko = geko
          .filter(gko => gko.idGeschaeft === g.idGeschaeft)
        g.links = links
          .filter(link => link.idGeschaeft === g.idGeschaeft)
        g.kannFaelligSein = faelligeStatiOptions ? faelligeStatiOptions.includes(g.status) : false
        g.dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(g)
        g.fristMitarbeiterWarnung = getFristMitarbeiterWarnung(g.dauerBisFristMitarbeiter)
        return g
      })
    ),
    links: [],
    geko: [],
    geschaefteGefilterteIds: [],
    filterFields: [],
    filterFulltext: '',
    filterType: null,
    sortFields: [],
    // dropdown lists
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
