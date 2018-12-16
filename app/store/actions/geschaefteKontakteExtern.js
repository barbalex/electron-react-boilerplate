/* eslint-disable no-param-reassign */
import { action } from 'mobx'

import getGeschaefteKontakteExternFromDb from '../../src/getGeschaefteKontakteExternFromDb'
import newGeschaeftKontaktExternInDb from '../../src/newGeschaeftKontaktExternInDb'

export default store => ({
  geschaefteKontakteExternGet: action(() => {
    store.geschaefteKontakteExtern.fetching = true
    store.geschaefteKontakteExtern.error = []
  }),
  geschaefteKontakteExternGetSuccess: action(geschaefteKontakteExtern => {
    store.geschaefteKontakteExtern.fetching = false
    store.geschaefteKontakteExtern.error = []
    store.geschaefteKontakteExtern.geschaefteKontakteExtern = geschaefteKontakteExtern
  }),
  geschaefteKontakteExternGetError: action(error => {
    store.geschaefteKontakteExtern.fetching = false
    store.geschaefteKontakteExtern.error.push(error)
  }),
  getGeschaefteKontakteExtern: action(() => {
    const { app } = store
    store.geschaefteKontakteExternGet()
    let geschaefteKontakteExtern
    try {
      geschaefteKontakteExtern = getGeschaefteKontakteExternFromDb(app.db)
    } catch (error) {
      store.geschaefteKontakteExternGetError(error)
    }
    store.geschaefteKontakteExternGetSuccess(geschaefteKontakteExtern)
  }),
  geschaeftKontaktExternNew: action(geschaeftKontaktExtern =>
    store.geschaefteKontakteExtern.geschaefteKontakteExtern.push(
      geschaeftKontaktExtern,
    ),
  ),
  geschaeftKontaktExternNewError: action(error =>
    store.geschaefteKontakteExtern.push(error),
  ),
  geschaeftKontaktExternNewCreate: action((idGeschaeft, idKontakt) => {
    const { app } = store
    let geschaeftKontaktExtern
    try {
      geschaeftKontaktExtern = newGeschaeftKontaktExternInDb(
        app.db,
        idGeschaeft,
        idKontakt,
      )
    } catch (error) {
      return store.geschaeftKontaktExternNewError(error)
    }
    store.geschaeftKontaktExternNew(geschaeftKontaktExtern)
  }),
  geschaeftKontaktExternRemoveDeleteIntended: action(() => {
    store.geschaefteKontakteExtern.willDelete = false
  }),
  geschaeftKontaktExternDelete: action((idGeschaeft, idKontakt) => {
    store.geschaefteKontakteExtern.geschaefteKontakteExtern = store.geschaefteKontakteExtern.geschaefteKontakteExtern.filter(
      g => g.idGeschaeft !== idGeschaeft || g.idKontakt !== idKontakt,
    )
    store.geschaefteKontakteExtern.activeIdGeschaeft = null
    store.geschaefteKontakteExtern.activeIdKontakt = null
  }),
  geschaeftKontaktExternDeleteError: action(error =>
    store.geschaefteKontakteExtern.error.push(error),
  ),
  geschaeftKontaktExternRemove: action((idGeschaeft, idKontakt) => {
    try {
      store.app.db
        .prepare(
          `
          DELETE FROM
            geschaefteKontakteExtern
          WHERE
            idGeschaeft = ${idGeschaeft}
            AND idKontakt = ${idKontakt}`,
        )
        .run()
    } catch (error) {
      return store.geschaeftKontaktExternDeleteError(error)
    }
    store.geschaeftKontaktExternRemoveDeleteIntended(idGeschaeft, idKontakt)
    store.geschaeftKontaktExternDelete(idGeschaeft, idKontakt)
  }),
  geschaefteKontakteExternChangeDbError: action(error =>
    store.geschaefteKontakteExtern.error.push(error),
  ),
})
