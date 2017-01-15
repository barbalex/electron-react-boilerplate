import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components'
import clone from 'lodash/clone'

import GekoNrField from '../../containers/geschaeft/GekoNrField'
import createOptions from '../../src/createOptions'

const ContainerBase = styled.div`
  grid-area: areaNummern
  display: grid;
  grid-template-rows: auto;
  padding: 8px;
`
const ContainerView = styled(ContainerBase)`
  background-color: rgba(239, 239, 239, 1);
  /* can't use 1fr for first column - does not work correctly, no idea why */
  grid-template-columns: calc(100% - 196px) 8px 90px 8px 90px;
  grid-template-areas:
     "areaNummernTitle areaNummernTitle labelNr . labelJahre"
     "labelIdGeschaeft . fieldIdGeschaeft . ."
     "labelGekoNr . fieldGekoNr . ."
     "labelEntscheidAwel . fieldEntscheidAwelNr slashAwel fieldEntscheidAwelJahr"
     "labelEntscheidBdv . fieldEntscheidBdvNr slashBdv fieldEntscheidBdvJahr"
     "labelEntscheidRrb . fieldEntscheidRrbNr slashRrb fieldEntscheidRrbJahr"
     "labelEntscheidBvv . fieldEntscheidBvvNr slashBvv fieldEntscheidBvvJahr"
     "labelEntscheidKr . fieldEntscheidKrNr slashKr fieldEntscheidKrJahr"
     "fieldAktenstandort . fieldAktennummer . .";
  grid-row-gap: 2px;
`
const ContainerPrint = styled(ContainerBase)`
  /* can't use 1fr for first column - does not work correctly, no idea why */
  grid-template-columns: calc(100% - 166px) 8px 75px 8px 45px;
  grid-template-areas:
    "areaNummernTitle areaNummernTitle areaNummernTitle areaNummernTitle areaNummernTitle"
    ". . labelNr . labelJahre"
    "labelIdGeschaeft . fieldIdGeschaeft . ."
    "labelGekoNr . fieldGekoNr . ."
    ". . . . ."
    "labelEntscheidAwel . fieldEntscheidAwelNr slashAwel fieldEntscheidAwelJahr"
    "labelEntscheidBdv . fieldEntscheidBdvNr slashBdv fieldEntscheidBdvJahr"
    "labelEntscheidRrb . fieldEntscheidRrbNr slashRrb fieldEntscheidRrbJahr"
    "labelEntscheidBvv . fieldEntscheidBvvNr slashBvv fieldEntscheidBvvJahr"
    "labelEntscheidKr . fieldEntscheidKrNr slashKr fieldEntscheidKrJahr"
    "fieldAktenstandort fieldAktenstandort fieldAktenstandort . fieldAktennummer";
  border: 1px solid #CCC;
  border-bottom: none;
  border-left: none;
`
const LabelJahre = styled.div`
  grid-area: labelJahre;
  position: relative;
  min-height: 16px;
  color: #757575;
  font-size: 11px;
  font-weight: 500;
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
const Slash = styled.div`
  margin-top: ${(props) => (props.isPrintPreview ? '-3px' : '2px')};
  font-size: ${(props) => (props.isPrintPreview ? '18px' : '22px')};
  height: ${(props) => (props.isPrintPreview ? '17px' : 'auto')};
  color: #757575;
  margin-left: 1px;
`
const SlashAwel = styled(Slash)`
  grid-area: slashAwel;
`
const SlashBdv = styled(Slash)`
  grid-area: slashBdv;
`
const SlashKr = styled(Slash)`
  grid-area: slashKr;
`
const SlashBvv = styled(Slash)`
  grid-area: slashBvv;
`
const SlashRrb = styled(Slash)`
  grid-area: slashRrb;
`
const LabelHorizontal = styled(ControlLabel)`
  margin-top: ${(props) => (props.isPrintPreview ? 0 : '11px')};
  text-align: right;
  font-size: ${(props) => (props.isPrintPreview ? '10px !important' : '11px')};
  height: ${(props) => (props.isPrintPreview ? '17px' : 'auto')};
