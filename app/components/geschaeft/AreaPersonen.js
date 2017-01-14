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
  options.unshift(<option key={0} value={undefined} />)
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

const ContainerBase = styled.div`
  grid-area: areaPersonen;
`
const ContainerView = styled(ContainerBase)`
  background-color: rgb(246, 255, 245);
`
const ContainerPrint = styled(ContainerBase)`
  border: 1px solid #CCC;
  border-bottom: none;
  border-left: none;
`
const AreaPersonenDivBase = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 2px;
  padding: 8px;
`
const AreaPersonenDivView = styled(AreaPersonenDivBase)`
  background-color: rgb(246, 255, 245);
  grid-template-columns: 260px calc((100% - 10px) - 260px);
  align-items: center;
`
const AreaPersonenDivPrint = styled(AreaPersonenDivBase)`
  grid-template-columns: 100%;
  align-items: flex-start;
`
const Title = styled.div`
  font-weight: 900;
  grid-column: 1 / span 2;
`
const SubtitleBase = styled.div`
  font-weight: 900;
`
const SubtitleView = styled(SubtitleBase)`
  font-size: 12px;
  margin-top: 5px;
  grid-column: 1 / span 2;
`
const SubtitlePrint = styled(SubtitleBase)`
  font-size: 10px;
  margin-top: 2px;
  grid-column: 1;
`
const VerantwortlichView = styled.div`
  grid-column: 1 / span 1;
`
const VerantwortlichPrint = styled.div`
  grid-column: 1;
  display: none;
`
const VerantwortlichNameView = styled.div`
  grid-column: 2 / span 1;
  font-size: 12px;
`
const VerantwortlichNamePrint = styled.div`
  grid-column: 1;
  font-size: 10px;
`
const StyledFormcontrolStaticView = styled(FormControl.Static)`
  padding-top: 9px;
  padding-bottom: 7px;
  min-height: 35px;
`
const StyledFormcontrolStaticPrint = styled(FormControl.Static)`
  padding-top: 2px;
  padding-bottom: 2px;
`

const AreaPersonen = ({
  geschaeft,
  nrOfFieldsBeforePersonen = 0,
  change,
  blur,
  interneOptions,
  isPrintPreview,
}) => {
  const Container = isPrintPreview ? ContainerPrint : ContainerView
  const AreaPersonenDiv = isPrintPreview ? AreaPersonenDivPrint : AreaPersonenDivView
  const Subtitle = isPrintPreview ? SubtitlePrint : SubtitleView
  const Verantwortlich = isPrintPreview ? VerantwortlichPrint : VerantwortlichView
  const VerantwortlichName = isPrintPreview ? VerantwortlichNamePrint : VerantwortlichNameView
  const StyledFormcontrolStatic = isPrintPreview ? StyledFormcontrolStaticPrint : StyledFormcontrolStaticView

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
            value={geschaeft.verantwortlich || undefined}
            name="verantwortlich"
            onChange={change}
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
