import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './ModalMessage.css'

const enhance = compose(
  inject('store'),
  observer
)

const ModalMessage = ({ store }) => {
  const { messageTextLine1, messageTextLine2 } = store.app

  return (
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
          <p className={styles.p}>
            {messageTextLine2}
          </p>
        }
      </Modal.Body>
    </Modal.Dialog>
  )
}

ModalMessage.displayName = 'ModalMessage'

ModalMessage.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(ModalMessage)
