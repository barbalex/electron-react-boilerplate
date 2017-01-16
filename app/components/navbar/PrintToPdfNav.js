import { remote, shell } from 'electron'
import fs from 'fs'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavItem = styled(NavItem)`
  border-right: dotted #505050 1px;
`

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
  win.webContents.printToPDF(
    printToPDFOptions,
    (error, data) => {
      if (error) throw error
      dialog.showSaveDialog(
        dialogOptions,
        (filePath) => {
          if (filePath) {
            fs.writeFile(
              filePath,
              data, (err) => {
                if (err) throw err
                shell.openItem(filePath)
              }
            )
          }
        }
      )
    }
  )
}

const NavbarPrintNav = ({ path }) =>
  <StyledNavItem
    onClick={e =>
      onClickPrint(e, path)
    }
    title="PDF erzeugen"
  >
    <Glyphicon glyph="file" />
  </StyledNavItem>

NavbarPrintNav.displayName = 'NavbarPrintNav'

NavbarPrintNav.propTypes = {
  path: PropTypes.string.isRequired,
}

export default NavbarPrintNav
