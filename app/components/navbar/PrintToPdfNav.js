import { remote, shell } from 'electron'
import fs from 'fs'
import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

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
    marginsType: 0,
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

  // https://github.com/electron/electron/blob/master/docs/api/web-contents.md#contentsprinttopdfoptions-callback
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

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const {
      store,
      routing,
    } = props
    const path = routing.locationBeforeTransitions.pathname
    const {
      showBerichteNavs,
    } = store
    return {
      path,
      showBerichteNavs,
    }
  }),
  observer
)

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

export default enhance(NavbarPrintNav)
