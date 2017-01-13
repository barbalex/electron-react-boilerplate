import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components'

import createOptions from '../../src/createOptions'

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
  const ContainerView = styled.div`
    grid-area: areaNummern;
    background-color: ${isPrintPreview ? 'transparant' : 'rgba(239, 239, 239, 1)'};
    display: grid;
    /* can't use 1fr for first column - does not work correctly, no idea why */
    grid-template-columns: ${isPrintPreview ? 'calc(100% - 166px) 8px 75px 8px 45px' : 'calc(100% - 196px) 8px 90px 8px 90px'};
    grid-template-rows: auto;
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
    padding: 8px;
  `
  const ContainerPdf = styled(ContainerView)`
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
  const Container = isPrintPreview ? ContainerPdf : ContainerView
  const Label = styled.div`
    color: #757575;
    font-size: 11px;
    font-weight: 500;
  `
  const LabelJahre = styled(Label)`
    grid-area: labelJahre;
    position: relative;
    min-height: 16px;
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
    margin-top: ${isPrintPreview ? '-3px' : '2px'};
    font-size: ${isPrintPreview ? '18px' : '22px'};
    color: #757575;
    margin-left: 1px;
    height: ${isPrintPreview ? '17px' : 'auto'}
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
    margin-top: ${isPrintPreview ? 0 : '11px'};
    text-align: right;
    font-size: ${isPrintPreview ? '10px' : '11px'};
    height: ${isPrintPreview ? '17px' : 'auto'}
  `
  const AreaNummernTitle = styled.div`
    font-weight: 900;
    font-size: 16px;
    grid-area: areaNummernTitle;
  `
  const Field = styled.div`
    height: ${isPrintPreview ? '17px' : 'auto'}
    input {
      font-size: ${isPrintPreview ? '10px' : 'inherit'};
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
    grid-area: fieldAktenstandort;
    font-size: ${isPrintPreview ? '10px' : 'inherit'};
    input, label {
      font-size: ${isPrintPreview ? '10px' : 'inherit'};
    }
  `
  const FieldAktennummer = styled(Field)`
    grid-area: fieldAktennummer;
    font-size: ${isPrintPreview ? '10px' : 'inherit'};
    input, label {
      font-size: ${isPrintPreview ? '10px' : 'inherit'};
    }
  `

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
      <LabelIdGeschaeft>
        ID
      </LabelIdGeschaeft>
      <FieldIdGeschaeft>
        <InputIdGeschaeft
          type="number"
          value={geschaeft.idGeschaeft}
          bsSize="small"
          disabled
        />
      </FieldIdGeschaeft>
      <LabelGekoNr>
        Geko
      </LabelGekoNr>
      <FieldGekoNr>
        <FormControl
          type="text"
          value={geschaeft.GekoNr}
          name="gekoNr"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={1 + tabsToAdd}
          autoFocus={viewIsNarrow}
        />
      </FieldGekoNr>
      <LabelJahre>
        <LabelNrDiv>
          Jahr
        </LabelNrDiv>
      </LabelJahre>
      <LabelEntscheidAwel>
        AWEL
      </LabelEntscheidAwel>
      <FieldEntscheidAwelNr>
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
      <SlashAwel>
        <div>/</div>
      </SlashAwel>
      <FieldEntscheidAwelJahr>
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
      <LabelEntscheidBdv>
        BDV
      </LabelEntscheidBdv>
      <FieldEntscheidBdvNr>
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
      <SlashBdv>
        <div>/</div>
      </SlashBdv>
      <FieldEntscheidBdvJahr>
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
      <LabelEntscheidRrb>
        RRB
      </LabelEntscheidRrb>
      <FieldEntscheidRrbNr>
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
      <SlashRrb>
        <div>/</div>
      </SlashRrb>
      <FieldEntscheidRrbJahr>
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
      <LabelEntscheidBvv>
        BVV
      </LabelEntscheidBvv>
      <FieldEntscheidBvvNr>
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
      <SlashBvv>
        <div>/</div>
      </SlashBvv>
      <FieldEntscheidBvvJahr>
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
      <LabelEntscheidKr>
        KR
      </LabelEntscheidKr>
      <FieldEntscheidKrNr>
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
      <SlashKr>
        <div>/</div>
      </SlashKr>
      <FieldEntscheidKrJahr>
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
      <FieldAktenstandort>
        <ControlLabel>
          Aktenstandort
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.aktenstandort || ''}
          name="aktenstandort"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={12 + tabsToAdd}
        >
          {createOptions(aktenstandortOptions)}
        </FormControl>
      </FieldAktenstandort>
      <FieldAktennummer>
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
  aktenstandortOptions: PropTypes.array,
  geschaeft: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  viewIsNarrow: PropTypes.bool.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaNummern
