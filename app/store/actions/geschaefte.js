/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import _ from 'lodash'
import moment from 'moment'

import getGeschaefteFromDb from '../../src/getGeschaefteFromDb'
import getGekoFromDb from '../../src/getGekoFromDb'
import getLinkFromDb from '../../src/getLinksFromDb'
import getDropdownOptions from '../../src/getDropdownOptions'
import getFaelligeStatiOptions from '../../src/getFaelligeStatiOptions'
import getInterneOptions from '../../src/getInterneOptions'
import getExterneOptions from '../../src/getExterneOptions'
import updateGeschaeft from '../../src/updateGeschaeft'
import updateGeko from '../../src/updateGeko'
import newGeschaeftInDb from '../../src/newGeschaeftInDb'
import newGekoInDb from '../../src/newGekoInDb'
import newLinkInDb from '../../src/newLinkInDb'
import deleteGeschaeft from '../../src/deleteGeschaeft'
import deleteGeko from '../../src/deleteGeko'
import deleteLink from '../../src/deleteLink'
import geschaefteSortByFieldsGetSortFields from '../../src/geschaefteSortByFieldsGetSortFields'

export default store => ({
  geschaeftPdfShow: action(() => store.history.push('/geschaeftPdf')),
  getGeschaefte: action(() => {
    const { app } = store
    store.geschaefte.fetching = true
    store.geschaefte.error = []
    getGeschaefteFromDb(app.db)
      .then(geschaefte => {
        store.geschaefte.fetching = false
        store.geschaefte.error = []
        store.geschaefte.geschaefte = geschaefte
        if (store.history.location.pathname !== '/geschaefte') {
          store.history.push('/geschaefte')
        }
      })
      .catch(error => {
        store.geschaefte.fetching = false
        store.geschaefte.error.push(error)
      })
  }),
  geschaeftToggleActivated: action(idGeschaeft => {
    store.geschaefte.activeId = store.geschaefte.activeId && store.geschaefte.activeId === idGeschaeft ? null : idGeschaeft
  }),
  geschaefteFilterByFields: action((filterFields, filterType = 'nach Feldern') => {
    const { pages } = store
    const { geschaeftePlusFilteredAndSorted } = store.geschaefte
    store.geschaefte.filterFields = filterFields
    store.geschaefte.filterFulltext = ''
    store.geschaefte.filterType = filterType || null
    store.geschaefte.activeId = null
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = store.history.location.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    } else if (geschaeftePlusFilteredAndSorted.length === 1) {
      store.geschaeftToggleActivated(geschaeftePlusFilteredAndSorted[0].idGeschaeft)
    }
  }),
  geschaefteResetSort: action(() => {
    store.geschaefte.sortFields = []
  }),
  geschaefteSortByFields: action((field, direction) => {
    const { pages } = store
    const sortFields = geschaefteSortByFieldsGetSortFields(store, field, direction)
    store.geschaefte.sortFields = sortFields
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = store.history.location.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    }
  }),
  geschaefteFilterByFulltext: action((filterFulltext, filterType = 'nach Volltext') => {
    const { pages, geschaefte } = store
    const { geschaeftePlusFilteredAndSorted } = geschaefte
    store.geschaefte.filterType = filterType || null
    store.geschaefte.filterFulltext = filterFulltext
    store.geschaefte.filterFields = []
    store.geschaefte.activeId = null
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = store.history.location.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    } else {
      if (path !== '/geschaefte') {
        store.history.push('/geschaefte')
      }
      if (geschaeftePlusFilteredAndSorted.length === 1) {
        store.geschaeftToggleActivated(geschaeftePlusFilteredAndSorted[0].idGeschaeft)
      }
    }
  }),
  geschaefteRemoveFilters: action(() => {
    store.geschaefte.GefilterteIds = _.sortBy(store.geschaefte.geschaefte, g => g.idGeschaeft)
      .reverse()
      .map(g => g.idGeschaeft)
    store.geschaefte.filterFields = []
    store.geschaefte.filterType = null
    store.geschaefte.filterFulltext = ''
    store.geschaefte.sortFields = []
  }),
  getGeko: action(() => {
    const { app } = store
    store.geschaefte.fetching = true
    store.geschaefte.error = []
    getGekoFromDb(app.db)
      .then(geko => {
        store.geschaefte.fetching = false
        store.geschaefte.error = []
        store.geschaefte.geko = geko
      })
      .catch(error => {
        store.geschaefte.fetching = false
        store.geschaefte.error.push(error)
      })
  }),
  getLinks: action(() => {
    const { app } = store
    store.geschaefte.fetching = true
    store.geschaefte.error = []
    getLinkFromDb(app.db)
      .then(links => {
        store.geschaefte.fetching = false
        store.geschaefte.error = []
        store.geschaefte.links = links
      })
      .catch(error => {
        store.geschaefte.fetching = false
        store.geschaefte.error.push(error)
      })
  }),
  /*
   * GESCHAEFT
   */
  geschaeftNewCreate: action(() => {
    const { app, user } = store
    newGeschaeftInDb(app.db, user.username)
      .then(geschaeft => {
        store.geschaefte.geschaefte.unshift(geschaeft)
        /**
         * need to remove filters
         */
        store.geschaefte.filterFields = []
        store.geschaefte.filterType = null
        store.geschaefte.filterFulltext = ''
        store.geschaefte.sortFields = []
        store.geschaeftToggleActivated(geschaeft.idGeschaeft)
        if (store.history.location.pathname !== '/geschaefte') {
          store.history.push('/geschaefte')
        }
      })
      .catch(error => store.geschaefte.error.push(error))
  }),
  geschaeftRemove: action(idGeschaeft => {
    const { app, geschaefteKontakteIntern, geschaefteKontakteExtern, geschaefte } = store
    deleteGeschaeft(app.db, idGeschaeft)
      .then(() => {
        store.geschaeftRemoveDeleteIntended(idGeschaeft)
        store.geschaefte.geschaefte = store.geschaefte.geschaefte.filter(g => g.idGeschaeft !== idGeschaeft)
        // need to delete geschaefteKontakteIntern in store
        const geschaefteKontakteInternToDelete = geschaefteKontakteIntern.geschaefteKontakteIntern.filter(
          g => g.idGeschaeft === idGeschaeft,
        )
        geschaefteKontakteInternToDelete.forEach(g => store.geschaeftKontaktInternDelete(idGeschaeft, g.idKontakt))
        // need to delete geschaefteKontakteExtern in store
        const geschaefteKontakteExternToDelete = geschaefteKontakteExtern.geschaefteKontakteExtern.filter(
          g => g.idGeschaeft === idGeschaeft,
        )
        geschaefteKontakteExternToDelete.forEach(g =>
          store.geschaefteKontakteExternActions.geschaeftKontaktExternDelete(idGeschaeft, g.idKontakt),
        )
        // need to delete geKo in store
        const gekoToRemove = geschaefte.geko.filter(g => g.idGeschaeft === idGeschaeft)
        gekoToRemove.forEach(g => store.gekoRemove(idGeschaeft, g.gekoNr))
        // need to delete links in store
        const linksToRemove = geschaefte.links.filter(l => l.idGeschaeft === idGeschaeft)
        linksToRemove.forEach(l => store.linkDelete(idGeschaeft, l.url))
      })
      .catch(error => store.geschaefte.error.push(error))
  }),
  geschaeftRemoveDeleteIntended: action(() => {
    store.geschaefte.willDelete = false
  }),
  geschaeftSetDeleteIntended: action(() => {
    store.geschaefte.willDelete = true
  }),
  geschaefteChangeState: action((idGeschaeft, field, value) => {
    const { user } = store
    const { geschaefte } = store.geschaefte
    const username = user.username
    const geschaeft = geschaefte.find(g => g.idGeschaeft === idGeschaeft)
    if (geschaeft) {
      geschaeft[field] = value
      geschaeft.mutationsperson = username
      geschaeft.mutationsdatum = moment().format('YYYY-MM-DD HH:mm:ss')
    } else {
      store.geschaefte.error.push(new Error('Das Geschäft wurde nicht aktualisiert'))
    }
  }),
  changeGeschaeftInDb: action((idGeschaeft, field, value) =>
    // no need to do something on then
    // ui was updated on GESCHAEFTE_CHANGE_STATE
    updateGeschaeft(store.app.db, idGeschaeft, field, value, store.user.username).catch(error => store.geschaefte.error.push(error)),
  ),
  rechtsmittelErledigungOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'rechtsmittelErledigung')
      .then(rechtsmittelErledigungOptions => {
        store.geschaefte.rechtsmittelErledigungOptions = rechtsmittelErledigungOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  parlVorstossTypOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'parlVorstossTyp')
      .then(parlVorstossTypOptions => {
        store.geschaefte.parlVorstossTypOptions = parlVorstossTypOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  statusOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'status')
      .then(statusOptions => {
        store.geschaefte.statusOptions = statusOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  faelligeStatiOptionsGet: action(() => {
    getFaelligeStatiOptions(store.app.db)
      .then(faelligeStatiOptions => {
        store.geschaefte.faelligeStatiOptions = faelligeStatiOptions
      })
      .catch(error => store.geschaefte.error.push(error))
  }),
  geschaeftsartOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'geschaeftsart')
      .then(geschaeftsartOptions => {
        store.geschaefte.geschaeftsartOptions = geschaeftsartOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  aktenstandortOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'aktenstandort')
      .then(aktenstandortOptions => {
        store.geschaefte.aktenstandortOptions = aktenstandortOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  interneOptionsGet: action(() =>
    getInterneOptions(store.app.db)
      .then(interneOptions => {
        store.geschaefte.interneOptions = interneOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  externeOptionsGet: action(() =>
    getExterneOptions(store.app.db)
      .then(externeOptions => {
        store.geschaefte.externeOptions = externeOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  rechtsmittelInstanzOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'rechtsmittelInstanz')
      .then(rechtsmittelInstanzOptions => {
        store.geschaefte.rechtsmittelInstanzOptions = rechtsmittelInstanzOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  abteilungOptionsGet: action(() =>
    getDropdownOptions(store.app.db, 'abteilung')
      .then(abteilungOptions => {
        store.geschaefte.abteilungOptions = abteilungOptions
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  gekoNewCreate: action((idGeschaeft, gekoNr) =>
    newGekoInDb(store.app.db, idGeschaeft, gekoNr)
      .then(geko => store.geschaefte.geko.unshift(geko))
      .catch(error => store.geschaefte.error.push(error)),
  ),
  gekoRemove: action((idGeschaeft, gekoNr) =>
    deleteGeko(store.app.db, idGeschaeft, gekoNr)
      .then(() => {
        store.geschaefte.geko = store.geschaefte.geko.filter(g => g.idGeschaeft !== idGeschaeft || g.gekoNr !== gekoNr)
      })
      .catch(error => store.geschaefte.error.push(error)),
  ),
  changeGekoInDb: action((idGeschaeft, gekoNr, field, value) =>
    // no need to do something on then
    // ui was updated on GEKO_CHANGE_STATE
    updateGeko(store.app.db, idGeschaeft, gekoNr, field, value).catch(error => store.geschaefte.error.push(error)),
  ),
  linkNewCreate: action((idGeschaeft, url) =>
    newLinkInDb(store.app.db, idGeschaeft, url)
      .then(() => store.geschaefte.links.unshift({ idGeschaeft, url }))
      .catch(error => store.geschaefte.error.push(error)),
  ),
  linkRemove: action((idGeschaeft, url) => {
    deleteLink(store.app.db, idGeschaeft, url)
      .then(() => {
        store.linkDelete(idGeschaeft, url)
      })
      .catch(error => store.geschaefte.error.push(error))
  }),
  linkDelete: action((idGeschaeft, url) => {
    store.geschaefte.links = store.geschaefte.links.filter(l => l.idGeschaeft !== idGeschaeft || l.url !== url)
  })
})
