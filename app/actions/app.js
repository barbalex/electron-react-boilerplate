import fs from 'fs'

import chooseDb from '../src/chooseDb'
import getConfig from '../src/getConfig'
import saveConfig from '../src/saveConfig'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as GeschaefteKontakteExternActions from './geschaefteKontakteExtern'
import * as UserActions from './user'
import standardDbPath from '../src/standardDbPath'

const sqlite3 = require('sqlite3').verbose()

export const CONFIG_GET = 'CONFIG_GET'
export const configGet = () =>
  (dispatch) => {
    getConfig()
      .then((config) => {
        let newConfig = config
        if (!newConfig) {
          newConfig = {
            dbPath: '',
            tableColumnWidth: 700,
            geschaefteColumnWidth: 700,
          }
        }
        dispatch({
          type: CONFIG_GET,
          config: newConfig
        })
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
  }

export const configUiReset = () =>
  (dispatch, getState) => {
    const { config } = getState().app
    const newConfig = {}
    const dbPath = config.dbPath
    if (dbPath) {
      newConfig.dbPath = dbPath
    }
    saveConfig(newConfig)
    dispatch({
      type: CONFIG_SET,
      config: newConfig
    })
  }

export const CONFIG_SET_KEY = 'CONFIG_SET_KEY'
export const configSetKey = (key, value) =>
  (dispatch, getState) => {
    const { config } = getState().app
    if (value) {
      config[key] = value
    } else if (config[key]) {
      delete config[key]
    }
    saveConfig(config)
    dispatch({
      type: CONFIG_SET,
      config
    })
  }

export const CONFIG_SET = 'CONFIG_SET'
export const configSet = config => ({
  type: CONFIG_SET,
  config
})

export const TABLECOLUMN_SET = 'TABLECOLUMN_SET'
export const tableColumnSet = tableColumnWidth => ({
  type: TABLECOLUMN_SET,
  tableColumnWidth
})

export const MESSAGE_SHOW = 'MESSAGE_SHOW'
export const messageShow = (
  showMessageModal,
  messageTextLine1,
  messageTextLine2
) => ({
  type: MESSAGE_SHOW,
  showMessageModal,
  messageTextLine1,
  messageTextLine2
})

export const DB_CHOOSE = 'DB_CHOOSE'
const dbChoose = () => ({
  type: DB_CHOOSE
})

export const DB_CHOOSE_SUCCESS = 'DB_CHOOSE_SUCCESS'
const dbChooseSuccess = (dbPath, db) =>
  (dispatch) => {
    dispatch({
      type: DB_CHOOSE_SUCCESS,
      db,
      dbPath
    })
    // get data
    dispatch(GeschaefteActions.faelligeStatiOptionsGet())
    dispatch(GeschaefteActions.getGeko())
    dispatch(GeschaefteActions.getLinks())
    dispatch(GeschaefteActions.interneOptionsGet())
    dispatch(GeschaefteActions.externeOptionsGet())
    dispatch(GeschaefteKontakteInternActions.getGeschaefteKontakteIntern())
    dispatch(GeschaefteKontakteExternActions.getGeschaefteKontakteExtern())
    dispatch(GeschaefteActions.rechtsmittelErledigungOptionsGet())
    dispatch(GeschaefteActions.parlVorstossTypOptionsGet())
    dispatch(GeschaefteActions.statusOptionsGet())
    dispatch(GeschaefteActions.geschaeftsartOptionsGet())
    dispatch(GeschaefteActions.aktenstandortOptionsGet())
    dispatch(GeschaefteActions.rechtsmittelInstanzOptionsGet())
    dispatch(GeschaefteActions.abteilungOptionsGet())
    dispatch(GeschaefteActions.getGeschaefte())
    dispatch(UserActions.fetchUsername())
    // set filter to fällige
    dispatch(GeschaefteActions.geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige'))
    dispatch(GeschaefteActions.geschaefteSortByFields('fristMitarbeiter', 'DESCENDING'))
  }

export const DB_CHOOSE_ERROR = 'DB_CHOOSE_ERROR'
const dbChooseError = error => ({
  type: DB_CHOOSE_ERROR,
  error
})

export function dbGet() {
  return (dispatch) => {
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
}

export function dbGetAtStandardpathIfPossible() {
  return (dispatch) => {
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
  }
}
