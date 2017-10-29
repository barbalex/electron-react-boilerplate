import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import _ from 'lodash'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import ComparatorSelector from './ComparatorSelector'
import SortSelector from './SortSelector'

const interneOptionsList = interneOptions => {
  // sort interneOptions by kurzzeichen
  const interneOptionsWithItKonto = interneOptions.filter(o => !!o.itKonto)
  const interneOptionsSorted = _.sortBy(interneOptionsWithItKonto, o => o.kurzzeichen.toLowerCase())
  const options = interneOptionsSorted.map((o, index) => {
    let times = 5 - o.kurzzeichen.length
    // make sure, times is never < 0
    if (times < 0) {
      times = 0
    }
    const space = '\xa0'.repeat(times)
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option key={index + 1} value={o.itKonto}>
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
      </option>
    )
  })
  options.unshift(<option key={0} value="" />)
  return options
}

const interneData = (values, interneOptions) => {
  const data = interneOptions.find(o => o.itKonto === values.mutationsperson)
  if (!data) return ''
  const name = `${data.vorname || ''} ${data.name || ''}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const Container = styled.div`
  grid-area: areaZuletztMutiert;
  background-color: white;
  box-shadow: inset 1em 1em 2em rgb(239, 239, 239), inset -1em -1em 2em rgb(239, 239, 239);
  outline: 1px solid #efefef;
  display: grid;
  grid-template-columns: 175px calc((100% - 10px) - 175px);
  grid-column-gap: 8px;
  grid-row-gap: 2px;
  padding: 8px;
  align-items: end;
`
const FieldVerantwortlichSelector = styled.div`grid-column: 1 / span 1;`
const FieldVerantwortlichName = styled(FormControl.Static)`grid-column: 2 / span 1;`
const VerantwortlichDropdown = styled(FormControl)`
  font-family: 'Lucida Console', Monaco, monospace;
  width: 80px;
`

const enhance = compose(inject('store'), observer)

const AreaZuletztMutiert = ({ store, values, change, firstTabIndex, changeComparator }) => (
  <Container>
    <FieldVerantwortlichSelector>
      <ControlLabel>Mutations-Person</ControlLabel>
      <InputGroup>
        <SortSelector name="mutationsperson" />
        <ComparatorSelector name="mutationsperson" changeComparator={changeComparator} />
        <VerantwortlichDropdown
          componentClass="select"
          value={values.mutationsperson || ''}
          name="mutationsperson"
          onChange={change}
          bsSize="small"
          tabIndex={1 + firstTabIndex}
        >
          {interneOptionsList(store.geschaefte.interneOptions)}
        </VerantwortlichDropdown>
      </InputGroup>
    </FieldVerantwortlichSelector>
    <FieldVerantwortlichName>{interneData(values, store.geschaefte.interneOptions)}</FieldVerantwortlichName>
  </Container>
)

AreaZuletztMutiert.displayName = 'AreaZuletztMutiert'

AreaZuletztMutiert.propTypes = {
  store: PropTypes.object.isRequired,
  values: PropTypes.object,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaZuletztMutiert)
