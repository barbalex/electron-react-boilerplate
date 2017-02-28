import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import styles from './ModalMessage.css'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const {
      showMessageModal,
      messageTextLine1,
      messageTextLine2,
    } = store.app
    return {
      showMessageModal,
      messageTextLine1,
      messageTextLine2,
    }
  }),
  observer
)

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
        <p
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

export default enhance(ModalMessage)
