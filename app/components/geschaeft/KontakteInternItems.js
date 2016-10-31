import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import regularStyles from './kontakteInternItems.css'
import pdfStyles from './kontakteInternItemsPdf.css'

const titleText = (idKontakt, interneOptions) => {
  const data = interneOptions.find(o =>
    o.id === idKontakt
  )
  if (!data) return 'Kontakt entfernen'
  return `${data.kurzzeichen} entfernen`
}

const verantwortlichData = (gkI, interneOptions) => {
  const data = interneOptions.find(o =>
    o.id === gkI.idKontakt
  )
  if (!data) return ''
  const name = `${data.vorname} ${data.name}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const GeschaefteKontakteInternItems = ({
  geschaefteKontakteIntern,
  activeId,
  interneOptions,
  geschaeftKontaktInternRemove,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  // filter for this geschaeft
  const gkIFiltered = geschaefteKontakteIntern.filter(g =>
    g.idGeschaeft === activeId
  )
  const gkISorted = _.sortBy(gkIFiltered, (g) => {
    const intOption = interneOptions.find(o =>
      o.id === g.idKontakt
    )
    return intOption.kurzzeichen.toLowerCase()
  })
  return (
    <div className={styles.body}>
      {
        gkISorted.map((gkI, index) => {
          const intOption = interneOptions.find(o =>
            o.id === gkI.idKontakt
          )
          const kurzzeichen = intOption.kurzzeichen
          return (
            <div
              key={index + 1}
              className={styles.row}
            >
              <div className={styles.fV}>
                {kurzzeichen}
              </div>
              <div className={styles.fVN}>
                  {verantwortlichData(gkI, interneOptions)}
              </div>
              <div className={styles.deleteGlyphiconDiv}>
                <Glyphicon
                  glyph="remove-circle"
                  onClick={() => geschaeftKontaktInternRemove(activeId, gkI.idKontakt)}
                  className={styles.removeGlyphicon}
                  title={titleText(gkI.idKontakt, interneOptions)}
                />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

GeschaefteKontakteInternItems.displayName = 'GeschaefteKontakteInternItems'

GeschaefteKontakteInternItems.propTypes = {
  interneOptions: PropTypes.array,
  geschaefteKontakteIntern: PropTypes.array,
  geschaeftKontaktInternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteInternItems
