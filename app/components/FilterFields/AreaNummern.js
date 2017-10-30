import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel } from 'react-bootstrap'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import Input from './Input'
import SelectInput from './SelectInput'

const Container = styled.div`
  grid-area: areaNummern;
  background-color: white;
  box-shadow: inset 1em 1em 2em rgb(239, 239, 239), inset -1em -1em 2em rgb(239, 239, 239);
  outline: 1px solid #efefef;
  display: grid;
  /* can't use 1fr for first column - does not work correctly, no idea why */
  grid-template-columns: calc(100% - 366px) 8px 175px 8px 175px;
  grid-template-rows: auto;
  grid-template-areas: 'areaNummernTitle areaNummernTitle labelNr . labelJahre' 'labelIdGeschaeft . fieldIdGeschaeft . .'
    'labelGekoNr . fieldGekoNr . .' 'labelEntscheidAwel . fieldEntscheidAwelNr slashAwel fieldEntscheidAwelJahr'
    'labelEntscheidBdv . fieldEntscheidBdvNr slashBdv fieldEntscheidBdvJahr'
    'labelEntscheidRrb . fieldEntscheidRrbNr slashRrb fieldEntscheidRrbJahr'
    'labelEntscheidBvv . fieldEntscheidBvvNr slashBvv fieldEntscheidBvvJahr'
    'labelEntscheidKr . fieldEntscheidKrNr slashKr fieldEntscheidKrJahr' 'fieldAktenstandort . fieldAktennummer . .';
  grid-row-gap: 2px;
  padding: 8px;
`
const Title = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaNummernTitle;
`
const LabelNr = styled(ControlLabel)`
  grid-area: labelNr;
  position: relative;
  min-height: 16px;
`
const LabelNrDiv = styled.div`
  position: absolute;
  bottom: 1px;
`
const LabelIdGeschaeft = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelIdGeschaeft;
`
const FieldIdGeschaeft = styled.div`grid-area: fieldIdGeschaeft;`
const LabelGekoNr = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelGekoNr;
`
const FieldGekoNr = styled.div`grid-area: fieldGekoNr;`
const LabelJahre = styled.div`
  color: #757575;
  font-size: 11px;
  font-weight: 500;
  grid-area: labelJahre;
  position: relative;
  min-height: 16px;
`
const LabelEntscheidAwel = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelEntscheidAwel;
`
const FieldEntscheidAwelNr = styled.div`grid-area: fieldEntscheidAwelNr;`
const FieldSlashAwel = styled.div`
  margin-top: 2px;
  font-size: 22px;
  color: #757575;
  margin-left: 1px;
  grid-area: slashAwel;
`
const FieldEntscheidAwelJahr = styled.div`grid-area: fieldEntscheidAwelJahr;`
const LabelEntscheidBdv = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelEntscheidBdv;
`
const FieldEntscheidBdvNr = styled.div`grid-area: fieldEntscheidBdvNr;`
const FieldSlashBdv = styled.div`
  margin-top: 2px;
  font-size: 22px;
  color: #757575;
  margin-left: 1px;
  grid-area: slashBdv;
`
const FieldEntscheidBdvJahr = styled.div`grid-area: fieldEntscheidBdvJahr;`
const LabelEntscheidRrb = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelEntscheidRrb;
`
const FieldEntscheidRrbNr = styled.div`grid-area: fieldEntscheidRrbNr;`
const FieldSlashRrb = styled.div`
  margin-top: 2px;
  font-size: 22px;
  color: #757575;
  margin-left: 1px;
  grid-area: slashRrb;
`
const FieldEntscheidRrbJahr = styled.div`grid-area: fieldEntscheidRrbJahr;`
const LabelEntscheidBvv = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelEntscheidBvv;
`
const FieldEntscheidBvvNr = styled.div`grid-area: fieldEntscheidBvvNr;`
const FieldSlashBvv = styled.div`
  margin-top: 2px;
  font-size: 22px;
  color: #757575;
  margin-left: 1px;
  grid-area: slashBvv;
`
const FieldEntscheidBvvJahr = styled.div`grid-area: fieldEntscheidBvvJahr;`
const LabelEntscheidKr = styled(ControlLabel)`
  margin-top: 11px;
  text-align: right;
  grid-area: labelEntscheidKr;
`
const FieldEntscheidKrNr = styled.div`grid-area: fieldEntscheidKrNr;`
const FieldSlashKr = styled.div`
  margin-top: 2px;
  font-size: 22px;
  color: #757575;
  margin-left: 1px;
  grid-area: slashKr;
