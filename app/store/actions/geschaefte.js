/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import { browserHistory } from 'react-router'
import _ from 'lodash'

import getGeschaefteFromDb from '../../src/getGeschaefteFromDb'
import getGekoFromDb from '../../src/getGekoFromDb'
import getLinkFromDb from '../../src/getLinksFromDb'
import getDropdownOptions from '../../src/getDropdownOptions'
import getFaelligeStatiOptions from '../../src/getFaelligeStatiOptions'
import getInterneOptions from '../../src/getInterneOptions'
import getExterneOptions from '../../src/getExterneOptions'
import updateGeschaeft from '../../src/updateGeschaeft'
import updateGeko from '../../src/updateGeko'
import updateLink from '../../src/updateLink'
import filterGeschaefte from '../../src/filterGeschaefte'
import sortIdsBySortFields from '../../src/sortIdsBySortFields'
import newGeschaeftInDb from '../../src/newGeschaeftInDb'
import newGekoInDb from '../../src/newGekoInDb'
import newLinkInDb from '../../src/newLinkInDb'
import deleteGeschaeft from '../../src/deleteGeschaeft'
import deleteGeko from '../../src/deleteGeko'
import deleteLink from '../../src/deleteLink'
import geschaefteSortByFieldsGetSortFields from '../../src/geschaefteSortByFieldsGetSortFields'


export default (store) => ({
  geschaeftPdfShow: action(() =>
    browserHistory.push('/geschaeftPdf')
  ),
  geschaefteGet: action(() => {
    store.geschaefte.fetching = true
    store.geschaefte.error = []
  }),
  geschaefteGetSuccess: action((geschaefte) => {
    store.geschaefte.fetching = false
    store.geschaefte.error = []
    store.geschaefte.geschaefte = geschaefte
  }),
  geschaefteSetGefilterteIds: action(() => {
    const { geschaefte } = store
    const { filterFields, filterFulltext, sortFields } = geschaefte
    // create geschaefteGefilterteIds
    let geschaefteGefilterteIds = filterGeschaefte(
      geschaefte,
      filterFulltext,
      filterFields
    )
    geschaefteGefilterteIds = sortIdsBySortFields(geschaefte, geschaefteGefilterteIds, sortFields)
    store.geschaefte.geschaefteGefilterteIds = geschaefteGefilterteIds
  }),
  geschaefteGetError: action((error) => {
    store.geschaefte.fetching = false
    store.geschaefte.error.push(error)
  }),
  getGeschaefte: action(() => {
    const { app, routing } = store
    store.geschaefteGet()
    getGeschaefteFromDb(app.db)
      .then((geschaefte) => {
        store.geschaefteGetSuccess(geschaefte)
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') {
          browserHistory.push('/geschaefte')
        }
      })
      .catch(error => store.geschaefteGetError(error))
  }),
  geschaefteFilterByFields: action((filterFields, filterType = 'nach Feldern') => {
    const { routing, pages } = store
    const { filterFulltext, sortFields, geschaefte } = store.geschaefte
    // remove filterFields with empty values
    const filterFieldsWithValues = filterFields.filter(ff =>
      ff.value || ff.value === 0 || ff.comparator
    )
    // create geschaefteGefilterteIds
    let geschaefteGefilterteIds = filterGeschaefte(
      geschaefte,
      filterFulltext,
      filterFieldsWithValues
    )
    geschaefteGefilterteIds = sortIdsBySortFields(geschaefte, geschaefteGefilterteIds, sortFields)
    store.geschaefte.filterFields = filterFields
    store.geschaefte.filterFulltext = ''
    store.geschaefte.filterType = filterType || null
    store.geschaefte.activeId = null
    store.geschaefte.GefilterteIds = geschaefteGefilterteIds
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    } else if (geschaefteGefilterteIds.length === 1) {
      store.geschaeftToggleActivated(geschaefteGefilterteIds[0])
    }
  }),
  geschaeftToggleActivated: action((idGeschaeft) => {
    store.geschaefte.activeId = (
      store.geschaefte.activeId && store.geschaefte.activeId === action.idGeschaeft ?
      null :
      idGeschaeft
    )
  }),
  geschaefteResetSort: action(() => {
    store.geschaefte.sortFields = []
  }),
  geschaefteSortByFields: action((field, direction) => {
    const { routing, pages } = store
    const sortFields = geschaefteSortByFieldsGetSortFields(store, field, direction)
    const geschaefteGefilterteIds = sortIdsBySortFields(
      store.geschaefte,
      store.geschaefteGefilterteIds,
      sortFields
    )
    store.geschaefte.geschaefteGefilterteIds = geschaefteGefilterteIds
    store.geschaefte.sortFields = sortFields
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    }
  }),
  geschaefteFilterByFulltext: action((filterFulltext, filterType = 'nach Volltext') => {
    const { pages, routing } = store
    const { filterFields, geschaefte, sortFields } = store.geschaefte
    // create geschaefteGefilterteIds
    let geschaefteGefilterteIds = filterGeschaefte(
      geschaefte,
      filterFulltext,
      filterFields
    )
    geschaefteGefilterteIds = sortIdsBySortFields(geschaefte, geschaefteGefilterteIds, sortFields)
    store.geschaefte.geschaefteGefilterteIds = geschaefteGefilterteIds
    store.geschaefte.filterType = filterType || null
    store.geschaefte.filterFulltext = action.filterFulltext
    store.geschaefte.filterFields = []
    store.geschaefte.activeId = null
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      store.pagesInitiate(reportType)
    } else {
      if (path !== '/geschaefte') {
        browserHistory.push('/geschaefte')
      }
      if (geschaefteGefilterteIds.length === 1) {
        store.geschaeftToggleActivated(geschaefteGefilterteIds[0])
      }
    }
  }),
  geschaefteRemoveFilters: action(() => {
    store.geschaefte.GefilterteIds = _.sortBy(store.geschaefte.geschaefte, g => g.idGeschaeft)
      .reverse()
      .map(g =>
        g.idGeschaeft
      )
    store.geschaefte.filterFields = []
    store.geschaefte.filterType = null
    store.geschaefte.filterFulltext = ''
    store.geschaefte.sortFields = []
  }),
  getGeko: action(() => {
    const { app } = store
    store.gekoGet()
    getGekoFromDb(app.db)
      .then((geko) => {
        store.gekoGetSuccess(geko)
      })
      .catch(error => store.gekoGetError(error))
  }),
  gekoGet: action(() => {
    store.geschaefte.fetching = true
    store.geschaefte.error = []
  }),
  gekoGetSuccess: action((geko) => {
    store.geschaefte.fetching = false
    store.geschaefte.error = []
    store.geschaefte.geko = geko
  }),
  gekoGetError: action((error) => {
    store.geschaefte.fetching = false
    store.geschaefte.error.push(error)
  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
  xxx: action(() => {

  }),
})
