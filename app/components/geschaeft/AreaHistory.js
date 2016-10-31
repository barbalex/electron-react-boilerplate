import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import regularStyles from './areaHistory.css'
import pdfStyles from './areaHistoryPdf.css'
import AreaHistoryRows from '../../containers/geschaeft/AreaHistoryRows'

const AreaHistory = ({
  geschaeft,
  blur,
  change,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaHistory}>
      <div className={styles.areaHistoryTitle}>
        Historie
      </div>
      <ControlLabel className={styles.labelVorgeschaeft}>
        Vorgeschäft
      </ControlLabel>
      <div className={styles.fieldVorgeschaeft}>
        <FormControl
          type="number"
          value={geschaeft.idVorgeschaeft || ''}
          name="idVorgeschaeft"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          placeholder={isPrintPreview ? null : 'ID'}
          tabIndex={99}
        />
      </div>
      <AreaHistoryRows />
    </div>
  )
}

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaHistory
