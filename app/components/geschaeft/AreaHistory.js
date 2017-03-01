import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import AreaHistoryRows from './AreaHistoryRows'

// eslint-disable-next-line no-unused-vars
const Container = styled(({ isPrintPreview, children, ...rest }) => <div {...rest}>{children}</div>)`
  grid-area: areaHistory;
  background-color: rgb(227, 232, 255);
  display: grid;
  grid-template-columns: calc(100% - 156px) 70px 70px;
  grid-template-areas:
    "areaHistoryTitle labelVorgeschaeft fieldVorgeschaeft"
    "areaHistoryFieldsContainer areaHistoryFieldsContainer areaHistoryFieldsContainer";
  grid-column-gap: 8px;
  grid-row-gap: ${(props) => (props.isPrintPreview ? '1px' : '8px')};
  padding: 8px;
  border: ${(props) => (props.isPrintPreview ? '1px solid #CCC' : 'inherit')};
  font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
`
const Title = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaHistoryTitle;
`
const FieldVorgeschaeft = styled.div`
  grid-area: fieldVorgeschaeft;
`
// eslint-disable-next-line no-unused-vars
const LabelVorgeschaeft = styled(({ isPrintPreview, children, ...rest }) => <ControlLabel {...rest}>{children}</ControlLabel>)`
  grid-area: labelVorgeschaeft;
  margin-top: ${(props) => (props.isPrintPreview ? 0 : '10px')};
  text-align: right;
`

const enhance = compose(
  inject('store'),
  observer
)

const AreaHistory = ({
  store,
  location,
  blur,
  change,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const path = location.pathname
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )
  const isPrintPreview = path === '/geschaeftPdf'

  return (
    <Container isPrintPreview={isPrintPreview}>
      <Title>
        Historie
      </Title>
      <LabelVorgeschaeft isPrintPreview={isPrintPreview}>
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
  store: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
}

export default enhance(AreaHistory)
