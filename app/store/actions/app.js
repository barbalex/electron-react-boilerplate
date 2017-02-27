/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import fs from 'fs'

import standardConfig from '../../src/standardConfig'
import standardDbPath from '../../src/standardDbPath'
import getConfig from '../../src/getConfig'
import filterForFaelligeGeschaefte from '../../src/filterForFaelligeGeschaefte'
import saveConfig from '../../src/saveConfig'
import chooseDb from '../../src/chooseDb'

const sqlite3 = require('sqlite3').verbose()

export default (store) => ({
  configSetKey: action((key, value) => {
    const { config } = store.app
    if (value) {
      config[key] = value
    } else if (config[key]) {
      delete config[key]
    }
    saveConfig(config)
    store.app.config = config
  }),
  dbGet: (() => {
    store.app.fetchingDb = true
    store.app.errorFetchingDb = null
    chooseDb()
      .then((dbPath) => {
        const db = new sqlite3.Database(dbPath)
        store.dbChooseSuccess(dbPath, db)
        store.configSetKey('dbPath', dbPath)
      })
      .catch(err => store.dbChooseError(err))
  }),
  dbChooseError: action((err) => {
    store.fetchingDb = false
    store.errorFetchingDb = err
    store.db = null
  }),
  dbChooseSuccess: action((dbPath, db) => {
    store.app.fetchingDb = false
    store.app.db = db
    store.app.config = Object.assign(
      {},
      store.app.config,
      { dbPath },
    )
    // get data
    store.faelligeStatiOptionsGet()
    store.getGeko()
    store.getLinks()
    store.interneOptionsGet()
    store.externeOptionsGet()
    store.getGeschaefteKontakteIntern()
    store.getGeschaefteKontakteExtern()
    store.rechtsmittelErledigungOptionsGet()
    store.parlVorstossTypOptionsGet()
    store.statusOptionsGet()
    store.geschaeftsartOptionsGet()
    store.aktenstandortOptionsGet()
    store.rechtsmittelInstanzOptionsGet()
    store.abteilungOptionsGet()
    store.getGeschaefte()
    store.fetchUsername()
    // set filter to fällige
    store.geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige')
    store.geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
  }),
  dbGetAtStandardpathIfPossible: action(() => {
    // try to open db at standard path
    // need function that tests if db exists at standard path
    const standardDbExists = fs.existsSync(standardDbPath)
    if (standardDbExists) {
      const db = new sqlite3.Database(standardDbPath)
      store.dbChooseSuccess(standardDbPath, db)
      store.configSetKey('dbPath', standardDbPath)
    } else {
      // let user choose db file
      store.app.fetchingDb = true
      store.app.errorFetchingDb = null
      chooseDb()
        .then((dbPath) => {
          const db = new sqlite3.Database(dbPath)
          store.dbChooseSuccess(dbPath, db)
          store.configSetKey('dbPath', dbPath)
        })
        .catch(err =>
          store.dbChooseError(err)
        )
    }
  }),
  getConfig: action(() =>
    getConfig()
      .then((config) => {
        const newConfig = config || standardConfig
        store.config = config
        const { dbPath } = newConfig
        if (!dbPath) {
          return store.dbGetAtStandardpathIfPossible()
        }
        const dbExists = fs.existsSync(dbPath)
        if (!dbExists) {
          return store.dbGetAtStandardpathIfPossible()
        }
        const db = new sqlite3.Database(dbPath)
        store.dbChooseSuccess(dbPath, db)
      })
      .catch(error =>
        console.error(error)
      )
  ),
  configUiReset: (() => {
    const { config } = store.app
    const newConfig = {}
    const dbPath = config.dbPath
    if (dbPath) {
      newConfig.dbPath = dbPath
    }
    saveConfig(newConfig)
    store.app.config = newConfig
  }),
  messageShow: ((
    showMessageModal,
    messageTextLine1,
    messageTextLine2
  ) => {
    store.app.showMessageModal = showMessageModal
    store.app.messageTextLine1 = messageTextLine1
    store.app.messageTextLine2 = messageTextLine2
  }),
})
