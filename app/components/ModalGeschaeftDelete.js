import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const {
      geschaeftRemove,
      geschaeftRemoveDeleteIntended,
    } = store
    const { activeId } = store.geschaefte
    return {
      activeId,
      geschaeftRemove,
      geschaeftRemoveDeleteIntended,
    }
  }),
  observer
)

const ModalGeschaeftDelete = ({
  geschaeftRemove,
  geschaeftRemoveDeleteIntended,
  activeId,
}) =>
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>
        Geschäft löschen
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Möchten Sie das Geschäft Nr. {activeId} wirklich löschen?
    </Modal.Body>
    <Modal.Footer>
      <Button
        onClick={geschaeftRemoveDeleteIntended}
      >
        Nein
      </Button>
      <Button
        bsStyle="primary"
        onClick={() =>
          geschaeftRemove(activeId)
        }
      >
        Ja
      </Button>
    </Modal.Footer>
  </Modal.Dialog>

ModalGeschaeftDelete.displayName = 'ModalGeschaeftDelete'

ModalGeschaeftDelete.propTypes = {
  geschaeftRemove: PropTypes.func.isRequired,
  geschaeftRemoveDeleteIntended: PropTypes.func.isRequired,
  activeId: PropTypes.number,
}

export default enhance(ModalGeschaeftDelete)
