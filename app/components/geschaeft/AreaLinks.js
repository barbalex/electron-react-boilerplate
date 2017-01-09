import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'

const AreaLinks = ({
  links,
  linkNewCreate,
  activeId,
  blur,
  change,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  const onDrop = (files) => {
    console.log('Received files: ', files)
    console.log('path: ', files[0].path)
    linkNewCreate(activeId, files[0].path)
  }

  return (
    <div className={styles.areaLinks}>
      <div className={styles.title}>
        Links
      </div>
      <div className={styles.links}>
        {
          links.map(link =>
            <div
              key={`${link.idGeschaeft}${link.url}`}
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
  linkNewCreate: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaLinks
