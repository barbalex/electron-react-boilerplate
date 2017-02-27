/* eslint-disable no-param-reassign */
import { action } from 'mobx'

import getGeschaefteKontakteExternFromDb from '../../src/getGeschaefteKontakteExternFromDb'
import newGeschaeftKontaktExternInDb from '../../src/newGeschaeftKontaktExternInDb'
import deleteGeschaeftKontaktExtern from '../../src/deleteGeschaeftKontaktExtern'


export default (store) => ({
  geschaefteKontakteExternGet: action(() => {
    store.geschaefteKontakteExtern.fetching = true
    store.geschaefteKontakteExtern.error = []
  }),
  geschaefteKontakteExternGetSuccess: action((geschaefteKontakteExtern) => {
    store.geschaefteKontakteExtern.fetching = false
    store.geschaefteKontakteExtern.error = []
    store.geschaefteKontakteExtern.geschaefteKontakteExtern = geschaefteKontakteExtern
  }),
  geschaefteKontakteExternGetError: action((error) => {
    store.geschaefteKontakteExtern.fetching = false
    store.geschaefteKontakteExtern.error.push(error)
  }),
  getGeschaefteKontakteExtern: action(() => {
    const { app } = store
    store.geschaefteKontakteExternGet()
    getGeschaefteKontakteExternFromDb(app.db)
      .then(geschaefteKontakteExtern =>
        store.geschaefteKontakteExternGetSuccess(geschaefteKontakteExtern)
      )
      .catch(error =>
        store.geschaefteKontakteExternGetError(error)
      )
  }),
  geschaeftKontaktExternNew: action((geschaeftKontaktExtern) =>
    store.geschaefteKontakteExtern.geschaefteKontakteExtern.push(geschaeftKontaktExtern)
  ),
  geschaeftKontaktExternNewError: action((error) =>
    store.geschaefteKontakteExtern.push(error)
  ),
  geschaeftKontaktExternNewCreate: action((idGeschaeft, idKontakt) => {
    const { app } = store
    newGeschaeftKontaktExternInDb(app.db, idGeschaeft, idKontakt)
      .then(geschaeftKontaktExtern =>
        store.geschaeftKontaktExternNew(geschaeftKontaktExtern)
      )
      .catch(error =>
        store.geschaeftKontaktExternNewError(error)
      )
  }),
  geschaeftKontaktExternRemoveDeleteIntended: action(() => {
    store.geschaefteKontakteExtern.willDelete = false
  }),
  geschaeftKontaktExternDelete: action((idGeschaeft, idKontakt) => {
    store.geschaefteKontakteExtern.geschaefteKontakteExtern = store.geschaefteKontakteExtern.geschaefteKontakteExtern.filter(g => (
      g.idGeschaeft !== idGeschaeft ||
      g.idKontakt !== idKontakt
    ))
    store.geschaefteKontakteExtern.activeIdGeschaeft = null
    store.geschaefteKontakteExtern.activeIdKontakt = null
  }),
  geschaeftKontaktExternDeleteError: action((error) =>
    store.geschaefteKontakteExtern.error.push(error)
  ),
  geschaeftKontaktExternRemove: action((idGeschaeft, idKontakt) => {
    const { app } = store
    deleteGeschaeftKontaktExtern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        store.geschaeftKontaktExternRemoveDeleteIntended(idGeschaeft, idKontakt)
        store.geschaeftKontaktExternDelete(idGeschaeft, idKontakt)
      })
      .catch(error => store.geschaeftKontaktExternDeleteError(error))
  }),
  geschaefteKontakteExternChangeDbError: action((error) =>
    store.geschaefteKontakteExtern.error.push(error)
  ),
})
