import { remote } from 'electron'
import fs from 'fs'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const { dialog } = remote

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
    title="PDF erzeugen"
  >
    <Glyphicon glyph="file" />
  </NavItem>

NavbarPrintNav.displayName = 'NavbarPrintNav'

NavbarPrintNav.propTypes = {
  path: PropTypes.string.isRequired,
}

export default NavbarPrintNav
