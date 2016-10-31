import getGeschaefteKontakteExternFromDb from '../src/getGeschaefteKontakteExternFromDb'

export const getGeschaefteKontakteExtern = () =>
  (dispatch, getState) => {
    const { app } = getState()
    dispatch(geschaefteKontakteExternGet())
    getGeschaefteKontakteExternFromDb(app.db)
      .then(geschaefteKontakteExtern =>
        dispatch(geschaefteKontakteExternGetSuccess(geschaefteKontakteExtern))
      )
      .catch(error =>
        dispatch(geschaefteKontakteExternGetError(error))
      )
  }

export const GESCHAEFTE_KONTAKTE_EXTERN_GET = 'GESCHAEFTE_KONTAKTE_EXTERN_GET'
const geschaefteKontakteExternGet = () => ({
  type: GESCHAEFTE_KONTAKTE_EXTERN_GET
})

export const GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS = 'GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS'
const geschaefteKontakteExternGetSuccess = geschaefteKontakteExtern => ({
  type: GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS,
  geschaefteKontakteExtern
})

export const GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR = 'GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR'
const geschaefteKontakteExternGetError = error => ({
  type: GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR,
  error
})

/*
 * Geschaeft Kontakt Extern
 */

import newGeschaeftKontaktExternInDb from '../src/newGeschaeftKontaktExternInDb.js'
import deleteGeschaeftKontaktExtern from '../src/deleteGeschaeftKontaktExtern.js'

export const geschaeftKontaktExternNewCreate = (idGeschaeft, idKontakt) =>
  (dispatch, getState) => {
    const { app } = getState()
    newGeschaeftKontaktExternInDb(app.db, idGeschaeft, idKontakt)
      .then(geschaeftKontaktExtern =>
        dispatch(geschaeftKontaktExternNew(geschaeftKontaktExtern))
      )
      .catch(error =>
        dispatch(geschaeftKontaktExternNewError(error))
      )
  }

export const GESCHAEFT_KONTAKT_EXTERN_NEW = 'GESCHAEFT_KONTAKT_EXTERN_NEW'
export const geschaeftKontaktExternNew = geschaeftKontaktExtern => ({
  type: GESCHAEFT_KONTAKT_EXTERN_NEW,
  geschaeftKontaktExtern
})

export const GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR = 'GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR'
export const geschaeftKontaktExternNewError = error => ({
  type: GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR,
  error
})

export const geschaeftKontaktExternRemove = (idGeschaeft, idKontakt) =>
  (dispatch, getState) => {
    const { app } = getState()
    deleteGeschaeftKontaktExtern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        dispatch(geschaeftKontaktExternRemoveDeleteIntended(idGeschaeft, idKontakt))
        dispatch(geschaeftKontaktExternDelete(idGeschaeft, idKontakt))
      })
      .catch(error => dispatch(geschaeftKontaktExternDeleteError(error)))
  }

export const GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED'
export const geschaeftKontaktExternSetDeleteIntended = (idGeschaeft, idKontakt) => ({
  type: GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED,
  idGeschaeft,
  idKontakt
})

export const GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED'
export const geschaeftKontaktExternRemoveDeleteIntended = () => ({
  type: GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED
})

export const GESCHAEFT_KONTAKT_EXTERN_DELETE = 'GESCHAEFT_KONTAKT_EXTERN_DELETE'
export const geschaeftKontaktExternDelete = (idGeschaeft, idKontakt) => ({
  type: GESCHAEFT_KONTAKT_EXTERN_DELETE,
  idGeschaeft,
  idKontakt
})

export const GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR = 'GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR'
export const geschaeftKontaktExternDeleteError = error => ({
  type: GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR,
  error
})

export const GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR = 'GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR'
// TODO: reload data from db
export const geschaefteKontakteExternChangeDbError = error => ({
  type: GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR,
  error
})
