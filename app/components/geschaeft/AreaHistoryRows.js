import React, { PropTypes } from 'react'
import styled from 'styled-components'

import getHistoryOfGeschaeft from '../../src/getHistoryOfGeschaeft'

const AreaHistoryRows = ({
  geschaefte,
  activeId,
  geschaeftToggleActivated,
  path,
}) => {
  const isPrintPreview = path === '/geschaeftPdf'
  const history = getHistoryOfGeschaeft(geschaefte, activeId)
  // sort descending
  history.reverse()
  const FieldsContainer = styled.div`
    grid-area: areaHistoryFieldsContainer;
    display: grid;
    grid-template-columns: 100%;
  `
  const HistoryField = styled.div`
    grid-column: 1;
    display: grid;
    grid-template-columns: ${isPrintPreview ? '35px calc(100% - 35px)' : '60px calc(100% - 60px)'};
    grid-gap: 0;
    border-bottom: thin solid #CECBCB;
    padding-left: ${isPrintPreview ? 0 : '13px'};
    padding-top: ${isPrintPreview ? '2px' : '10px'};
    padding-bottom: ${isPrintPreview ? '2px' : '10px'};
    align-items: center;
    font-size: ${isPrintPreview ? '10px' : 'inherit'};

    &:first-of-type {
      border-top: thin solid #CECBCB;
    }
    &:hover {
      background-color: rgb(227, 232, 255);
    }
  `
  const IdGeschaeft = styled.div`
    grid-column: 1;
  `
  const Gegenstand = styled.div`
    grid-column: 2;
  `

  return (
    <FieldsContainer>
      {
        history.map((id, index) => {
          const geschaeft = geschaefte.find(g =>
            g.idGeschaeft === id
          )
          if (!geschaeft) {
            return null
          }
          return (
            <HistoryField
              key={index}
              style={{
                cursor: id === activeId ? 'default' : 'pointer'
              }}
              onClick={() => {
                if (id !== activeId) {
                  return geschaeftToggleActivated(id)
                }
              }}
            >
              <IdGeschaeft>
                {id}
              </IdGeschaeft>
              <Gegenstand>
                {geschaeft.gegenstand}
              </Gegenstand>
            </HistoryField>
          )
        })
      }
    </FieldsContainer>
  )
}

AreaHistoryRows.displayName = 'AreaHistoryRows'

AreaHistoryRows.propTypes = {
  geschaefte: PropTypes.array.isRequired,
  activeId: PropTypes.number.isRequired,
  geschaeftToggleActivated: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

export default AreaHistoryRows
