import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import regularStyles from './kontakteExternItems.css'
import pdfStyles from './kontakteExternItemsPdf.css'

const verantwortlichData = (gkI, externeOptions) => {
  function addValueToInfo(info, value) {
    if (!value) return info
    if (info) return `${info}, ${value}`
    return value
  }
  const data = externeOptions.find(o =>
    o.id === gkI.idKontakt
  )
  if (!data) return ''
  let info = ''
  info = addValueToInfo(info, data.firma)
  info = addValueToInfo(info, data.email)
  info = addValueToInfo(info, data.telefon)
  return info
}

const titleText = (idKontakt, externeOptions) => {
  const data = externeOptions.find(o =>
    o.id === idKontakt
  )
  if (!data) return 'Kontakt entfernen'
  return `${data.name} ${data.vorname} entfernen`
}

const GeschaefteKontakteExtern = ({
  geschaefteKontakteExtern,
  activeId,
  externeOptions,
  geschaeftKontaktExternRemove,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  // filter for this geschaeft
  const gkIFiltered = geschaefteKontakteExtern.filter(g =>
    g.idGeschaeft === activeId
  )
  const gKISorted = _.sortBy(gkIFiltered, (g) => {
    const intOption = externeOptions.find(o =>
      o.id === g.idKontakt
    )
    return `${intOption.name} ${intOption.vorname}`.toLowerCase()
  })
  return (
    <div className={styles.body}>
      {
        gKISorted.map((gkI, index) => {
          const intOption = externeOptions.find(o =>
            o.id === gkI.idKontakt
          )
          const nameVorname = intOption.nameVorname
          return (
            <div
              key={index + 1}
              className={styles.row}
            >
              <div className={styles.fV}>
                {nameVorname}
              </div>
              <div className={styles.fVN}>
                {verantwortlichData(gkI, externeOptions)}
              </div>
              <div className={styles.deleteGlyphiconDiv}>
                <Glyphicon
                  glyph="remove-circle"
                  onClick={() =>
                    geschaeftKontaktExternRemove(activeId, gkI.idKontakt)
                  }
                  className={styles.removeGlyphicon}
                  title={titleText(gkI.idKontakt, externeOptions)}
                />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

GeschaefteKontakteExtern.displayName = 'GeschaefteKontakteExtern'

GeschaefteKontakteExtern.propTypes = {
  externeOptions: PropTypes.array,
  geschaefteKontakteExtern: PropTypes.array,
  geschaeftKontaktExternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteExtern
