/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import { browserHistory } from 'react-router'

import getGeschaefteKontakteInternFromDb from '../../src/getGeschaefteKontakteInternFromDb'
import newGeschaeftKontaktInternInDb from '../../src/newGeschaeftKontaktInternInDb.js'
import deleteGeschaeftKontaktIntern from '../../src/deleteGeschaeftKontaktIntern.js'


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
  xxx: action(() => {
  }),
  xxx: action(() => {
  }),
  xxx: action(() => {
  }),
  xxx: action(() => {
  }),
})
