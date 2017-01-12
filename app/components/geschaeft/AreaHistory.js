import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components'

import AreaHistoryRows from '../../containers/geschaeft/AreaHistoryRows'

const AreaHistory = ({
  geschaeft,
  blur,
  change,
  path,
}) => {
  const isPrintPreview = path === '/geschaeftPdf'
  const Container = styled.div`
    grid-area: areaHistory;
    background-color: rgb(227, 232, 255);
    display: grid;
    grid-template-columns: calc(100% - 156px) 70px 70px;
    grid-template-areas:
      "areaHistoryTitle labelVorgeschaeft fieldVorgeschaeft"
      "areaHistoryFieldsContainer areaHistoryFieldsContainer areaHistoryFieldsContainer";
    grid-column-gap: 8px;
    grid-row-gap: ${isPrintPreview ? '1px' : '8px'};
    padding: 8px;
    border: ${isPrintPreview ? '1px solid #CCC' : 'inherit'};
    font-size: ${isPrintPreview ? '10px' : 'inherit'};
  `
  const Title = styled.div`
    font-weight: 900;
    font-size: 16px;
    grid-area: areaHistoryTitle;
  `
  const FieldVorgeschaeft = styled.div`
    grid-area: fieldVorgeschaeft;
  `
  const LabelVorgeschaeft = styled(ControlLabel)`
    grid-area: labelVorgeschaeft;
    margin-top: ${isPrintPreview ? 0 : '10px'};
    text-align: right;
  `

  return (
    <Container>
      <Title>
        Historie
      </Title>
      <LabelVorgeschaeft>
        Vorgeschäft
      </LabelVorgeschaeft>
      <FieldVorgeschaeft>
        <FormControl
          type="number"
          value={geschaeft.idVorgeschaeft || ''}
          name="idVorgeschaeft"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          placeholder={isPrintPreview ? null : 'ID'}
          tabIndex={99}
        />
      </FieldVorgeschaeft>
      <AreaHistoryRows />
    </Container>
  )
}

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

export default AreaHistory
