import { remote, shell } from 'electron'
import fs from 'fs'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

// eslint-disable-next-line no-unused-vars
const StyledNavItem = styled(({ showBerichteNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showBerichteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
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

const NavbarPrintNav = ({
  path,
  showBerichteNavs,
}) =>
  <StyledNavItem
    onClick={e =>
      onClickPrint(e, path)
    }
    title="PDF erzeugen"
    showBerichteNavs={showBerichteNavs}
  >
    <Glyphicon glyph="file" />
  </StyledNavItem>

NavbarPrintNav.displayName = 'NavbarPrintNav'

NavbarPrintNav.propTypes = {
  path: PropTypes.string.isRequired,
  showBerichteNavs: PropTypes.bool.isRequired,
}

export default NavbarPrintNav
