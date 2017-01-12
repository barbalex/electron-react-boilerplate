import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import regularStyles from './areaNummern.css'
import pdfStyles from './areaNummernPdf.css'
import createOptions from '../../src/createOptions'

const AreaNummern = ({
  aktenstandortOptions,
  geschaeft,
  viewIsNarrow,
  nrOfGFields,
  change,
  blur,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  const tabsToAdd = viewIsNarrow ? 0 : nrOfGFields

  return (
    <div className={styles.areaNummern}>
      <div className={styles.areaNummernTitle}>
        Nummern
      </div>
      <ControlLabel className={styles.labelNr}>
        <div className={styles.labelNrDiv}>
          Nr.
        </div>
      </ControlLabel>
      <ControlLabel className={styles.labelIdGeschaeft}>
        ID
      </ControlLabel>
      <div className={styles.fieldIdGeschaeft}>
        <FormControl
          type="number"
          value={geschaeft.idGeschaeft}
          bsSize="small"
          disabled
          className={[styles.typeNr, styles.inputIdGeschaeft].join(' ')}
        />
      </div>
      <ControlLabel className={styles.labelGekoNr}>
        Geko
      </ControlLabel>
      <div className={styles.fieldGekoNr}>
        <FormControl
          type="text"
          value={geschaeft.GekoNr}
          name="gekoNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={1 + tabsToAdd}
          autoFocus={viewIsNarrow}
        />
      </div>
      <div className={styles.labelJahre}>
        <div className={styles.labelNrDiv}>
          Jahr
        </div>
      </div>
      <ControlLabel className={styles.labelEntscheidAwel}>
        AWEL
      </ControlLabel>
      <div className={styles.fieldEntscheidAwelNr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidAwelNr || ''}
          name="entscheidAwelNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={2 + tabsToAdd}
        />
      </div>
      <div className={styles.slashAwel}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidAwelJahr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidAwelJahr || ''}
          name="entscheidAwelJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={3 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidBdv}>
        BDV
      </ControlLabel>
      <div className={styles.fieldEntscheidBdvNr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBdvNr || ''}
          name="entscheidBdvNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={4 + tabsToAdd}
        />
      </div>
      <div className={styles.slashBdv}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidBdvJahr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBdvJahr || ''}
          name="entscheidBdvJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={5 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidRrb}>
        RRB
      </ControlLabel>
      <div className={styles.fieldEntscheidRrbNr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidRrbNr || ''}
          name="entscheidRrbNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        />
      </div>
      <div className={styles.slashRrb}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidRrbJahr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidRrbJahr || ''}
          name="entscheidRrbJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={7 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidBvv}>
        BVV
      </ControlLabel>
      <div className={styles.fieldEntscheidBvvNr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBvvNr || ''}
          name="entscheidBvvNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={8 + tabsToAdd}
        />
      </div>
      <div className={styles.slashBvv}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidBvvJahr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBvvJahr || ''}
          name="entscheidBvvJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={9 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidKr}>
        KR
      </ControlLabel>
      <div className={styles.fieldEntscheidKrNr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidKrNr || ''}
          name="entscheidKrNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={10 + tabsToAdd}
        />
      </div>
      <div className={styles.slashKr}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidKrJahr}>
        <FormControl
          type="number"
          value={geschaeft.entscheidKrJahr || ''}
          name="entscheidKrJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={11 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldAktenstandort}>
        <ControlLabel>
          Aktenstandort
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.aktenstandort || ''}
          name="aktenstandort"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={12 + tabsToAdd}
        >
          {createOptions(aktenstandortOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldAktennummer}>
        <ControlLabel>
          Nr.
        </ControlLabel>
        <FormControl
          type="text"
          value={geschaeft.aktennummer || ''}
          name="aktennummer"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={13 + tabsToAdd}
        />
      </div>
    </div>
  )
}

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  aktenstandortOptions: PropTypes.array,
  geschaeft: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  viewIsNarrow: PropTypes.bool.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaNummern
