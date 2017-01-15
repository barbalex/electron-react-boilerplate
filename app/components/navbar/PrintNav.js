import { remote } from 'electron'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const onClickPrint = (e, path) => {
  e.preventDefault()
  const win = remote.getCurrentWindow()
  // const landscape = path !== '/geschaeftPdf'
  // console.log('landscape:', landscape)
  // sadly, the landscape setting only works in printToPdf
  const options = {
    silent: false,
    printBackground: false,
  }
  win.webContents.print(options, (error, data) => {
    if (error) throw error
    // console.log('data', data)
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
