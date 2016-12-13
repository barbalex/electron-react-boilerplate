import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { FormControl, ControlLabel } from 'react-bootstrap'
import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'

const AreaLinks = ({
  links,
  activeId,
  blur,
  change,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  const onDrop = (files) => {
    console.log('Received files: ', files)
    console.log('path: ', files[0].path)
  }

  return (
    <div className={styles.areaLinks}>
      <div className={styles.title}>
        Links
      </div>
      <div className={styles.links}>
        {
          links.map((link, index) =>
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
        }
      </div>
      <div className={styles.dropzoneContainer}>
        <Dropzone
          onDrop={onDrop}
          className={styles.dropzone}
        >
          <div>Datei hierhin ziehen...</div>
          <div>...oder klicken, um sie zu wählen.</div>
        </Dropzone>
      </div>
    </div>
  )
}

AreaLinks.displayName = 'AreaLinks'

AreaLinks.propTypes = {
  links: PropTypes.array.isRequired,
  activeId: PropTypes.number.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaLinks
