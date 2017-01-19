/**
 * gets save path
 */

import { remote, shell } from 'electron'
import writeExport from './writeExport'
import getHistoryOfGeschaefte from './getHistoryOfGeschaefte'

const { dialog } = remote

function getDataArrayFromExportObjects(exportObjects) {
  const dataArray = []

  // first the field names:
  dataArray
    .push(
      Object.keys(exportObjects[0])
    )
  // then the field values
  exportObjects.forEach(object =>
    dataArray
      .push(
        Object.keys(object)
          .map((key, index) => {
            /**
             * exceljs errors out if first member of array is null
             * see: https://github.com/guyonroche/exceljs/issues/111
             */
            if (object[key] === null && index === 0) {
              return ''
            }
            return object[key]
          })
      ))
  return dataArray
}

export default (geschaefte, messageShow) => {
  const dialogOptions = {
    title: 'exportierte Geschäfte speichern',
    filters: [
      {
        name: 'Excel-Datei',
        extensions: ['xlsx']
      }
    ],
  }
  dialog.showSaveDialog(dialogOptions, (path) => {
    if (path) {
      messageShow(true, 'Der Export wird aufgebaut...', '')
      // add history
      const history = getHistoryOfGeschaefte(geschaefte)
      const geschaefteWithHistory = geschaefte.map((g) => {
        g.historie = history
          .get(g.idGeschaeft)
          .join(', ')
        return g
      })

      // set timeout so message appears before exceljs starts working
      // and possibly blocks execution of message
      setTimeout(() => {
        const dataArray = getDataArrayFromExportObjects(geschaefteWithHistory)
        writeExport(path, dataArray)
          .then(() => {
            messageShow(false, '', '')
            shell.openItem(path)
          })
          .catch((error) => {
            messageShow(true, 'Fehler:', error)
            setTimeout(() =>
              messageShow(false, '', ''), 8000
            )
          })
      }, 0)
    }
  })
}
