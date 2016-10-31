import chooseDb from '../src/chooseDb'
import getConfig from '../src/getConfig'
import saveConfig from '../src/saveConfig'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as GeschaefteKontakteExternActions from './geschaefteKontakteExtern'
import * as UserActions from './user'

const sqlite3 = require('sqlite3').verbose()

export const CONFIG_GET = 'CONFIG_GET'
export const configGet = () =>
  (dispatch) => {
    getConfig()
      .then((config) => {
        let newConfig = config
        if (!newConfig) {
          newConfig = {}
        }
        dispatch({
          type: CONFIG_GET,
          config: newConfig
        })
        const { dbPath } = newConfig
        if (!dbPath) {
          dispatch(dbGetAtStandardpathIfPossible())
        } else {
          const db = new sqlite3.Database(dbPath)
          dispatch(dbChooseSuccess(dbPath, db))
        }
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
    dispatch(UserActions.fetchUsername())
    dispatch(GeschaefteActions.getGeschaefte())
    dispatch(GeschaefteActions.rechtsmittelErledigungOptionsGet())
    dispatch(GeschaefteActions.parlVorstossTypOptionsGet())
    dispatch(GeschaefteActions.statusOptionsGet())
    dispatch(GeschaefteActions.geschaeftsartOptionsGet())
    dispatch(GeschaefteActions.rechtsmittelInstanzOptionsGet())
    dispatch(GeschaefteActions.abteilungOptionsGet())
    dispatch(GeschaefteActions.interneOptionsGet())
    dispatch(GeschaefteActions.externeOptionsGet())
    dispatch(GeschaefteKontakteInternActions.getGeschaefteKontakteIntern())
    dispatch(GeschaefteKontakteExternActions.getGeschaefteKontakteExtern())
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
    const standardDbPath = 'G:\\Recht\\2 Sekretariat\\Kapla\\kapla.db'
    // try to open db at standard path
    let db = new sqlite3.Database(standardDbPath, sqlite3.OPEN_READWRITE, (error) => {
      if (error) {
        // let user choose db file
        dispatch(dbChoose())
        chooseDb()
          .then((dbPath) => {
            db = new sqlite3.Database(dbPath)
            dispatch(dbChooseSuccess(dbPath, db))
            dispatch(configSetKey('dbPath', dbPath))
          })
          .catch(err => dispatch(dbChooseError(err)))
      } else {
        dispatch(dbChooseSuccess(standardDbPath, db))
        dispatch(configSetKey('dbPath', standardDbPath))
      }
    })
  }
}