`
const FieldEntscheidKrJahr = styled.div`grid-area: fieldEntscheidKrJahr;`
const FieldAktenstandort = styled.div`grid-area: fieldAktenstandort;`
const FieldAktennummer = styled.div`grid-area: fieldAktennummer;`

const enhance = compose(inject('store'), observer)

const AreaNummern = ({ store, values, firstTabIndex, change, changeComparator }) => (
  <Container>
    <Title>Nummern</Title>
    <LabelNr>
      <LabelNrDiv>Nr.</LabelNrDiv>
    </LabelNr>
    <LabelIdGeschaeft>ID</LabelIdGeschaeft>
    <FieldIdGeschaeft>
      <Input
        type="number"
        name="idGeschaeft"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={1 + firstTabIndex}
      />
    </FieldIdGeschaeft>
    <LabelGekoNr>Geko</LabelGekoNr>
    <FieldGekoNr>
      <Input type="text" name="gekoNr" change={change} values={values} changeComparator={changeComparator} tabIndex={2 + firstTabIndex} />
    </FieldGekoNr>
    <LabelJahre>
      <LabelNrDiv>Jahr</LabelNrDiv>
    </LabelJahre>
    <LabelEntscheidAwel>AWEL</LabelEntscheidAwel>
    <FieldEntscheidAwelNr>
      <Input
        type="number"
        name="entscheidAwelNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={3 + firstTabIndex}
      />
    </FieldEntscheidAwelNr>
    <FieldSlashAwel>
      <div>/</div>
    </FieldSlashAwel>
    <FieldEntscheidAwelJahr>
      <Input
        type="number"
        name="entscheidAwelJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={4 + firstTabIndex}
      />
    </FieldEntscheidAwelJahr>
    <LabelEntscheidBdv>BDV</LabelEntscheidBdv>
    <FieldEntscheidBdvNr>
      <Input
        type="number"
        name="entscheidBdvNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={5 + firstTabIndex}
      />
    </FieldEntscheidBdvNr>
    <FieldSlashBdv>
      <div>/</div>
    </FieldSlashBdv>
    <FieldEntscheidBdvJahr>
      <Input
        type="number"
        name="entscheidBdvJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={6 + firstTabIndex}
      />
    </FieldEntscheidBdvJahr>
    <LabelEntscheidRrb>RRB</LabelEntscheidRrb>
    <FieldEntscheidRrbNr>
      <Input
        type="number"
        name="entscheidRrbNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={7 + firstTabIndex}
      />
    </FieldEntscheidRrbNr>
    <FieldSlashRrb>
      <div>/</div>
    </FieldSlashRrb>
    <FieldEntscheidRrbJahr>
      <Input
        type="number"
        name="entscheidRrbJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={8 + firstTabIndex}
      />
    </FieldEntscheidRrbJahr>
    <LabelEntscheidBvv>BVV</LabelEntscheidBvv>
    <FieldEntscheidBvvNr>
      <Input
        type="number"
        name="entscheidBvvNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={9 + firstTabIndex}
      />
    </FieldEntscheidBvvNr>
    <FieldSlashBvv>
      <div>/</div>
    </FieldSlashBvv>
    <FieldEntscheidBvvJahr>
      <Input
        type="number"
        name="entscheidBvvJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={10 + firstTabIndex}
      />
    </FieldEntscheidBvvJahr>
    <LabelEntscheidKr>KR</LabelEntscheidKr>
    <FieldEntscheidKrNr>
      <Input
        type="number"
        name="entscheidKrNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={11 + firstTabIndex}
      />
    </FieldEntscheidKrNr>
    <FieldSlashKr>
      <div>/</div>
    </FieldSlashKr>
    <FieldEntscheidKrJahr>
      <Input
        type="number"
        name="entscheidKrJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={12 + firstTabIndex}
      />
    </FieldEntscheidKrJahr>
    <FieldAktenstandort>
      <ControlLabel>Aktenstandort</ControlLabel>
      <SelectInput
        name="aktenstandort"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={13 + firstTabIndex}
        options={toJS(store.geschaefte.aktenstandortOptions)}
      />
    </FieldAktenstandort>
    <FieldAktennummer>
      <ControlLabel>Nr.</ControlLabel>
      <Input
        type="text"
        name="aktennummer"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={14 + firstTabIndex}
      />
    </FieldAktennummer>
  </Container>
)

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  store: PropTypes.object.isRequired,
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaNummern)
