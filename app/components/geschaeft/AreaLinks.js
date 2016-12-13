import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'
import AreaHistoryRows from '../../containers/geschaeft/AreaHistoryRows'

const AreaHistory = ({
  links,
  activeId,
  blur,
  change,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaLinks}>
      <div className={styles.areaLinksTitle}>
        Links
      </div>
      <div className={styles.links}>
        {
          history.map((id, index) => {
            const geschaeft = geschaefte.find(g =>
              g.idGeschaeft === id
            )
            if (!geschaeft) {
              return null
            }
            return (
              <div
                key={index}
                className={styles.fields}
                style={{
                  cursor: id === activeId ? 'default' : 'pointer'
                }}
                onClick={() => {
                  if (id !== activeId) {
                    return geschaeftToggleActivated(id)
                  }
                }}
              >
                <div className={styles.url}>
                  {id}
                </div>
                <div className={styles.txt}>
                  {geschaeft.gegenstand}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  links: PropTypes.array.isRequired,
  activeId: PropTypes.number.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaHistory
