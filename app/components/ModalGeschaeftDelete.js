import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

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

export default ModalGeschaeftDelete
