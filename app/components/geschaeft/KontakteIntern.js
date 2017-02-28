import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import KontakteInternItems from './KontakteInternItems'

const onChangeNewKontaktIntern = (
  e,
  geschaeftKontaktInternNewCreate,
  activeId,
) => {
  const idKontakt = e.target.value
  geschaeftKontaktInternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
}

const optionsList = (
  interneOptions,
  geschaefteKontakteIntern,
  activeId,
) => {
  // filter out options already choosen
  const kontakteInternOfActiveGeschaeft = geschaefteKontakteIntern.filter(g =>
    g.idGeschaeft === activeId
  )
  const idKontakteOfGkiOfActiveGeschaeft = kontakteInternOfActiveGeschaeft.map(kI =>
    kI.idKontakt
  )
  const interneOptionsFiltered = interneOptions.filter(o =>
    !idKontakteOfGkiOfActiveGeschaeft.includes(o.id)
  )
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(
    interneOptionsFiltered,
    o => {
      const name = o.name ? o.name.toLowerCase() : 'zz'
      const vorname = o.vorname ? o.vorname.toLowerCase() : 'zz'
      return `${name} ${vorname} ${o.kurzzeichen}`
    }
  )
  const options = interneOptionsSorted.map(o =>
    <option
      key={o.id}
      value={o.id}
    >
      {`${o.name ? o.name : '(kein Name)'} ${o.vorname ? o.vorname : '(kein Vorname)'} (${o.kurzzeichen})`}
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
const RowfVDropdown = styled(({ isPrintPreview, children, ...rest }) => <div {...rest}>{children}</div>)`
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
  withProps((props) => {
    const {
      store,
      routing,
      tabIndex,
    } = props
    const {
      interneOptions,
      activeId,
    } = store.geschaefte
    const path = routing.locationBeforeTransitions.pathname
    const {
      geschaefteKontakteIntern,
      activeIdGeschaeft,
      activeIdKontakt,
    } = store.geschaefteKontakteIntern
    const isPrintPreview = path === '/geschaeftPdf'
    return {
      geschaefteKontakteIntern,
      activeIdGeschaeft,
      activeIdKontakt,
      interneOptions,
      activeId,
      tabIndex,
      isPrintPreview,
    }
  }),
  observer
)

const GeschaefteKontakteIntern = ({
  tabIndex,
  geschaeftKontaktInternNewCreate,
  activeId,
  interneOptions,
  geschaefteKontakteIntern,
  isPrintPreview,
}) =>
  <Container>
    <KontakteInternItems />
    <RowfVDropdown isPrintPreview={isPrintPreview}>
      <FvDropdown isPrintPreview={isPrintPreview}>
        <FormControl
          componentClass="select"
          bsSize="small"
          onChange={e =>
            onChangeNewKontaktIntern(
              e,
              geschaeftKontaktInternNewCreate,
              activeId,
            )
          }
          title="Neuen Kontakt hinzufügen"
          tabIndex={tabIndex}
        >
          {
            optionsList(
              interneOptions,
              geschaefteKontakteIntern,
              activeId,
            )
          }
        </FormControl>
      </FvDropdown>
    </RowfVDropdown>
  </Container>

GeschaefteKontakteIntern.displayName = 'GeschaefteKontakteIntern'

GeschaefteKontakteIntern.propTypes = {
  interneOptions: PropTypes.array.isRequired,
  geschaefteKontakteIntern: PropTypes.array.isRequired,
  geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default enhance(GeschaefteKontakteIntern)
