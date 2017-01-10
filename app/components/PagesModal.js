import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './PagesModal.css'

const PagesModal = ({
  modalTextLine1,
  modalTextLine2,
}) =>
  <Modal.Dialog
    bsSize={modalTextLine2 ? 'large' : 'small'}
    dialogClassName={styles.modal}
  >
    <Modal.Body>
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
    </Modal.Body>
  </Modal.Dialog>

PagesModal.displayName = 'PagesModal'

PagesModal.propTypes = {
  modalTextLine1: PropTypes.string.isRequired,
  modalTextLine2: PropTypes.string,
}

export default PagesModal