`
const AreaNummernTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaNummernTitle;
`
const Field = styled.div`
  height: ${(props) => (props.isPrintPreview ? '17px' : 'auto')};
  input {
    font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
  }
`
const FieldIdGeschaeft = styled(Field)`
  grid-area: fieldIdGeschaeft;
`
const LabelIdGeschaeft = styled(LabelHorizontal)`
  grid-area: labelIdGeschaeft;
`
const InputIdGeschaeft = styled(FormControl)`
  background: transparent !important;
`
const FieldGekoNr = styled(Field)`
  grid-area: fieldGekoNr;
`
const LabelGekoNr = styled(LabelHorizontal)`
  grid-area: labelGekoNr
`
const FieldEntscheidAwelNr = styled(Field)`
  grid-area: fieldEntscheidAwelNr;
`
const LabelEntscheidAwel = styled(LabelHorizontal)`
  grid-area: labelEntscheidAwel
`
const FieldEntscheidAwelJahr = styled(Field)`
  grid-area: fieldEntscheidAwelJahr;
`
const FieldEntscheidBdvNr = styled(Field)`
  grid-area: fieldEntscheidBdvNr;
`
const LabelEntscheidBdv = styled(LabelHorizontal)`
  grid-area: labelEntscheidBdv;
`
const FieldEntscheidBdvJahr = styled(Field)`
  grid-area: fieldEntscheidBdvJahr;
`
const FieldEntscheidKrNr = styled(Field)`
  grid-area: fieldEntscheidKrNr;
`
const LabelEntscheidKr = styled(LabelHorizontal)`
  grid-area: labelEntscheidKr;
`
const FieldEntscheidKrJahr = styled(Field)`
  grid-area: fieldEntscheidKrJahr;
`
const FieldEntscheidBvvNr = styled(Field)`
  grid-area: fieldEntscheidBvvNr;
`
const LabelEntscheidBvv = styled(LabelHorizontal)`
  grid-area: labelEntscheidBvv;
`
const FieldEntscheidBvvJahr = styled(Field)`
  grid-area: fieldEntscheidBvvJahr;
`
const FieldEntscheidRrbNr = styled(Field)`
  grid-area: fieldEntscheidRrbNr;
`
const LabelEntscheidRrb = styled(LabelHorizontal)`
  grid-area: labelEntscheidRrb;
`
const FieldEntscheidRrbJahr = styled(Field)`
  grid-area: fieldEntscheidRrbJahr;
`
const FieldAktenstandort = styled(Field)`
  height: ${(props) => (props.isPrintPreview ? '29px' : 'auto')};
  grid-area: fieldAktenstandort;
  font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
  select, label {
    font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
  }
  select {
    height: ${(props) => (props.isPrintPreview ? '15px !important' : '34px')};
  }
`
const FieldAktennummer = styled(Field)`
  height: ${(props) => (props.isPrintPreview ? '29px' : 'auto')};
  grid-area: fieldAktennummer;
  font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
  input, label {
    font-size: ${(props) => (props.isPrintPreview ? '10px' : 'inherit')};
  }
`

