// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getTableFromDb from '../src/getTableFromDb.js'
import updateTableRow from '../src/updateTableRow.js'
import * as GeschaefteActions from './geschaefte'

export const TABLE_RESET = 'TABLE_RESET'
export const tableReset = () => ({
  type: TABLE_RESET
})

export const getTable = table =>
  (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(tableGet(table))
    getTableFromDb(app.db, table)
      .then((rows) => {
        dispatch(tableGetSuccess(table, rows))
        if (routing.locationBeforeTransitions.pathname !== '/table') {
          dispatch(push('/table'))
        }
      })
      .catch(error =>
        dispatch(tableGetError(error))
      )
  }

export const TABLE_GET = 'TABLE_GET'
const tableGet = table => ({
  type: TABLE_GET,
  table
})

export const TABLE_GET_SUCCESS = 'TABLE_GET_SUCCESS'
const tableGetSuccess = (table, rows) => ({
  type: TABLE_GET_SUCCESS,
  table,
  rows
})

export const TABLE_GET_ERROR = 'TABLE_GET_ERROR'
const tableGetError = error => ({
  type: TABLE_GET_ERROR,
  error
})

/*
 * ROW
 */

import { push } from 'react-router-redux'
import newTableRowInDb from '../src/newTableRowInDb.js'
import deleteTableRow from '../src/deleteTableRow.js'

export const rowNewCreate = table =>
  (dispatch, getState) => {
    const { app, routing } = getState()
    newTableRowInDb(app.db, table)
      .then((row) => {
        dispatch(rowNew(table, row))
        dispatch(tableRowToggleActivated(table, row.id))
        if (routing.locationBeforeTransitions.pathname !== '/table') {
          dispatch(push('/table'))
        }
      })
      .catch(error => dispatch(tableNewError(error)))
  }

export const TABLE_ROW_NEW = 'TABLE_ROW_NEW'
export const rowNew = (table, row) => ({
  type: TABLE_ROW_NEW,
  table,
  row
})

export const TABLE_ROW_NEW_ERROR = 'TABLE_ROW_NEW_ERROR'
export const tableNewError = error => ({
  type: TABLE_ROW_NEW_ERROR,
  error
})

export const tableRowRemove = (table, id) =>
  (dispatch, getState) => {
    const { app } = getState()
    deleteTableRow(app.db, table, id)
      .then(() => {
        dispatch(tableRowToggleActivated(table, null))
        dispatch(tableRowRemoveDeleteIntended())
        dispatch(tableRowDelete(table, id))
      })
      .catch(error =>
        dispatch(tableRowDeleteError(error))
      )
  }

export const TABLE_ROW_SET_DELETE_INTENDED = 'TABLE_ROW_SET_DELETE_INTENDED'
export const tableRowSetDeleteIntended = (table, id) => ({
  type: TABLE_ROW_SET_DELETE_INTENDED,
  table,
  id
})

export const TABLE_ROW_REMOVE_DELETE_INTENDED = 'TABLE_ROW_REMOVE_DELETE_INTENDED'
export const tableRowRemoveDeleteIntended = () => ({
  type: TABLE_ROW_REMOVE_DELETE_INTENDED
})

export const TABLE_ROW_DELETE = 'TABLE_ROW_DELETE'
export const tableRowDelete = (table, id) => ({
  type: TABLE_ROW_DELETE,
  id
})

export const TABLE_ROW_DELETE_ERROR = 'TABLE_ROW_DELETE_ERROR'
export const tableRowDeleteError = error => ({
  type: TABLE_ROW_DELETE_ERROR,
  error
})

export const TABLE_CHANGE_STATE = 'TABLE_CHANGE_STATE'
export const tableChangeState = (table, id, field, value) => ({
  type: TABLE_CHANGE_STATE,
  table,
  id,
  field,
  value
})

export const TABLE_CHANGE_DB_ERROR = 'TABLE_CHANGE_DB_ERROR'
// TODO: reload data from db
export const tableChangeDbError = error => ({
  type: TABLE_CHANGE_DB_ERROR,
  error
})

export const changeTableInDb = (table, id, field, value) =>
  (dispatch, getState) => {
    const { app } = getState()
    // no need to do something on then
    // ui was updated on TABLE_CHANGE_STATE
    updateTableRow(app.db, table, id, field, value)
      .then(() => {
        // need to reload this table in store
        const action = `${table}OptionsGet`
        dispatch(GeschaefteActions[action]())
      })
      .catch((error) => {
        // TODO: reset ui
        dispatch(tableChangeDbError(error))
      })
  }

export const TABLE_ROW_TOGGLE_ACTIVATED = 'TABLE_ROW_TOGGLE_ACTIVATED'
export const tableRowToggleActivated = (table, id) => ({
  type: TABLE_ROW_TOGGLE_ACTIVATED,
  table,
  id
})
