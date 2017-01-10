import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import styles from './PagesModal.css'

const PagesModal = ({
  modalTextLine1,
  modalTextLine2,
  pagesStop,
}) =>
  <Modal.Dialog
    bsSize={modalTextLine2 ? 'large' : 'small'}
    dialogClassName={styles.modal}
  >
    <Modal.Body className={styles.body}>
      <div className={styles.left}>
        <p className={styles.p}>
          {modalTextLine1}
        </p>
        {
          modalTextLine2 &&
          <p  // eslint-disable-line react/jsx-indent
            className={styles.p}
          >
            {modalTextLine2}
          </p>
        }
      </div>
      <div className={styles.right}>
        <Button onClick={() => pagesStop()}>
          Abbrechen
        </Button>
      </div>
    </Modal.Body>
  </Modal.Dialog>

PagesModal.displayName = 'PagesModal'

PagesModal.propTypes = {
  modalTextLine1: PropTypes.string.isRequired,
  modalTextLine2: PropTypes.string.isRequired,
  pagesStop: PropTypes.func.isRequired,
}

export default PagesModal
