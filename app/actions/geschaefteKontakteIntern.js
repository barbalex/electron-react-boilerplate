import getGeschaefteKontakteInternFromDb from '../src/getGeschaefteKontakteInternFromDb'

export const getGeschaefteKontakteIntern = () =>
  (dispatch, getState) => {
    const { app } = getState()
    dispatch(geschaefteKontakteInternGet())
    getGeschaefteKontakteInternFromDb(app.db)
      .then((geschaefteKontakteIntern) => {
        dispatch(geschaefteKontakteInternGetSuccess(geschaefteKontakteIntern))
      })
      .catch(error =>
        dispatch(geschaefteKontakteInternGetError(error))
      )
  }

export const GESCHAEFTE_KONTAKTE_INTERN_GET = 'GESCHAEFTE_KONTAKTE_INTERN_GET'
const geschaefteKontakteInternGet = () => ({
  type: GESCHAEFTE_KONTAKTE_INTERN_GET
})

export const GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS = 'GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS'
const geschaefteKontakteInternGetSuccess = geschaefteKontakteIntern => ({
  type: GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS,
  geschaefteKontakteIntern
})

export const GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR = 'GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR'
const geschaefteKontakteInternGetError = error => ({
  type: GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR,
  error
})

/*
 * Geschaeft Kontakt Intern
 */

import newGeschaeftKontaktInternInDb from '../src/newGeschaeftKontaktInternInDb.js'
import deleteGeschaeftKontaktIntern from '../src/deleteGeschaeftKontaktIntern.js'

export const geschaeftKontaktInternNewCreate = (idGeschaeft, idKontakt) =>
  (dispatch, getState) => {
    const { app } = getState()
    newGeschaeftKontaktInternInDb(app.db, idGeschaeft, idKontakt)
      .then(geschaeftKontaktIntern =>
        dispatch(geschaeftKontaktInternNew(geschaeftKontaktIntern))
      )
      .catch(error =>
        dispatch(geschaeftKontaktInternNewError(error))
      )
  }

export const GESCHAEFT_KONTAKT_INTERN_NEW = 'GESCHAEFT_KONTAKT_INTERN_NEW'
export const geschaeftKontaktInternNew = geschaeftKontaktIntern => ({
  type: GESCHAEFT_KONTAKT_INTERN_NEW,
  geschaeftKontaktIntern
})

export const GESCHAEFT_KONTAKT_INTERN_NEW_ERROR = 'GESCHAEFT_KONTAKT_INTERN_NEW_ERROR'
export const geschaeftKontaktInternNewError = error => ({
  type: GESCHAEFT_KONTAKT_INTERN_NEW_ERROR,
  error
})

export const geschaeftKontaktInternRemove = (idGeschaeft, idKontakt) =>
  (dispatch, getState) => {
    const { app } = getState()
    deleteGeschaeftKontaktIntern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        dispatch(geschaeftKontaktInternRemoveDeleteIntended(idGeschaeft, idKontakt))
        dispatch(geschaeftKontaktInternDelete(idGeschaeft, idKontakt))
      })
      .catch(error =>
        dispatch(geschaeftKontaktInternDeleteError(error))
      )
  }

export const GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED'
export const geschaeftKontaktInternSetDeleteIntended = (idGeschaeft, idKontakt) => ({
  type: GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED,
  idGeschaeft,
  idKontakt
})

export const GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED'
export const geschaeftKontaktInternRemoveDeleteIntended = () => ({
  type: GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED
})

export const GESCHAEFT_KONTAKT_INTERN_DELETE = 'GESCHAEFT_KONTAKT_INTERN_DELETE'
export const geschaeftKontaktInternDelete = (idGeschaeft, idKontakt) => ({
  type: GESCHAEFT_KONTAKT_INTERN_DELETE,
  idGeschaeft,
  idKontakt
})

export const GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR = 'GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR'
export const geschaeftKontaktInternDeleteError = error => ({
  type: GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR,
  error
})

export const GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR = 'GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR'
// TODO: reload data from db
export const geschaefteKontakteInternChangeDbError = error => ({
  type: GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR,
  error
})
