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
  const interneOptionsSorted = _.sortBy(interneOptionsFiltered, o =>
    o.kurzzeichen.toLowerCase()
  )
  const options = interneOptionsSorted.map((o, index) => {
    let times = 5 - o.kurzzeichen.length
    // make sure, times is never < 0
    if (times < 0) times = 0
    const space = '\xa0'.repeat(times)
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option
        key={index + 1}
        value={o.id}
      >
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
      </option>
    )
  })
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
            className={styles.dropdown}
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
  activeIdGeschaeft: PropTypes.number,
  activeIdKontakt: PropTypes.number,
  geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
  geschaeftKontaktInternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteIntern
