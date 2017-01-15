// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/

import { push } from 'react-router-redux'
import getGeschaefteFromDb from '../src/getGeschaefteFromDb'
import getGekoFromDb from '../src/getGekoFromDb'
import getLinkFromDb from '../src/getLinksFromDb'
import getDropdownOptions from '../src/getDropdownOptions'
import getInterneOptions from '../src/getInterneOptions'
import getExterneOptions from '../src/getExterneOptions'
import updateGeschaeft from '../src/updateGeschaeft'
import updateGeko from '../src/updateGeko'
import updateLink from '../src/updateLink'
import filterGeschaefte from '../src/filterGeschaefte'
import sortIdsBySortFields from '../src/sortIdsBySortFields'
import * as pagesActions from './pages'
import * as geschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as geschaefteKontakteExternActions from './geschaefteKontakteExtern'
import newGeschaeftInDb from '../src/newGeschaeftInDb'
import newGekoInDb from '../src/newGekoInDb'
import newLinkInDb from '../src/newLinkInDb'
import deleteGeschaeft from '../src/deleteGeschaeft'
import deleteGeko from '../src/deleteGeko'
import deleteLink from '../src/deleteLink'

export const geschaeftPdfShow = () =>
  dispatch => dispatch(push('/geschaeftPdf'))

export const getGeschaefte = () =>
  (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(geschaefteGet())
    getGeschaefteFromDb(app.db)
      .then((geschaefte) => {
        dispatch(geschaefteGetSuccess(geschaefte))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') {
          dispatch(push('/geschaefte'))
        }
      })
      .catch(error => dispatch(geschaefteGetError(error)))
  }

export const GESCHAEFTE_GET = 'GESCHAEFTE_GET'
const geschaefteGet = () => ({
  type: GESCHAEFTE_GET
})

export const GESCHAEFTE_GET_SUCCESS = 'GESCHAEFTE_GET_SUCCESS'
const geschaefteGetSuccess = geschaefteArray =>
  (dispatch, getState) => {
    const { geschaefte } = getState()
    const { filterFields, filterFulltext, sortFields } = geschaefte
    // create geschaefteGefilterteIds
    let geschaefteGefilterteIds = filterGeschaefte(
      geschaefteArray,
      filterFulltext,
      filterFields
    )
    geschaefteGefilterteIds = sortIdsBySortFields(geschaefteArray, geschaefteGefilterteIds, sortFields)
    dispatch({
      type: GESCHAEFTE_GET_SUCCESS,
      geschaefte: geschaefteArray,
      geschaefteGefilterteIds
    })
  }

export const GESCHAEFTE_GET_ERROR = 'GESCHAEFTE_GET_ERROR'
const geschaefteGetError = error => ({
  type: GESCHAEFTE_GET_ERROR,
  error
})

export const GESCHAEFTE_FILTER_BY_FIELDS = 'GESCHAEFTE_FILTER_BY_FIELDS'
export const geschaefteFilterByFields = (
  filterFields,
  filterType = 'nach Feldern'
) =>
  (dispatch, getState) => {
    const { routing, pages } = getState()
    const { filterFulltext, geschaefte, sortFields } = getState().geschaefte
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
    dispatch({
      type: GESCHAEFTE_FILTER_BY_FIELDS,
      filterFields: filterFieldsWithValues,
      geschaefteGefilterteIds,
      filterType
    })
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      dispatch(pagesActions.pagesInitiate(reportType))
    } else if (geschaefteGefilterteIds.length === 1) {
      dispatch(geschaeftToggleActivated(geschaefteGefilterteIds[0]))
    }
  }

export const GESCHAEFTE_RESET_SORT = 'GESCHAEFTE_RESET_SORT'
export const geschaefteResetSort = () => ({
  type: GESCHAEFTE_RESET_SORT
})

export const GESCHAEFTE_SORT_BY_FIELDS = 'GESCHAEFTE_SORT_BY_FIELDS'
export const geschaefteSortByFields = (
  field,
  direction,
) =>
  (dispatch, getState) => {
    const { routing, pages } = getState()
    dispatch({
      type: GESCHAEFTE_SORT_BY_FIELDS,
      field,
      direction
    })
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      dispatch(pagesActions.pagesInitiate(reportType))
    }
  }

export const GESCHAEFTE_FILTER_BY_FULLTEXT = 'GESCHAEFTE_FILTER_BY_FULLTEXT'
// filter = word
export const geschaefteFilterByFulltext = (filterFulltext, filterType = 'nach Volltext') =>
  (dispatch, getState) => {
    const { pages, routing } = getState()
    const { filterFields, geschaefte, sortFields } = getState().geschaefte
    // create geschaefteGefilterteIds
    let geschaefteGefilterteIds = filterGeschaefte(
      geschaefte,
      filterFulltext,
      filterFields
    )
    geschaefteGefilterteIds = sortIdsBySortFields(geschaefte, geschaefteGefilterteIds, sortFields)
    dispatch({
      type: GESCHAEFTE_FILTER_BY_FULLTEXT,
      geschaefteGefilterteIds,
      filterType,
      filterFulltext
    })
    /**
     * if pages are active,
     * initiate with new data
     */
    const path = routing.locationBeforeTransitions.pathname
    if (path === '/pages') {
      const { reportType } = pages
      dispatch(pagesActions.pagesInitiate(reportType))
    } else {
      if (path !== '/geschaefte') {
        dispatch(push('/geschaefte'))
      }
      if (geschaefteGefilterteIds.length === 1) {
        dispatch(geschaeftToggleActivated(geschaefteGefilterteIds[0]))
      }
    }
  }

export const GESCHAEFTE_REMOVE_FILTERS = 'GESCHAEFTE_REMOVE_FILTERS'

export const geschaefteRemoveFilters = () => ({
  type: GESCHAEFTE_REMOVE_FILTERS
})

export const getGeko = () =>
(dispatch, getState) => {
  const { app } = getState()
  dispatch(gekoGet())
  getGekoFromDb(app.db)
    .then((geko) => {
      dispatch(gekoGetSuccess(geko))
    })
    .catch(error => dispatch(gekoGetError(error)))
}

export const GEKO_GET = 'GEKO_GET'
const gekoGet = () => ({
  type: GEKO_GET
})

export const GEKO_GET_SUCCESS = 'GEKO_GET_SUCCESS'
const gekoGetSuccess = gekoArray => ({
  type: GEKO_GET_SUCCESS,
  geko: gekoArray,
})

export const GEKO_GET_ERROR = 'GEKO_GET_ERROR'
const gekoGetError = error => ({
  type: GEKO_GET_ERROR,
  error
})

export const getLinks = () =>
(dispatch, getState) => {
  const { app } = getState()
  dispatch(linksGet())
  getLinkFromDb(app.db)
    .then((links) => {
      dispatch(linksGetSuccess(links))
    })
    .catch(error => dispatch(linksGetError(error)))
}

export const LINKS_GET = 'LINKS_GET'
const linksGet = () => ({
  type: LINKS_GET
})

export const LINKS_GET_SUCCESS = 'LINKS_GET_SUCCESS'
const linksGetSuccess = links => ({
  type: LINKS_GET_SUCCESS,
  links,
})

export const LINKS_GET_ERROR = 'LINKS_GET_ERROR'
const linksGetError = error => ({
  type: LINKS_GET_ERROR,
  error
})

/*
 * GESCHAEFT
 */

export const geschaeftNewCreate = () =>
  (dispatch, getState) => {
    const { app, user, routing } = getState()
    newGeschaeftInDb(app.db, user.username)
      .then((geschaeft) => {
        dispatch(geschaeftNew(geschaeft))
        dispatch(geschaeftToggleActivated(geschaeft.idGeschaeft))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') {
          dispatch(push('/geschaefte'))
        }
      })
      .catch(error => dispatch(geschaeftNewError(error)))
  }

export const GESCHAEFT_NEW = 'GESCHAEFT_NEW'
export const geschaeftNew = geschaeft => ({
  type: GESCHAEFT_NEW,
  geschaeft
})

export const GESCHAEFT_NEW_ERROR = 'GESCHAEFT_NEW_ERROR'
export const geschaeftNewError = error => ({
  type: GESCHAEFT_NEW_ERROR,
  error
})

export const geschaeftRemove = idGeschaeft =>
  (dispatch, getState) => {
    const { app, geschaefteKontakteIntern, geschaefteKontakteExtern, geschaefte } = getState()
    deleteGeschaeft(app.db, idGeschaeft)
      .then(() => {
        dispatch(geschaeftRemoveDeleteIntended(idGeschaeft))
        dispatch(geschaeftDelete(idGeschaeft))
        // need to delete geschaefteKontakteIntern in store
        const geschaefteKontakteInternToDelete = geschaefteKontakteIntern.geschaefteKontakteIntern
          .filter(g => g.idGeschaeft === idGeschaeft)
        geschaefteKontakteInternToDelete.forEach(g =>
          dispatch(geschaefteKontakteInternActions.geschaeftKontaktInternDelete(idGeschaeft, g.idKontakt))
        )
        // need to delete geschaefteKontakteExtern in store
        const geschaefteKontakteExternToDelete = geschaefteKontakteExtern.geschaefteKontakteExtern
          .filter(g => g.idGeschaeft === idGeschaeft)
        geschaefteKontakteExternToDelete.forEach(g =>
          dispatch(geschaefteKontakteExternActions.geschaeftKontaktExternDelete(idGeschaeft, g.idKontakt))
        )
        // need to delete geKo in store
        const gekoToRemove = geschaefte.geko.filter(g => g.idGeschaeft === idGeschaeft)
        gekoToRemove.forEach(g =>
          dispatch(gekoRemove(idGeschaeft, g.gekoNr))
        )
        // need to delete links in store
        const linksToRemove = geschaefte.links.filter(l => l.idGeschaeft === idGeschaeft)
        linksToRemove.forEach(l =>
          dispatch(linkDelete(idGeschaeft, l.url))
        )
      })
      .catch(error => dispatch(geschaeftDeleteError(error)))
  }

export const GESCHAEFT_SET_DELETE_INTENDED = 'GESCHAEFT_SET_DELETE_INTENDED'
export const geschaeftSetDeleteIntended = idGeschaeft => ({
  type: GESCHAEFT_SET_DELETE_INTENDED,
  idGeschaeft
})

export const GESCHAEFT_REMOVE_DELETE_INTENDED = 'GESCHAEFT_REMOVE_DELETE_INTENDED'
export const geschaeftRemoveDeleteIntended = () => ({
  type: GESCHAEFT_REMOVE_DELETE_INTENDED
})

export const GESCHAEFT_DELETE = 'GESCHAEFT_DELETE'
export const geschaeftDelete = idGeschaeft => ({
  type: GESCHAEFT_DELETE,
  idGeschaeft
})

export const GESCHAEFT_DELETE_ERROR = 'GESCHAEFT_DELETE_ERROR'
export const geschaeftDeleteError = error => ({
  type: GESCHAEFT_DELETE_ERROR,
  error
})

export const GESCHAEFTE_CHANGE_STATE = 'GESCHAEFTE_CHANGE_STATE'
export const geschaefteChangeState = (idGeschaeft, field, value) =>
  (dispatch, getState) => {
    const { user } = getState()
    const username = user.username
    dispatch({
      type: GESCHAEFTE_CHANGE_STATE,
      idGeschaeft,
      field,
      value,
      username
    })
  }

export const GESCHAEFTE_CHANGE_DB_ERROR = 'GESCHAEFTE_CHANGE_DB_ERROR'
// TODO: reload data from db
export const geschaefteChangeDbError = error => ({
  type: GESCHAEFTE_CHANGE_DB_ERROR,
  error
})

export const changeGeschaeftInDb = (idGeschaeft, field, value) =>
  (dispatch, getState) => {
    const { app, user } = getState()
    // no need to do something on then
    // ui was updated on GESCHAEFTE_CHANGE_STATE
    updateGeschaeft(app.db, idGeschaeft, field, value, user.username)
      .catch((error) => {
        // TODO: reset ui
        dispatch(geschaefteChangeDbError(error))
      })
  }

export const GESCHAEFT_TOGGLE_ACTIVATED = 'GESCHAEFT_TOGGLE_ACTIVATED'
export const geschaeftToggleActivated = idGeschaeft => ({
  type: GESCHAEFT_TOGGLE_ACTIVATED,
  idGeschaeft
})

export function rechtsmittelErledigungOptionsGet() {
  return (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'rechtsmittelErledigung')
      .then(rechtsmittelErledigungOptions =>
        dispatch(rechtsmittelErledigungOptionsGetSuccess(rechtsmittelErledigungOptions))
      )
      .catch(error =>
        dispatch(rechtsmittelErledigungOptionsGetError(error))
      )
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS'
const rechtsmittelErledigungOptionsGetSuccess = rechtsmittelErledigungOptions => ({
  type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS,
  rechtsmittelErledigungOptions
})

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR'
const rechtsmittelErledigungOptionsGetError = error => ({
  type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR,
  error
})

export const parlVorstossTypOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'parlVorstossTyp')
      .then(parlVorstossTypOptions =>
        dispatch(parlVorstossTypOptionsGetSuccess(parlVorstossTypOptions))
      )
      .catch(error =>
        dispatch(parlVorstossTypOptionsGetError(error))
      )
  }

export const PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS = 'PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS'
const parlVorstossTypOptionsGetSuccess = parlVorstossTypOptions => ({
  type: PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS,
  parlVorstossTypOptions
})

export const PARLVORSTOSSTYP_OPTIONS_GET_ERROR = 'PARLVORSTOSSTYP_OPTIONS_GET_ERROR'
const parlVorstossTypOptionsGetError = error => ({
  type: PARLVORSTOSSTYP_OPTIONS_GET_ERROR,
  error
})

export const STATUS_OPTIONS_GET = 'STATUS_OPTIONS_GET'
export const statusOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'status')
      .then(statusOptions =>
        dispatch(statusOptionsGetSuccess(statusOptions))
      )
      .catch(error =>
        dispatch(statusOptionsGetError(error))
      )
  }

export const STATUS_OPTIONS_GET_SUCCESS = 'STATUS_OPTIONS_GET_SUCCESS'
const statusOptionsGetSuccess = statusOptions => ({
  type: STATUS_OPTIONS_GET_SUCCESS,
  statusOptions
})

export const STATUS_OPTIONS_GET_ERROR = 'STATUS_OPTIONS_GET_ERROR'
const statusOptionsGetError = error => ({
  type: STATUS_OPTIONS_GET_ERROR,
  error
})

export const geschaeftsartOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'geschaeftsart')
      .then(geschaeftsartOptions =>
        dispatch(geschaeftsartOptionsGetSuccess(geschaeftsartOptions))
      )
      .catch(error =>
        dispatch(geschaeftsartOptionsGetError(error))
      )
  }

export const GESCHAEFTSART_OPTIONS_GET_SUCCESS = 'GESCHAEFTSART_OPTIONS_GET_SUCCESS'
const geschaeftsartOptionsGetSuccess = geschaeftsartOptions => ({
  type: GESCHAEFTSART_OPTIONS_GET_SUCCESS,
  geschaeftsartOptions
})

export const GESCHAEFTSART_OPTIONS_GET_ERROR = 'GESCHAEFTSART_OPTIONS_GET_ERROR'
const geschaeftsartOptionsGetError = error => ({
  type: GESCHAEFTSART_OPTIONS_GET_ERROR,
  error
})

export const aktenstandortOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'aktenstandort')
      .then(aktenstandortOptions =>
        dispatch(aktenstandortOptionsGetSuccess(aktenstandortOptions))
      )
      .catch(error =>
        dispatch(aktenstandortOptionsGetError(error))
      )
  }

export const AKTENSTANDORT_OPTIONS_GET_SUCCESS = 'AKTENSTANDORT_OPTIONS_GET_SUCCESS'
const aktenstandortOptionsGetSuccess = aktenstandortOptions => ({
  type: AKTENSTANDORT_OPTIONS_GET_SUCCESS,
  aktenstandortOptions
})

export const AKTENSTANDORT_OPTIONS_GET_ERROR = 'AKTENSTANDORT_OPTIONS_GET_ERROR'
const aktenstandortOptionsGetError = error => ({
  type: AKTENSTANDORT_OPTIONS_GET_ERROR,
  error
})

export const interneOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getInterneOptions(app.db)
      .then(interneOptions =>
        dispatch(interneOptionsGetSuccess(interneOptions))
      )
      .catch(error =>
        dispatch(interneOptionsGetError(error))
      )
  }

export const INTERNE_OPTIONS_GET_SUCCESS = 'INTERNE_OPTIONS_GET_SUCCESS'
const interneOptionsGetSuccess = interneOptions => ({
  type: INTERNE_OPTIONS_GET_SUCCESS,
  interneOptions
})

