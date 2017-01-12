import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styled from 'styled-components'

import KontakteExternItems from '../../containers/geschaeft/KontakteExternItems'

const onChangeNewKontaktExtern = (e, geschaeftKontaktExternNewCreate, activeId) => {
  const idKontakt = e.target.value
  geschaeftKontaktExternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
}

const optionsList = (
  externeOptions,
  geschaefteKontakteExtern,
  activeId,
) => {
  // filter out options already choosen
  const kontakteInternOfActiveGeschaeft = geschaefteKontakteExtern.filter(g =>
    g.idGeschaeft === activeId
  )
  const idKontakteOfGkiOfActiveGeschaeft = kontakteInternOfActiveGeschaeft.map(kI =>
    kI.idKontakt
  )
  const externeOptionsFiltered = externeOptions.filter(o =>
    !idKontakteOfGkiOfActiveGeschaeft.includes(o.id)
  )
  // sort externeOptions by nameVorname
  const externeOptionsSorted = _.sortBy(externeOptionsFiltered, o =>
    o.nameVorname.toLowerCase()
  )
  const options = externeOptionsSorted.map((o, index) =>
    <option
      key={index + 1}
      value={o.id}
    >
      {o.nameVorname}
    </option>
  )
  options.unshift(
    <option
      key={0}
      value=""
    />
  )
  return options
}

const GeschaefteKontakteExtern = ({
  geschaefteKontakteExtern,
  tabIndex,
  geschaeftKontaktExternNewCreate,
  activeId,
  externeOptions,
  isPrintPreview,
}) => {
  const Container = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0;
  `
  const RowFvDropdown = styled.div`
    grid-column: 1 / span 1;
    display: grid;
    grid-template-columns: ${isPrintPreview ? '160px calc((100% - 10px) - 160px)' : '260px calc((100% - 10px) - 260px)'};
    grid-gap: 4px;
    margin-top: 5px;
  `
  const FvDropdown = styled.div`
    grid-column: 1 / span 1;
    display: ${isPrintPreview ? 'none' : 'inherit'}
  `

  return (
    <Container>
      <KontakteExternItems />
      <RowFvDropdown>
        <FvDropdown>
          <FormControl
            componentClass="select"
            bsSize="small"
            onChange={e =>
              onChangeNewKontaktExtern(
                e,
                geschaeftKontaktExternNewCreate,
                activeId,
              )
            }
            title="Neuen Kontakt hinzufügen"
            tabIndex={tabIndex}
          >
            {
              optionsList(
                externeOptions,
                geschaefteKontakteExtern,
                activeId,
              )
            }
          </FormControl>
        </FvDropdown>
      </RowFvDropdown>
    </Container>
  )
}

GeschaefteKontakteExtern.displayName = 'GeschaefteKontakteExtern'

GeschaefteKontakteExtern.propTypes = {
  externeOptions: PropTypes.array,
  geschaefteKontakteExtern: PropTypes.array,
  geschaeftKontaktExternNewCreate: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default GeschaefteKontakteExtern
