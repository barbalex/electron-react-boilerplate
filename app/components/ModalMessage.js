import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './ModalMessage.css'

const ModalMessage = ({
  messageTextLine1,
  messageTextLine2,
}) =>
  <Modal.Dialog
    bsSize={messageTextLine2 ? 'large' : 'small'}
    dialogClassName={styles.modal}
  >
    <Modal.Body>
      <p className={styles.p}>
        {messageTextLine1}
      </p>
      {
        messageTextLine2 &&
        <p  // eslint-disable-line react/jsx-indent
          className={styles.p}
        >
          {messageTextLine2}
        </p>
      }
    </Modal.Body>
  </Modal.Dialog>

ModalMessage.displayName = 'ModalMessage'

ModalMessage.propTypes = {
  messageTextLine1: PropTypes.string.isRequired,
  messageTextLine2: PropTypes.string,
}

export default ModalMessage
