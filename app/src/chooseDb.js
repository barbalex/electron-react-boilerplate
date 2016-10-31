const dialog = require('electron').remote.dialog

const options = {
  title: 'Datenbank für Kapla wählen',
  properties: ['openFile'],
  filters: [{ name: 'sqlite-Datenbanken', extensions: ['db'] }]
}

export default () =>
  new Promise((resolve, reject) => {
    dialog.showOpenDialog(options, (result) => {
      if (result[0]) resolve(result[0])
      reject('keine Datenbank gewählt')
    })
  })
