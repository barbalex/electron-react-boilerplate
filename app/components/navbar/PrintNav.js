import { remote } from 'electron'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const onClickPrint = (e, path) => {
  e.preventDefault()
  const win = remote.getCurrentWindow()
  // https://github.com/electron/electron/blob/master/docs/api/web-contents.md#contentsprintoptions
  /**
   * PROBLEM
   * with webContents.print marginsType can not be set
   * so this may be set by system settings, which could be different
   * from pc to pc!
   * Preset seems to be 0 for default margin
   * MUCH BETTER would be 1 for no margin
   */
  win.webContents.print()
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
