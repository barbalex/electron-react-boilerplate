/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import app from 'ampersand-app'

import getTableFromDb from '../../src/getTableFromDb'
import updateTableRow from '../../src/updateTableRow'
import tableStandardState from '../../src/tableStandardState'
import newTableRowInDb from '../../src/newTableRowInDb'
import deleteTableRow from '../../src/deleteTableRow'

export default store => ({
  tableReset: action(() => {
    Object.keys(tableStandardState).forEach(k => {
      store.table[k] = tableStandardState[k]
    })
  }),
  tableGet: action(table => {
    store.table.table = table
    store.table.fetching = true
    store.table.error = []
  }),
  tableGetSuccess: action((table, rows) => {
    store.table.table = table
    store.table.fetching = false
    store.table.error = []
    store.table.rows = rows
    store.table.id = null
  }),
  tableGetError: action(error => {
    store.table.fetching = false
    store.table.error = [...store.table.error, error]
  }),
  getTable: action(table => {
    const { app } = store
    store.tableGet(table)
    let rows
    try {
      rows = getTableFromDb(app.db, table)
    } catch (error) {
      return store.tableGetError(error)
    }
    store.tableGetSuccess(table, rows)
    if (store.history.location.pathname !== '/table') {
      store.history.push('/table')
    }
  }),
  /*
   * ROW
   */
  tableRowNew: action(row => store.table.rows.push(row)),
  tableRowToggleActivated: action((table, id) => {
    store.table.id = store.table.id && store.table.id === id ? null : id
  }),
  tableRowNewCreate: action(table => {
    const {
      tableRowNew,
      tableRowToggleActivated,
      history,
      tableGetError,
    } = store.app
    let row
    try {
      row = newTableRowInDb(app.db, table)
    } catch (error) {
      return tableGetError(error)
    }
    tableRowNew(row)
    tableRowToggleActivated(table, row.id)
    if (history.location.pathname !== '/table') {
      history.push('/table')
    }
  }),
  tableRowSetDeleteIntended: action(() => {
    store.table.willDelete = true
  }),
  tableRowRemoveDeleteIntended: action(() => {
    store.table.willDelete = false
  }),
  tableRowDelete: action((table, id) => {
    store.table.rows = store.table.rows.filter(g => g.id !== id)
  }),
  tableRowRemove: action((table, id) => {
    const { app } = store
    try {
      deleteTableRow(app.db, table, id)
    } catch (error) {
      return store.tableChangeDbError(error)
    }
    store.tableRowToggleActivated(table, null)
    store.tableRowRemoveDeleteIntended()
    store.tableRowDelete(table, id)
  }),
  tableChangeState: action((id, field, value) => {
    const row = store.table.rows.find(r => r.id === id)
    if (row) {
      row[field] = value
    }
  }),
  tableChangeDbError: action(error => store.table.error.push(error)),
  changeTableInDb: action((table, id, field, value) => {
    const { app } = store
    // no need to do something on then
    // ui was updated on TABLE_CHANGE_STATE
    try {
      updateTableRow(app.db, table, id, field, value)
    } catch (error) {
      // TODO: reset ui
      store.tableChangeDbError(error)
    }
    // need to reload this table in store
    const actionName = `${table}OptionsGet`
    store[actionName]()
  }),
})
