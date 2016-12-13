import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'

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
          links.map((link, index) => {
            return (
              <div
                key={index}
                className={styles.fields}
              >
                <div className={styles.url}>
                  {link.url}
                </div>
                <div className={styles.txt}>
                  {link.txt}
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
