import { remote } from 'electron'
const { dialog } = remote
import fs from 'fs'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const onClickPrint = (e, path) => {
  e.preventDefault()
  const landscape = path === '/pages'
  const win = remote.getCurrentWindow()
  const printToPDFOptions = {
    marginsType: 1,
    pageSize: 'A4',
    landscape,
    printBackground: true
  }
  const dialogOptions = {
    title: 'pdf speichern',
    filters: [{
      name: 'pdf',
      extensions: ['pdf']
    }]
  }
  /* not working ?!
  win.webContents.print({ silent: false, printBackground: false }, (error, data) => {
    if (error) throw error
    console.log('data', data)
  })
  */
  // first remove navbar
  win.webContents.printToPDF(printToPDFOptions, (error, data) => {
    if (error) throw error
    dialog.showSaveDialog(dialogOptions, (filePath) => {
      if (filePath) {
        fs.writeFile(filePath, data, (err) => {
          if (err) throw err
        })
      }
    })
  })
}

const NavbarPrintNav = ({ path }) =>
  <NavItem
    onClick={e =>
      onClickPrint(e, path)
    }
    title="Drucken"
  >
    <Glyphicon glyph="print" />
  </NavItem>

NavbarPrintNav.displayName = 'NavbarPrintNav'

NavbarPrintNav.propTypes = {
  path: PropTypes.string.isRequired,
}

export default NavbarPrintNav
