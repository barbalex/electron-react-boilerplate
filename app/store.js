import {
  extendObservable,
  action,
  autorun,
  computed,
  observable,
} from 'mobx'
import fs from 'fs'

import standardConfig from './src/standardConfig'
import standardDbPath from './src/standardDbPath'
import getConfig from './src/getConfig'
import filterForFaelligeGeschaefte from './src/filterForFaelligeGeschaefte'

function Store() {
  this.app = {}
  extendObservable(this.app, {
    fetchingDb: false,
    errorFetchingDb: null,
    db: null,
    showMessageModal: false,
    messageTextLine1: '',
    messageTextLine2: '',
    config: standardConfig,
  })
  extendObservable(this, {
    dbChooseSuccess: action((dbPath, db) => {
      // get data
      this.faelligeStatiOptionsGet()
      this.getGeko()
      this.getLinks()
      this.interneOptionsGet()
      this.externeOptionsGet()
      this.getGeschaefteKontakteIntern()
      this.getGeschaefteKontakteExtern()
      this.rechtsmittelErledigungOptionsGet()
      this.parlVorstossTypOptionsGet()
      this.statusOptionsGet()
      this.geschaeftsartOptionsGet()
      this.aktenstandortOptionsGet()
      this.rechtsmittelInstanzOptionsGet()
      this.abteilungOptionsGet()
      this.getGeschaefte()
      this.fetchUsername()
      // set filter to fällige
      this.geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige')
      this.geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
    }),
    dbGetAtStandardpathIfPossible: action(() => {
      // try to open db at standard path
      // need function that tests if db exists at standard path
      const standardDbExists = fs.existsSync(standardDbPath)
      if (standardDbExists) {
        const db = new sqlite3.Database(standardDbPath)
        dispatch(dbChooseSuccess(standardDbPath, db))
        dispatch(configSetKey('dbPath', standardDbPath))
      } else {
        // let user choose db file
        dispatch(dbChoose())
        chooseDb()
          .then((dbPath) => {
            const db = new sqlite3.Database(dbPath)
            dispatch(dbChooseSuccess(dbPath, db))
            dispatch(configSetKey('dbPath', dbPath))
          })
          .catch(err => dispatch(dbChooseError(err)))
      }
    }),
    getConfig: action(() => {
      getConfig()
      .then((config) => {
        let newConfig = config || standardConfig
        this.config = config
        const { dbPath } = newConfig
        if (!dbPath) {
          return dispatch(dbGetAtStandardpathIfPossible())
        }
        const dbExists = fs.existsSync(dbPath)
        if (!dbExists) {
          return dispatch(dbGetAtStandardpathIfPossible())
        }
        const db = new sqlite3.Database(dbPath)
        dispatch(dbChooseSuccess(dbPath, db))
      })
      .catch(error =>
        console.error(error)
      )
    }),
  })
  this.geschaefte = {}
  this.geschaefteKontakteExtern = {}
  this.geschaefteKontakteIntern = {}
  this.pages = {}
  this.table = {}
  this.user = {}
}

export default new Store()
