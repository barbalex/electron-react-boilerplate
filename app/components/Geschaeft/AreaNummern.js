import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, ControlLabel } from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import GekoNrField from './GekoNrField'
import createOptions from '../../src/createOptions'

const StyledTextarea = styled(Textarea)`
  display: block;
  width: 100%;
  padding: 6px 12px;
  line-height: 1.42857143;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
`
const ContainerBase = styled.div`
  grid-area: areaNummern;
  display: grid;
  grid-template-rows: auto;
  padding: 8px;
`
const ContainerView = styled(ContainerBase)`
  background-color: rgba(239, 239, 239, 1);
  /* can't use 1fr for first column - does not work correctly, no idea why
   * hm. Seems to work now?
   */
  /*grid-template-columns: calc(100% - 196px) 8px 120px 8px 60px;*/
  grid-template-columns: 1fr 8px 120px 8px 60px;
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
  /*grid-template-columns: calc(100% - 151px) 8px 105px 8px 30px;*/
  grid-template-columns: 1fr 8px 105px 8px 30px;
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
// eslint-disable-next-line no-unused-vars
const Slash = styled(({ isPdf, children, ...rest }) => <div {...rest}>{children}</div>)`
  margin-top: ${(props) => (props.isPdf ? '-3px' : '2px')};
  font-size: ${(props) => (props.isPdf ? '18px' : '22px')};
  height: ${(props) => (props.isPdf ? '17px' : 'auto')};
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
// eslint-disable-next-line no-unused-vars
const SlashBvv = styled(({ isPdf, children, ...rest }) => <Slash {...rest}>{children}</Slash>)`
  grid-area: slashBvv;
  margin-top: ${(props) => (props.isPdf ? '-7px' : 'inherit')};
  div {
    margin-left: -1px;
  }
`
const SlashRrb = styled(Slash)`
  grid-area: slashRrb;
`
// eslint-disable-next-line no-unused-vars
const LabelHorizontal = styled(({ isPdf, children, ...rest }) => <ControlLabel {...rest}>{children}</ControlLabel>)`
  margin-top: ${(props) => (props.isPdf ? 0 : '11px')};
  text-align: right;
  font-size: ${(props) => (props.isPdf ? '10px !important' : '11px')};
  height: ${(props) => (props.isPdf ? '17px' : 'auto')};
`
const AreaNummernTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaNummernTitle;
`
// eslint-disable-next-line no-unused-vars
const Field = styled(({ isPdf, children, ...rest }) => <div {...rest}>{children}</div>)`
  height: ${(props) => (props.isPdf ? '17px' : 'auto')};
  input {
    font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
  }
`
const TextareaField = styled(({ isPdf, children, ...rest }) => <div {...rest}>{children}</div>)`
  input {
    font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
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
const FieldGekoNr = styled(TextareaField)`
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
// eslint-disable-next-line no-unused-vars
const FieldAktenstandort = styled(({ isPdf, children, ...rest }) => <Field {...rest}>{children}</Field>)`
  height: ${(props) => (props.isPdf ? '29px' : 'auto')};
  grid-area: fieldAktenstandort;
  font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
  select, label {
    font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
  }
  select {
    height: ${(props) => (props.isPdf ? '15px !important' : '34px')};
  }
`
// eslint-disable-next-line no-unused-vars
const FieldAktennummer = styled(({ isPdf, children, ...rest }) => <Field {...rest}>{children}</Field>)`
  height: ${(props) => (props.isPdf ? '29px' : 'auto')};
  grid-area: fieldAktennummer;
  font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
  input, label {
    font-size: ${(props) => (props.isPdf ? '10px' : 'inherit')};
  }
`

const enhance = compose(
  inject('store'),
  observer
)

const AreaNummern = ({
  store,
  viewIsNarrow,
  nrOfGFields,
  change,
  blur,
}) => {
  const {
    aktenstandortOptions,
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const path = store.history.location.pathname
  const isPdf = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  ) || {}
  const tabsToAdd = viewIsNarrow ? 0 : nrOfGFields
  const Container = isPdf ? ContainerPrint : ContainerView
  const gekoValues = (
    geschaeft.geko && geschaeft.geko.filter ?
    geschaeft.geko
      .filter(g => g.idGeschaeft === geschaeft.idGeschaeft)
      .map(g => g.gekoNr)
      .sort() :
    []
  )
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
      <LabelIdGeschaeft isPdf={isPdf}>
        ID
      </LabelIdGeschaeft>
      <FieldIdGeschaeft isPdf={isPdf}>
        <InputIdGeschaeft
          type="number"
          value={geschaeft.idGeschaeft}
          bsSize="small"
          disabled
        />
      </FieldIdGeschaeft>
      {
        !(isPdf && !gekoValuesString) &&
        <LabelGekoNr isPdf={isPdf}>
          Geko
        </LabelGekoNr>
      }
      {
        !(isPdf && !gekoValuesString) &&
        <FieldGekoNr isPdf={isPdf}>
          {
            isPdf &&
            <StyledTextarea
              value={gekoValuesString}
              name="gekoNr"
              tabIndex={1 + tabsToAdd}
            />
          }
          {
            !isPdf &&
            <div>
              {gekoFields}
            </div>
          }
        </FieldGekoNr>
      }
      {
        !(
          isPdf &&
          !geschaeft.entscheidAwelNr &&
          !geschaeft.entscheidBdvNr &&
          !geschaeft.entscheidRrbNr &&
          !geschaeft.entscheidBvvNr &&
          !geschaeft.entscheidKrNr
        ) &&
        <LabelJahre>
          <LabelNrDiv>
            Jahr
          </LabelNrDiv>
        </LabelJahre>
      }
      {
        !(isPdf && !geschaeft.entscheidAwelNr) &&
        <LabelEntscheidAwel isPdf={isPdf}>
          AWEL
        </LabelEntscheidAwel>
      }
      {
        !(isPdf && !geschaeft.entscheidAwelNr) &&
        <FieldEntscheidAwelNr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidAwelNr) &&
        <SlashAwel isPdf={isPdf}>
          <div>/</div>
        </SlashAwel>
      }
      {
        !(isPdf && !geschaeft.entscheidAwelNr) &&
        <FieldEntscheidAwelJahr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidBdvNr) &&
        <LabelEntscheidBdv isPdf={isPdf}>
          BDV
        </LabelEntscheidBdv>
      }
      {
        !(isPdf && !geschaeft.entscheidBdvNr) &&
        <FieldEntscheidBdvNr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidBdvNr) &&
        <SlashBdv isPdf={isPdf}>
          <div>/</div>
        </SlashBdv>
      }
      {
        !(isPdf && !geschaeft.entscheidBdvNr) &&
        <FieldEntscheidBdvJahr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidRrbNr) &&
        <LabelEntscheidRrb isPdf={isPdf}>
          RRB
        </LabelEntscheidRrb>
      }
      {
        !(isPdf && !geschaeft.entscheidRrbNr) &&
        <FieldEntscheidRrbNr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidRrbNr) &&
        <SlashRrb isPdf={isPdf}>
          <div>/</div>
        </SlashRrb>
      }
      {
        !(isPdf && !geschaeft.entscheidRrbNr) &&
        <FieldEntscheidRrbJahr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidBvvNr) &&
        <LabelEntscheidBvv isPdf={isPdf}>
          BVV
        </LabelEntscheidBvv>
      }
      {
        !(isPdf && !geschaeft.entscheidBvvNr) &&
        <FieldEntscheidBvvNr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidBvvNr) &&
        <SlashBvv isPdf={isPdf}>
          <div style={{ marginLeft: '-1px' }}>-</div>
        </SlashBvv>
      }
      {
        !(isPdf && !geschaeft.entscheidBvvNr) &&
        <FieldEntscheidBvvJahr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidKrNr) &&
        <LabelEntscheidKr isPdf={isPdf}>
          KR
        </LabelEntscheidKr>
      }
      {
        !(isPdf && !geschaeft.entscheidKrNr) &&
        <FieldEntscheidKrNr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.entscheidKrNr) &&
        <SlashKr isPdf={isPdf}>
          <div>/</div>
        </SlashKr>
      }
      {
        !(isPdf && !geschaeft.entscheidKrNr) &&
        <FieldEntscheidKrJahr isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.aktenstandort) &&
        <FieldAktenstandort isPdf={isPdf}>
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
      }
      {
        !(isPdf && !geschaeft.aktenstandort) &&
        <FieldAktennummer isPdf={isPdf}>
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
      }
    </Container>
  )
}

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  store: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  viewIsNarrow: PropTypes.bool.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
}

export default enhance(AreaNummern)
