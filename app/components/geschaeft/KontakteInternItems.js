import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import Linkify from 'react-linkify'
import styled from 'styled-components'

const titleText = (idKontakt, interneOptions) => {
  const data = interneOptions.find(o =>
    o.id === idKontakt
  )
  if (!data) return 'Kontakt entfernen'
  return `${data.kurzzeichen} entfernen`
}

const verantwortlichData = (gkI, interneOptions) => {
  const data = interneOptions.find(o =>
    o.id === gkI.idKontakt
  )
  if (!data) return ''
  const name = `${data.name} ${data.vorname}, ${data.kurzzeichen}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  const string = `${name}${abt}${eMail}${telefon}`
  return <Linkify>{string}</Linkify>
}

const GeschaefteKontakteInternItems = ({
  geschaefteKontakteIntern,
  activeId,
  interneOptions,
  geschaeftKontaktInternRemove,
  isPrintPreview,
}) => {
  // filter for this geschaeft
  const gkIFiltered = geschaefteKontakteIntern.filter(g =>
    g.idGeschaeft === activeId
  )
  const gkISorted = _.sortBy(gkIFiltered, (g) => {
    const intOption = interneOptions.find(o =>
      o.id === g.idKontakt
    )
    const sort = `${intOption.name} ${intOption.vorname}, ${intOption.kurzzeichen}`
    return sort.toLowerCase()
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
    grid-template-columns: ${isPrintPreview ? '100%' : 'calc(100% - 20px) 20px'};
    grid-gap: 0;
    padding: 3px;
    margin-right: ${isPrintPreview ? '8px' : 'inherit'};
    align-items: center;
    min-height: ${isPrintPreview ? 0 : '35px'};
    border-bottom: thin solid #CECBCB;
    &:first-of-type  {
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
  const Fv = styled.div`
    grid-column: 1 / span 1;
    &p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `
  const DeleteGlyphiconDiv = styled.div`
    grid-column: 2 / span 1;
    margin-top: 4px;
    display: ${isPrintPreview ? 'none' : 'inherit'};
  `
  const RemoveGlyphicon = styled(Glyphicon)`
    color: red;
    font-size: 18px;
    cursor: pointer;
  `

  return (
    <Container>
      {
        gkISorted.map(gkI =>
          <Row
            key={`${gkI.idGeschaeft}${gkI.idKontakt}`}
          >
            <Fv>
              {verantwortlichData(gkI, interneOptions)}
            </Fv>
            <DeleteGlyphiconDiv>
              <RemoveGlyphicon
                glyph="remove-circle"
                onClick={() => geschaeftKontaktInternRemove(activeId, gkI.idKontakt)}
                title={titleText(gkI.idKontakt, interneOptions)}
              />
            </DeleteGlyphiconDiv>
          </Row>
        )
      }
    </Container>
  )
}

GeschaefteKontakteInternItems.displayName = 'GeschaefteKontakteInternItems'

GeschaefteKontakteInternItems.propTypes = {
  interneOptions: PropTypes.array,
  geschaefteKontakteIntern: PropTypes.array,
  geschaeftKontaktInternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteInternItems
