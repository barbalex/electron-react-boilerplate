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
import saveConfig from './src/saveConfig'
import chooseDb from './src/chooseDb'

const sqlite3 = require('sqlite3').verbose()

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
    configSetKey: action((key, value) => {
      const { config } = this.app
      if (value) {
        config[key] = value
      } else if (config[key]) {
        delete config[key]
      }
      saveConfig(config)
      this.app.config = config
    }),
    dbChooseSuccess: action((dbPath, db) => {
      this.app.fetchingDb = false
      this.app.db = db
      this.app.config = Object.assign(
        {},
        this.app.config,
        { dbPath },
      )
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
        this.dbChooseSuccess(standardDbPath, db)
        this.configSetKey('dbPath', standardDbPath)
      } else {
        // let user choose db file
        this.app.fetchingDb = true
        this.app.errorFetchingDb = null
        chooseDb()
          .then((dbPath) => {
            const db = new sqlite3.Database(dbPath)
            this.dbChooseSuccess(dbPath, db)
            this.configSetKey('dbPath', dbPath)
          })
          .catch(err => {
            this.app.fetchingDb = false
            this.app.errorFetchingDb = err
            this.app.db = null
          })
      }
    }),
    getConfig: action(() =>
      getConfig()
        .then((config) => {
          const newConfig = config || standardConfig
          this.config = config
          const { dbPath } = newConfig
          if (!dbPath) {
            return this.dbGetAtStandardpathIfPossible()
          }
          const dbExists = fs.existsSync(dbPath)
          if (!dbExists) {
            return this.dbGetAtStandardpathIfPossible()
          }
          const db = new sqlite3.Database(dbPath)
          this.dbChooseSuccess(dbPath, db)
        })
        .catch(error =>
          console.error(error)
        )
    ),
  })
  this.geschaefte = {}
  this.geschaefteKontakteExtern = {}
  this.geschaefteKontakteIntern = {}
  this.pages = {}
  this.table = {}
  this.user = {}
}

export default new Store()
