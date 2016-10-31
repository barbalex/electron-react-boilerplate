import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import styles from './optionsNav.css'

const OptionsNav = ({
  config,
  dbGet,
  configUiReset,
}) =>
  <NavDropdown
    title="&#8942;"
    id="last-nav-dropdown"
    noCaret
  >
    <MenuItem
      onClick={dbGet}
    >
      Datenbank wählen
      {
        config.dbPath &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.dbPath}
        >
          Aktuell: {config.dbPath}
        </div>
      }
    </MenuItem>
    <MenuItem divider />
    <MenuItem
      onClick={configUiReset}
    >
      Einstellungen zurücksetzen
    </MenuItem>
  </NavDropdown>

OptionsNav.displayName = 'OptionsNav'

OptionsNav.propTypes = {
  config: PropTypes.object.isRequired,
  dbGet: PropTypes.func.isRequired,
  configUiReset: PropTypes.func.isRequired,
}

export default OptionsNav
