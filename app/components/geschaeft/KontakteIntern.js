import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import regularStyles from './kontakteIntern.css'
import pdfStyles from './kontakteInternPdf.css'
import KontakteInternItems from '../../containers/geschaeft/KontakteInternItems'

const onChangeNewKontaktIntern = (
  e,
  geschaeftKontaktInternNewCreate,
  activeId,
) => {
  const idKontakt = e.target.value
  geschaeftKontaktInternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
}

const optionsList = (
  interneOptions,
  geschaefteKontakteIntern,
  activeId,
) => {
  // filter out options already choosen
  const kontakteInternOfActiveGeschaeft = geschaefteKontakteIntern.filter(g =>
    g.idGeschaeft === activeId
  )
  const idKontakteOfGkiOfActiveGeschaeft = kontakteInternOfActiveGeschaeft.map(kI =>
    kI.idKontakt
  )
  const interneOptionsFiltered = interneOptions.filter(o =>
    !idKontakteOfGkiOfActiveGeschaeft.includes(o.id)
  )
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(
    interneOptionsFiltered,
    o => {
      const name = o.name ? o.name.toLowerCase() : `ZZ`
      const vorname = o.vorname ? o.vorname.toLowerCase() : `ZZ`
      return `${name} ${vorname} ${o.kurzzeichen}`
    }
  )
  const options = interneOptionsSorted.map((o, index) => (
    <option
      key={index + 1}
      value={o.id}
    >
      {`${o.name ? o.name : `(kein Name)`} ${o.vorname ? o.vorname : `(kein Vorname)`} (${o.kurzzeichen})`}
    </option>
  ))
  options.unshift(
    <option
      key={0}
      value=""
    />
  )
  return options
}

const GeschaefteKontakteIntern = ({
  tabIndex,
  geschaeftKontaktInternNewCreate,
  activeId,
  interneOptions,
  geschaefteKontakteIntern,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  return (
    <div className={styles.body}>
      <KontakteInternItems />
      <div
        key={0}
        className={styles.rowfVDropdown}
      >
        <div className={styles.fVDropdown}>
          <FormControl
            componentClass="select"
            bsSize="small"
            onChange={e =>
              onChangeNewKontaktIntern(
                e,
                geschaeftKontaktInternNewCreate,
                activeId,
              )
            }
            title="Neuen Kontakt hinzufügen"
            tabIndex={tabIndex}
          >
            {
              optionsList(
                interneOptions,
                geschaefteKontakteIntern,
                activeId,
              )
            }
          </FormControl>
        </div>
      </div>
    </div>
  )
}

GeschaefteKontakteIntern.displayName = 'GeschaefteKontakteIntern'

GeschaefteKontakteIntern.propTypes = {
  interneOptions: PropTypes.array,
  geschaefteKontakteIntern: PropTypes.array,
  geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteIntern
