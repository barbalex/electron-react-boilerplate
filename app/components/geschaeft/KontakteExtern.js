import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import KontakteExternItems from './KontakteExternItems'

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
  const options = externeOptionsSorted.map(o =>
    <option
      key={o.id}
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

const Container = styled.div`
  grid-column: 1 / span 2;
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 0;
`
// eslint-disable-next-line no-unused-vars
const RowFvDropdown = styled(({ isPrintPreview, children, ...rest }) => <div {...rest}>{children}</div>)`
  grid-column: 1 / span 1;
  display: grid;
  grid-template-columns: ${(props) => (props.isPrintPreview ? '160px calc(100% - 160px)' : '260px calc(100% - 260px)')};
  grid-gap: 4px;
  margin-top: 5px;
`
// eslint-disable-next-line no-unused-vars
const FvDropdown = styled(({ isPrintPreview, children, ...rest }) => <div {...rest}>{children}</div>)`
  grid-column: 1 / span 1;
  display: ${(props) => (props.isPrintPreview ? 'none' : 'inherit')};
`

const enhance = compose(
  inject('store'),
  observer
)

const GeschaefteKontakteExtern = ({ store, tabIndex }) => {
  const { geschaeftKontaktExternNewCreate } = store
  const { externeOptions, activeId } = store.geschaefte
  const { geschaefteKontakteExtern } = store.geschaefteKontakteExtern
  const path = store.history.location.pathname
  const isPrintPreview = path === '/geschaeftPdf'

  return (
    <Container>
      <KontakteExternItems />
      <RowFvDropdown isPrintPreview={isPrintPreview}>
        <FvDropdown isPrintPreview={isPrintPreview}>
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
  store: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

export default enhance(GeschaefteKontakteExtern)
