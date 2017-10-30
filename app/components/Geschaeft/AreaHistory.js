import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import AreaHistoryRows from './AreaHistoryRows'

// eslint-disable-next-line no-unused-vars
const Container = styled(({ isPdf, children, ...rest }) => <div {...rest}>{children}</div>)`
  grid-area: areaHistory;
  background-color: rgb(227, 232, 255);
  display: grid;
  grid-template-columns: calc(100% - 156px) 70px 70px;
  grid-template-areas:
    "areaHistoryTitle labelVorgeschaeft fieldVorgeschaeft"
    "areaHistoryFieldsContainer areaHistoryFieldsContainer areaHistoryFieldsContainer";
  grid-column-gap: 8px;
  grid-row-gap: ${(props) => (props.isPdf ? '1px' : '8px')};
  padding: 8px;
  border: ${(props) => (props.isPdf ? '1px solid #CCC' : 'inherit')};
  font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
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
const LabelVorgeschaeft = styled(({ isPdf, children, ...rest }) => <ControlLabel {...rest}>{children}</ControlLabel>)`
  grid-area: labelVorgeschaeft;
  margin-top: ${(props) => (props.isPdf ? 0 : '10px')};
  text-align: right;
`

const enhance = compose(
  inject('store'),
  observer
)

const AreaHistory = ({
  store,
  blur,
  change,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const path = store.history.location.pathname
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  ) || {}
  const isPdf = path === '/geschaeftPdf'

  return (
    <Container isPdf={isPdf}>
      <Title>
        Historie
      </Title>
      <LabelVorgeschaeft isPdf={isPdf}>
        Vorgeschäft
      </LabelVorgeschaeft>
      <FieldVorgeschaeft>
        <FormControl
          type="number"
          value={geschaeft && geschaeft.idVorgeschaeft ? geschaeft.idVorgeschaeft : ''}
          name="idVorgeschaeft"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          placeholder={isPdf ? null : 'ID'}
          tabIndex={99}  // eslint-disable-line
        />
      </FieldVorgeschaeft>
      <AreaHistoryRows />
    </Container>
  )
}

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  store: PropTypes.object.isRequired,
  blur: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
}

export default enhance(AreaHistory)
