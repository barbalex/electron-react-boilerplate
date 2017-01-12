import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import Linkify from 'react-linkify'
import styled from 'styled-components'

const verantwortlichData = (gKE, externeOptions) => {
  function addValueToInfo(info, value) {
    if (!value) return info
    if (info) return `${info}, ${value}`
    return value
  }
  const data = externeOptions.find(o =>
    o.id === gKE.idKontakt
  )
  if (!data) return ''
  let info = ''
  const name = `${data.name || '(kein Name)'} ${data.vorname || '(kein Vorname)'}`
  info = addValueToInfo(info, name)
  info = addValueToInfo(info, data.firma)
  info = addValueToInfo(info, data.eMail)
  info = addValueToInfo(info, data.telefon)
  return <Linkify>{info}</Linkify>
}

const titleText = (idKontakt, externeOptions) => {
  const data = externeOptions.find(o =>
    o.id === idKontakt
  )
  if (!data) return 'Kontakt entfernen'
  return `${data.name} ${data.vorname} entfernen`
}

const GeschaefteKontakteExtern = ({
  geschaefteKontakteExtern,
  activeId,
  externeOptions,
  geschaeftKontaktExternRemove,
  isPrintPreview,
}) => {
  // filter for this geschaeft
  const gkIFiltered = geschaefteKontakteExtern.filter(g =>
    g.idGeschaeft === activeId
  )
  const gKISorted = _.sortBy(gkIFiltered, (g) => {
    const intOption = externeOptions.find(o =>
      o.id === g.idKontakt
    )
    return `${intOption.name} ${intOption.vorname}`.toLowerCase()
  })
  const Container = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0;
  `
  const Row = styled.div`
    grid-column: 1 / span 1;
    display: grid;
    grid-template-columns: ${isPrintPreview ? 'calc(100% - 10px)' : 'calc(100% - 20px) 20px'};
    grid-gap: 0;
    padding: 3px;
    margin-right: ${isPrintPreview ? '8px' : 'inherit'};
    align-items: center;
    min-height: ${isPrintPreview ? 0 : '35px'};
    border-bottom: thin solid #CECBCB;
    &:first-of-type {
      border-top: thin solid #CECBCB;
    }
    &:hover {
      background-color: rgba(208, 255, 202, 0.5);
    }
  `
  /**
   * prevent pushing of following kontakt
   * when text breaks to next line
   */
  const Field = styled.div`
    grid-column: 1 / span 1;
    &p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: ${isPrintPreview ? 0 : '7px'};
    }
  `
  const GlyphiconDiv = styled.div`
    grid-column: 2 / span 1;
    margin-top: 4px;
    display: ${isPrintPreview ? 'none' : 'inherit'};
  `
  const StyledGlyphicon = styled(Glyphicon)`
    color: red;
    font-size: 18px;
    cursor: pointer;
  `

  return (
    <Container>
      {
        gKISorted.map(gKE =>
          <Row key={`${gKE.idGeschaeft}${gKE.idKontakt}`}>
            <Field>
              {verantwortlichData(gKE, externeOptions)}
            </Field>
            <GlyphiconDiv>
              <StyledGlyphicon
                glyph="remove-circle"
                onClick={() =>
                  geschaeftKontaktExternRemove(activeId, gKE.idKontakt)
                }
                title={titleText(gKE.idKontakt, externeOptions)}
              />
            </GlyphiconDiv>
          </Row>
        )
      }
    </Container>
  )
}

GeschaefteKontakteExtern.displayName = 'GeschaefteKontakteExtern'

GeschaefteKontakteExtern.propTypes = {
  externeOptions: PropTypes.array,
  geschaefteKontakteExtern: PropTypes.array,
  geschaeftKontaktExternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteExtern
