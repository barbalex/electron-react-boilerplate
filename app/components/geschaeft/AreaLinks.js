import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Glyphicon } from 'react-bootstrap'

import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'

const AreaLinks = ({
  links,
  linkNewCreate,
  linkRemove,
  activeId,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  const onDrop = files =>
    linkNewCreate(activeId, files[0].path)

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
              <div className={styles.deleteGlyphiconDiv}>
                <Glyphicon
                  glyph="remove-circle"
                  onClick={() => linkRemove(activeId, link.url)}
                  className={styles.removeGlyphicon}
                  title="Link entfernen"
                />
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
  linkRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaLinks
