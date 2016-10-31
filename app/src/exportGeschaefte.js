/**
 * gets save path
 */

import { remote } from 'electron'
import writeExport from './writeExport'

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
      // set timeout so message appears before exceljs starts working
      // and possibly blocks execution of message
      setTimeout(() => {
        const dataArray = getDataArrayFromExportObjects(geschaefte)
        writeExport(path, dataArray)
          .then(() => {
            // show the message
            const msg = `Die Geschäfte wurden nach ${path} exportiert`
            messageShow(true, msg, '')
            setTimeout(() =>
              messageShow(false, '', ''), 8000
            )
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
