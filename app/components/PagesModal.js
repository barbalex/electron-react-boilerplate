import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import styled from 'styled-components'

const Body = styled(Modal.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const RightDiv = styled.div`
  padding-left: 30px;
`
const P = styled.p`
  text-align: center;
  margin-top: 3px;
  margin-bottom: 3px;
`

const PagesModal = ({
  modalTextLine1,
  modalTextLine2,
  pagesStop,
}) =>
  <Modal.Dialog
    bsSize={modalTextLine2 ? 'large' : 'small'}
  >
    <Body>
      <div>
        <P>
          {modalTextLine1}
        </P>
        {
          modalTextLine2 &&
          <P>
            {modalTextLine2}
          </P>
        }
      </div>
      <RightDiv>
        <Button onClick={() => pagesStop()}>
          Abbrechen
        </Button>
      </RightDiv>
    </Body>
  </Modal.Dialog>

PagesModal.displayName = 'PagesModal'

PagesModal.propTypes = {
  modalTextLine1: PropTypes.string.isRequired,
  modalTextLine2: PropTypes.string.isRequired,
  pagesStop: PropTypes.func.isRequired,
}

export default PagesModal