const AreaNummern = ({
  aktenstandortOptions,
  geschaeft,
  viewIsNarrow,
  nrOfGFields,
  change,
  blur,
  isPrintPreview,
}) => {
  const tabsToAdd = viewIsNarrow ? 0 : nrOfGFields
  const Container = isPrintPreview ? ContainerPrint : ContainerView
  const gekoValues = geschaeft.geko
    .filter(g => g.idGeschaeft === geschaeft.idGeschaeft)
    .map(g => g.gekoNr)
    .sort()
  const gekoValuesString = gekoValues.join(', ')
  const gekoFields = gekoValues.map(g =>
    <GekoNrField
      key={g || 0}
      idGeschaeft={geschaeft.idGeschaeft}
      gekoNr={g}
      tabsToAdd={tabsToAdd}
    />
  )
  gekoFields.push(
    <GekoNrField
      key={0}
      idGeschaeft={geschaeft.idGeschaeft}
      gekoNr=""
      tabsToAdd={tabsToAdd}
    />
  )

  return (
    <Container>
      <AreaNummernTitle>
        Nummern
      </AreaNummernTitle>
      <LabelNr>
        <LabelNrDiv>
          Nr.
        </LabelNrDiv>
      </LabelNr>
      <LabelIdGeschaeft isPrintPreview={isPrintPreview}>
        ID
      </LabelIdGeschaeft>
      <FieldIdGeschaeft isPrintPreview={isPrintPreview}>
        <InputIdGeschaeft
          type="number"
          value={geschaeft.idGeschaeft}
          bsSize="small"
          disabled
        />
      </FieldIdGeschaeft>
      <LabelGekoNr isPrintPreview={isPrintPreview}>
        Geko
      </LabelGekoNr>
      <FieldGekoNr isPrintPreview={isPrintPreview}>
        {
          isPrintPreview &&
          <FormControl
            type="text"
            defaultValue={gekoValuesString}
            name="gekoNr"
            bsSize="small"
            tabIndex={1 + tabsToAdd}
          />
        }
        {
          !isPrintPreview &&
          <div>
            {gekoFields}
          </div>
        }
      </FieldGekoNr>
      <LabelJahre>
        <LabelNrDiv>
          Jahr
        </LabelNrDiv>
      </LabelJahre>
      <LabelEntscheidAwel isPrintPreview={isPrintPreview}>
        AWEL
      </LabelEntscheidAwel>
      <FieldEntscheidAwelNr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidAwelNr || ''}
          name="entscheidAwelNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={2 + tabsToAdd}
        />
      </FieldEntscheidAwelNr>
      <SlashAwel isPrintPreview={isPrintPreview}>
        <div>/</div>
      </SlashAwel>
      <FieldEntscheidAwelJahr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidAwelJahr || ''}
          name="entscheidAwelJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={3 + tabsToAdd}
        />
      </FieldEntscheidAwelJahr>
      <LabelEntscheidBdv isPrintPreview={isPrintPreview}>
        BDV
      </LabelEntscheidBdv>
      <FieldEntscheidBdvNr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBdvNr || ''}
          name="entscheidBdvNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={4 + tabsToAdd}
        />
      </FieldEntscheidBdvNr>
      <SlashBdv isPrintPreview={isPrintPreview}>
        <div>/</div>
      </SlashBdv>
      <FieldEntscheidBdvJahr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBdvJahr || ''}
          name="entscheidBdvJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={5 + tabsToAdd}
        />
      </FieldEntscheidBdvJahr>
      <LabelEntscheidRrb isPrintPreview={isPrintPreview}>
        RRB
      </LabelEntscheidRrb>
      <FieldEntscheidRrbNr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidRrbNr || ''}
          name="entscheidRrbNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        />
      </FieldEntscheidRrbNr>
      <SlashRrb isPrintPreview={isPrintPreview}>
        <div>/</div>
      </SlashRrb>
      <FieldEntscheidRrbJahr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidRrbJahr || ''}
          name="entscheidRrbJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={7 + tabsToAdd}
        />
      </FieldEntscheidRrbJahr>
      <LabelEntscheidBvv isPrintPreview={isPrintPreview}>
        BVV
      </LabelEntscheidBvv>
      <FieldEntscheidBvvNr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBvvNr || ''}
          name="entscheidBvvNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={8 + tabsToAdd}
        />
      </FieldEntscheidBvvNr>
      <SlashBvv isPrintPreview={isPrintPreview}>
        <div>/</div>
      </SlashBvv>
      <FieldEntscheidBvvJahr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidBvvJahr || ''}
          name="entscheidBvvJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={9 + tabsToAdd}
        />
      </FieldEntscheidBvvJahr>
      <LabelEntscheidKr isPrintPreview={isPrintPreview}>
        KR
      </LabelEntscheidKr>
      <FieldEntscheidKrNr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidKrNr || ''}
          name="entscheidKrNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={10 + tabsToAdd}
        />
      </FieldEntscheidKrNr>
      <SlashKr isPrintPreview={isPrintPreview}>
        <div>/</div>
      </SlashKr>
      <FieldEntscheidKrJahr isPrintPreview={isPrintPreview}>
        <FormControl
          type="number"
          value={geschaeft.entscheidKrJahr || ''}
          name="entscheidKrJahr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={11 + tabsToAdd}
        />
      </FieldEntscheidKrJahr>
      <FieldAktenstandort isPrintPreview={isPrintPreview}>
        <ControlLabel>
          Aktenstandort
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.aktenstandort || ''}
          name="aktenstandort"
          onChange={change}
          bsSize="small"
          tabIndex={12 + tabsToAdd}
        >
          {createOptions(aktenstandortOptions)}
        </FormControl>
      </FieldAktenstandort>
      <FieldAktennummer isPrintPreview={isPrintPreview}>
        <ControlLabel>
          Nr.
        </ControlLabel>
        <FormControl
          type="text"
          value={geschaeft.aktennummer || ''}
          name="aktennummer"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={13 + tabsToAdd}
        />
      </FieldAktennummer>
    </Container>
  )
}

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  aktenstandortOptions: PropTypes.array.isRequired,
  geschaeft: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  viewIsNarrow: PropTypes.bool.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
  gekoRemove: PropTypes.func.isRequired,
  gekoNewCreate: PropTypes.func.isRequired,
}

export default AreaNummern