export const INTERNE_OPTIONS_GET_ERROR = 'INTERNE_OPTIONS_GET_ERROR'
const interneOptionsGetError = error => ({
  type: INTERNE_OPTIONS_GET_ERROR,
  error
})

export const externeOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getExterneOptions(app.db)
      .then(externeOptions =>
        dispatch(externeOptionsGetSuccess(externeOptions))
      )
      .catch(error =>
        dispatch(externeOptionsGetError(error))
      )
  }

export const EXTERNE_OPTIONS_GET_SUCCESS = 'EXTERNE_OPTIONS_GET_SUCCESS'
const externeOptionsGetSuccess = externeOptions => ({
  type: EXTERNE_OPTIONS_GET_SUCCESS,
  externeOptions
})

export const EXTERNE_OPTIONS_GET_ERROR = 'EXTERNE_OPTIONS_GET_ERROR'
const externeOptionsGetError = error => ({
  type: EXTERNE_OPTIONS_GET_ERROR,
  error
})

export const rechtsmittelInstanzOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'rechtsmittelInstanz')
      .then(rechtsmittelInstanzOptions =>
        dispatch(rechtsmittelInstanzOptionsGetSuccess(rechtsmittelInstanzOptions))
      )
      .catch(error =>
        dispatch(rechtsmittelInstanzOptionsGetError(error))
      )
  }

export const RECHTSMITTEL_INSTANZ_OPTIONS_GET_SUCCESS = 'RECHTSMITTEL_INSTANZ_OPTIONS_GET_SUCCESS'
const rechtsmittelInstanzOptionsGetSuccess = rechtsmittelInstanzOptions => ({
  type: RECHTSMITTEL_INSTANZ_OPTIONS_GET_SUCCESS,
  rechtsmittelInstanzOptions
})

export const RECHTSMITTEL_INSTANZ_OPTIONS_GET_ERROR = 'RECHTSMITTEL_INSTANZ_OPTIONS_GET_ERROR'
const rechtsmittelInstanzOptionsGetError = error => ({
  type: RECHTSMITTEL_INSTANZ_OPTIONS_GET_ERROR,
  error
})

export const abteilungOptionsGet = () =>
  (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'abteilung')
      .then(abteilungOptions =>
        dispatch(abteilungOptionsGetSuccess(abteilungOptions))
      )
      .catch(error =>
        dispatch(abteilungOptionsGetError(error))
      )
  }

export const ABTEILUNG_OPTIONS_GET_SUCCESS = 'ABTEILUNG_OPTIONS_GET_SUCCESS'
const abteilungOptionsGetSuccess = abteilungOptions => ({
  type: ABTEILUNG_OPTIONS_GET_SUCCESS,
  abteilungOptions
})

export const ABTEILUNG_OPTIONS_GET_ERROR = 'ABTEILUNG_OPTIONS_GET_ERROR'
const abteilungOptionsGetError = error => ({
  type: ABTEILUNG_OPTIONS_GET_ERROR,
  error
})

export const gekoNewCreate = (idGeschaeft, gekoNr) =>
  (dispatch, getState) => {
    const { app } = getState()
    newGekoInDb(app.db, idGeschaeft, gekoNr)
      .then((geko) =>
        dispatch(gekoNew(geko))
      )
      .catch(error => dispatch(gekoNewError(error)))
  }

export const GEKO_NEW = 'GEKO_NEW'
export const gekoNew = geko => ({
  type: GEKO_NEW,
  geko
})

export const GEKO_NEW_ERROR = 'GEKO_NEW_ERROR'
export const gekoNewError = error => ({
  type: GEKO_NEW_ERROR,
  error
})

export const gekoRemove = (idGeschaeft, gekoNr) =>
  (dispatch, getState) => {
    const { app } = getState()
    deleteGeko(app.db, idGeschaeft, gekoNr)
      .then(() => {
        dispatch(gekoRemoveDeleteIntended(idGeschaeft, gekoNr))
        dispatch(gekoDelete(idGeschaeft, gekoNr))
      })
      .catch(error => dispatch(gekoDeleteError(error)))
  }

export const GEKO_SET_DELETE_INTENDED = 'GEKO_SET_DELETE_INTENDED'
export const gekoSetDeleteIntended = (idGeschaeft, gekoNr) => ({
  type: GEKO_SET_DELETE_INTENDED,
  idGeschaeft,
  gekoNr,
})

export const GEKO_REMOVE_DELETE_INTENDED = 'GEKO_REMOVE_DELETE_INTENDED'
export const gekoRemoveDeleteIntended = () => ({
  type: GEKO_REMOVE_DELETE_INTENDED
})

export const GEKO_DELETE = 'GEKO_DELETE'
export const gekoDelete = (idGeschaeft, gekoNr) => ({
  type: GEKO_DELETE,
  idGeschaeft,
  gekoNr,
})

export const GEKO_DELETE_ERROR = 'GEKO_DELETE_ERROR'
export const gekoDeleteError = error => ({
  type: GEKO_DELETE_ERROR,
  error
})

export const GEKO_CHANGE_STATE = 'GEKO_CHANGE_STATE'
export const gekoChangeState = (idGeschaeft, gekoNr, field, value) =>
  (dispatch, getState) => {
    const { user } = getState()
    const username = user.username
    dispatch({
      type: GEKO_CHANGE_STATE,
      idGeschaeft,
      gekoNr,
      field,
      value,
      username
    })
  }

export const GEKO_CHANGE_DB_ERROR = 'GEKO_CHANGE_DB_ERROR'
export const gekoChangeDbError = error => ({
  type: GEKO_CHANGE_DB_ERROR,
  error
})

export const changeGekoInDb = (idGeschaeft, gekoNr, field, value) =>
  (dispatch, getState) => {
    const { app } = getState()
    // no need to do something on then
    // ui was updated on GEKO_CHANGE_STATE
    updateGeko(app.db, idGeschaeft, gekoNr, field, value)
      .catch((error) => {
        // TODO: reset ui
        dispatch(gekoChangeDbError(error))
      })
  }

export const linkNewCreate = (idGeschaeft, url) =>
  (dispatch, getState) => {
    const { app } = getState()
    newLinkInDb(app.db, idGeschaeft, url)
      .then(() =>
        dispatch(linkNew(idGeschaeft, url))
      )
      .catch(error => dispatch(linkNewError(error)))
  }

export const LINK_NEW = 'LINK_NEW'
export const linkNew = (idGeschaeft, url) => ({
  type: LINK_NEW,
  url,
  idGeschaeft,
})

export const LINK_NEW_ERROR = 'LINK_NEW_ERROR'
export const linkNewError = error => ({
  type: LINK_NEW_ERROR,
  error
})

export const linkRemove = (idGeschaeft, url) =>
  (dispatch, getState) => {
    const { app } = getState()
    deleteLink(app.db, idGeschaeft, url)
      .then(() => {
        dispatch(linkDelete(idGeschaeft, url))
      })
      .catch(error => dispatch(linkDeleteError(error)))
  }

export const LINK_DELETE = 'LINK_DELETE'
export const linkDelete = (idGeschaeft, url) => ({
  type: LINK_DELETE,
  idGeschaeft,
  url,
})

export const LINK_DELETE_ERROR = 'LINK_DELETE_ERROR'
export const linkDeleteError = error => ({
  type: LINK_DELETE_ERROR,
  error
})

export const LINK_CHANGE_STATE = 'LINK_CHANGE_STATE'
export const linkChangeState = (idGeschaeft, url, field, value) =>
  (dispatch, getState) => {
    const { user } = getState()
    const username = user.username
    dispatch({
      type: LINK_CHANGE_STATE,
      idGeschaeft,
      url,
      field,
      value,
      username
    })
  }

export const LINK_CHANGE_DB_ERROR = 'LINK_CHANGE_DB_ERROR'
export const linkChangeDbError = error => ({
  type: LINK_CHANGE_DB_ERROR,
  error
})

export const changeLinkInDb = (idGeschaeft, url, field, value) =>
  (dispatch, getState) => {
    const { app } = getState()
    // no need to do something on then
    // ui was updated on LINK_CHANGE_STATE
    updateLink(app.db, idGeschaeft, url, field, value)
      .catch((error) => {
        // TODO: reset ui
        dispatch(linkChangeDbError(error))
      })
  }
