import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styled from 'styled-components'

import KontakteIntern from '../../containers/geschaeft/KontakteIntern'
import KontakteExtern from '../../containers/geschaeft/KontakteExtern'

const verwantwortlichOptions = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, o => {
    const sort = `${o.name || 'zz'} ${o.vorname || 'zz'} (${o.kurzzeichen})`
    return sort.toLowerCase()
  })
  const options = interneOptionsSorted.map((o) => {
    const name = `${o.name || '(kein Name)'} ${o.vorname || '(kein Vorname)'} (${o.kurzzeichen})`
    return (
      <option
        key={o.id}
        value={o.kurzzeichen}
      >
        {name}
      </option>
    )
  })
  options.unshift(<option key={0} value="" />)
  return options
}

const verantwortlichData = (geschaeft, interneOptions, isPrintPreview) => {
  const data = interneOptions.find(o =>
    o.kurzzeichen === geschaeft.verantwortlich
  )
  if (!data) return ''
  let name = ''
  if (isPrintPreview) {
    name = `${data.name || '(kein Name)'} ${data.vorname || '(kein Vorname)'}, `
  }
  const abt = data.abteilung ? `${data.abteilung}` : ''
  const emailHtml = (
    <a
      href={`mailto:${data.eMail}`}
    >
      {data.eMail}
    </a>
  )
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  if (data.eMail) {
    return (
      <span>{`${name}${abt}, `}{emailHtml}{`${telefon}`}</span>
    )
  }
  return <span>{`${name}${abt}${telefon}`}</span>
}

const AreaPersonen = ({
  geschaeft,
  nrOfFieldsBeforePersonen = 0,
  change,
  blur,
  interneOptions,
  isPrintPreview,
}) => {
  const Container = styled.div`
    grid-area: areaPersonen;
    background-color: ${isPrintPreview ? 'inherit' : 'rgb(246, 255, 245)'};
    border: ${isPrintPreview ? '1px solid #CCC' : 'inherit'};
    border-bottom: ${isPrintPreview ? 'none' : 'inherit'};
    border-left: ${isPrintPreview ? 'none' : 'inherit'};
  `
  const AreaPersonenDiv = styled.div`
    background-color: ${isPrintPreview ? 'inherit' : 'rgb(246, 255, 245)'};
    display: grid;
    grid-template-columns: ${isPrintPreview ? '100%' : '260px calc((100% - 10px) - 260px)'};
    grid-column-gap: 10px;
    grid-row-gap: 2px;
    padding: 8px;
    align-items: ${isPrintPreview ? 'flex-start' : 'center'};
  `
  const Title = styled.div`
    font-weight: 900;
    font-size: ${isPrintPreview ? '16px' : '16px'};
    grid-column: 1 / span 2;
  `
  const Subtitle = styled.div`
    font-weight: 900;
    font-size: ${isPrintPreview ? '10px' : '12px'};
    margin-top: ${isPrintPreview ? '2px' : '5px'};
    grid-column: ${isPrintPreview ? '1' : '1 / span 2'};
  `
  const Verantwortlich = styled.div`
    grid-column: ${isPrintPreview ? '1' : '1 / span 1'};
    display: ${isPrintPreview ? 'none' : 'inherit'};
  `
  const VerantwortlichName = styled.div`
    grid-column: ${isPrintPreview ? '1' : '2 / span 1'};
    font-size: ${isPrintPreview ? '10px' : '12px'};
  `
  const StyledFormcontrolStatic = styled(FormControl.Static)`
    padding-top: ${isPrintPreview ? '2px' : '9px'};
    padding-bottom: ${isPrintPreview ? '2px' : '7px'};
    min-height: ${isPrintPreview ? 0 : '35px'};
  `

  return (
    <Container>
      <AreaPersonenDiv>
        <Title>
          Personen
        </Title>
        <Subtitle>
          Verantwortlich
        </Subtitle>
        <Verantwortlich>
          <FormControl
            componentClass="select"
            value={geschaeft.verantwortlich || ''}
            name="verantwortlich"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePersonen}
          >
            {verwantwortlichOptions(interneOptions)}
          </FormControl>
        </Verantwortlich>
        <VerantwortlichName>
          <StyledFormcontrolStatic>
            {verantwortlichData(geschaeft, interneOptions, isPrintPreview)}
          </StyledFormcontrolStatic>
        </VerantwortlichName>
        <Subtitle>
          Interne Kontakte
        </Subtitle>
        <KontakteIntern
          tabIndex={nrOfFieldsBeforePersonen + 1}
        />
        <Subtitle>
          Externe Kontakte
        </Subtitle>
        <KontakteExtern
          tabIndex={nrOfFieldsBeforePersonen + 2}
        />
      </AreaPersonenDiv>
    </Container>
  )
}

AreaPersonen.displayName = 'AreaPersonen'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaPersonen.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  interneOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaPersonen
