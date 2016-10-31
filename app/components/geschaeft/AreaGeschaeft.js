import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import regularStyles from './areaGeschaeft.css'
import pdfStyles from './areaGeschaeftPdf.css'
import createOptions from '../../src/createOptions'

const AreaGeschaeft = ({
  geschaeft,
  statusOptions,
  geschaeftsartOptions,
  abteilungOptions,
  wrapperClass,
  change,
  blur,
  nrOfGFields,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  const tabsToAdd = (
    wrapperClass === styles.wrapperNarrow ?
    nrOfGFields :
    0
  )

  return (
    <div className={styles.areaGeschaeft}>
      <div className={styles.areaGeschaeftTitle}>
        Geschäft
      </div>
      <div className={styles.fieldGegenstand}>
        <ControlLabel>
          Gegenstand
        </ControlLabel>
        <Textarea
          value={geschaeft.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          onBlur={blur}
          tabIndex={1 + tabsToAdd}
          autoFocus={wrapperClass !== styles.wrapperNarrow && !isPrintPreview}
          className={styles.textarea}
        />
      </div>
      {
        !(!geschaeft.ausloeser && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldAusloeser}
        >
          <ControlLabel>
            Auslöser
          </ControlLabel>
          <Textarea
            value={geschaeft.ausloeser || ''}
            name="ausloeser"
            onChange={change}
            onBlur={blur}
            tabIndex={2 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      }
      {
        !(!geschaeft.ort && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldOrt}
        >
          <ControlLabel>
            Ort
          </ControlLabel>
          <FormControl
            type="text"
            value={geschaeft.ort || ''}
            name="ort"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={3 + tabsToAdd}
          />
        </div>
      }
      {
        !(!geschaeft.geschaeftsart && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldGeschaeftsart}
        >
          <ControlLabel>
            Geschäftsart
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.geschaeftsart || ''}
            name="geschaeftsart"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={4 + tabsToAdd}
          >
            {createOptions(geschaeftsartOptions)}
          </FormControl>
        </div>
      }
      {
        !(!geschaeft.status && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldStatus}
        >
          <ControlLabel>
            Status
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.status || ''}
            name="status"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={5 + tabsToAdd}
          >
            {createOptions(statusOptions)}
          </FormControl>
        </div>
      }
      {
        !(!geschaeft.abteilung && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldAbteilung}
        >
          <ControlLabel>
            Abteilung
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.abteilung || ''}
            name="abteilung"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={6 + tabsToAdd}
          >
            {createOptions(abteilungOptions)}
          </FormControl>
        </div>
        }
      {
        !(!geschaeft.details && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldDetails}
        >
          <ControlLabel>
            Details
          </ControlLabel>
          <Textarea
            value={geschaeft.details || ''}
            name="details"
            onChange={change}
            onBlur={blur}
            tabIndex={7 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      }
      {
        !(!geschaeft.naechsterSchritt && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldNaechsterSchritt}
        >
          <ControlLabel>
            Nächster Schritt
          </ControlLabel>
          <Textarea
            value={geschaeft.naechsterSchritt || ''}
            name="naechsterSchritt"
            onChange={change}
            onBlur={blur}
            tabIndex={8 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      }
      {
        !(!geschaeft.vermerk && isPrintPreview) &&
        <div  // eslint-disable-line react/jsx-indent
          className={styles.fieldVermerk}
        >
          <ControlLabel>
            Vermerk
          </ControlLabel>
          <Textarea
            value={geschaeft.vermerk || ''}
            name="vermerk"
            onChange={change}
            onBlur={blur}
            tabIndex={9 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      }
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <Textarea
          value={geschaeft.vermerkIntern || ''}
          name="vermerkIntern"
          onChange={change}
          onBlur={blur}
          tabIndex={9 + tabsToAdd}
          className={styles.textarea}
        />
      </div>
    </div>
  )
}

AreaGeschaeft.displayName = 'AreaGeschaeft'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaGeschaeft.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  statusOptions: PropTypes.array,
  abteilungOptions: PropTypes.array,
  geschaeftsartOptions: PropTypes.array,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  wrapperClass: PropTypes.string.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaGeschaeft
