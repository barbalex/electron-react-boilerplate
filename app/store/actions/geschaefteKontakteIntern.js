/* eslint-disable no-param-reassign */
import { action } from 'mobx'

import getGeschaefteKontakteInternFromDb from '../../src/getGeschaefteKontakteInternFromDb'
import newGeschaeftKontaktInternInDb from '../../src/newGeschaeftKontaktInternInDb'
import deleteGeschaeftKontaktIntern from '../../src/deleteGeschaeftKontaktIntern'


export default (store) => ({
  geschaefteKontakteInternGet: action(() => {
    store.geschaefteKontakteIntern.fetching = true
    store.geschaefteKontakteIntern.error = []
  }),
  geschaefteKontakteInternGetSuccess: action((geschaefteKontakteIntern) => {
    store.geschaefteKontakteIntern.fetching = false
    store.geschaefteKontakteIntern.error = []
    store.geschaefteKontakteIntern.geschaefteKontakteIntern = geschaefteKontakteIntern
  }),
  geschaefteKontakteInternGetError: action((error) => {
    store.geschaefteKontakteIntern.fetching = false
    store.geschaefteKontakteIntern.error.push(error)
  }),
  getGeschaefteKontakteIntern: action(() => {
    const { app } = store
    store.geschaefteKontakteInternGet()
    getGeschaefteKontakteInternFromDb(app.db)
      .then((geschaefteKontakteIntern) =>
        store.geschaefteKontakteInternGetSuccess(geschaefteKontakteIntern)
      )
      .catch(error =>
        store.geschaefteKontakteInternGetError(error)
      )
  }),
  geschaeftKontaktInternNew: action((geschaeftKontaktIntern) =>
    store.geschaefteKontakteIntern.geschaefteKontakteIntern.push(geschaeftKontaktIntern)
  ),
  geschaeftKontaktInternNewError: action((error) =>
    store.geschaefteKontakteIntern.error.push(error)
  ),
  geschaeftKontaktInternNewCreate: action((idGeschaeft, idKontakt) => {
    const { app } = store
    newGeschaeftKontaktInternInDb(app.db, idGeschaeft, idKontakt)
      .then(geschaeftKontaktIntern =>
        store.geschaeftKontaktInternNew(geschaeftKontaktIntern)
      )
      .catch(error =>
        store.geschaeftKontaktInternNewError(error)
      )
  }),
  geschaeftKontaktInternRemoveDeleteIntended: action(() => {
    store.geschaefteKontakteIntern.willDelete = false
  }),
  geschaeftKontaktInternDelete: action((idGeschaeft, idKontakt) => {
    store.geschaefteKontakteIntern.geschaefteKontakteIntern = store.geschaefteKontakteIntern.geschaefteKontakteIntern.filter(g =>
      (g.idGeschaeft !== idGeschaeft || g.idKontakt !== idKontakt))
    store.geschaefteKontakteIntern.activeIdGeschaeft = null
    store.geschaefteKontakteIntern.activeIdKontakt = null
  }),
  geschaeftKontaktInternRemove: action((idGeschaeft, idKontakt) => {
    const { app } = store
    deleteGeschaeftKontaktIntern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        store.geschaeftKontaktInternRemoveDeleteIntended()
        store.geschaeftKontaktInternDelete(idGeschaeft, idKontakt)
      })
      .catch(error =>
        store.geschaeftKontaktInternDeleteError(error)
      )
  }),
  geschaeftKontaktInternDeleteError: action((error) =>
    store.geschaeftKontaktInternDelete.push(error)
  ),
  geschaeftKontaktInternSetDeleteIntended: action((idGeschaeft, idKontakt) => {
    store.geschaefteKontakteIntern.willDelete = true
    store.geschaefteKontakteIntern.activeIdGeschaeft = idGeschaeft
    store.geschaefteKontakteIntern.activeIdKontakt = idKontakt
  }),
  geschaefteKontakteInternChangeDbError: action((error) =>
    store.geschaefteKontakteIntern.error.push(error)
  ),
})
