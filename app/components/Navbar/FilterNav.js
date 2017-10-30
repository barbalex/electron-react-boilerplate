import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Button, SplitButton, Navbar, Glyphicon, FormControl } from 'react-bootstrap'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import filterForFaelligeGeschaefte from '../../src/filterForFaelligeGeschaefte'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'
import filterCriteriaToArrayOfStrings from '../../src/filterCriteriaToArrayOfStrings'
import sortCriteriaToArrayOfStrings from '../../src/sortCriteriaToArrayOfStrings'

const Container = styled(Navbar.Form)`padding-right: 10px;`
const SubContainer = styled.div`display: flex;`
const StyledVolltextControl = styled(FormControl)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 186px !important;
  background-color: ${props => (props['data-dataIsFilteredByFulltext'] ? '#FFBF73' : 'white')};
`
const StyledFilterDropdown = styled(SplitButton)`
  border-radius: 0;
  min-width: 160px;
  font-weight: 700;
  background-color: ${props => (props['data-dataIsFilteredByFields'] ? '#FFBF73' : 'white')};
`
const StyledCriteria = styled.span`
  cursor: default !important;
  font-style: italic;
`
const FilterRemoveButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const enhance = compose(inject('store'), observer)

const FilterNav = ({ store }) => {
  const {
    geschaefteRemoveFilters,
    geschaefteFilterByFulltext,
    geschaefteFilterByFields,
    geschaefteSortByFields,
    geschaefteResetSort,
  } = store
  const {
    geschaefte: geschaefteUnfiltered,
    filterFields,
    filterType,
    filterFulltext,
    sortFields,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const { username } = store.user
  const path = store.history.location.pathname
  const dataIsFilteredByFulltext = geschaefte.length !== geschaefteUnfiltered.length && filterFulltext
  const dataIsFilteredByFields = geschaefte.length !== geschaefteUnfiltered.length && !filterFulltext
  const dataIsFiltered = geschaefte.length !== geschaefteUnfiltered.length
  const activeFiltercriteria = dataIsFilteredByFields
    ? filterCriteriaToArrayOfStrings(filterFields).join(' & ')
    : '(es werden keine Felder gefiltert)'
  const activeSortcriteria =
    sortFields.length > 0 ? sortCriteriaToArrayOfStrings(sortFields).join(' & ') : '(die Geschäfte werden nicht sortiert)'
  const title = filterType ? `Filter: ${filterType}` : 'Felder filtern / sortieren'
  return (
    <Container pullLeft>
      <SubContainer>
        <StyledVolltextControl
          type="text"
          placeholder="Volltext filtern"
          value={filterFulltext}
          onChange={e => geschaefteFilterByFulltext(e.target.value)}
          data-dataIsFilteredByFulltext={dataIsFilteredByFulltext}
          title="Zum Filtern drücken Sie die Enter-Taste"
        />
        <StyledFilterDropdown
          id="field-filter-dropdown"
          title={title}
          data-dataIsFilteredByFields={dataIsFilteredByFields}
          onClick={() => {
            if (path !== '/filterFields') {
              store.history.push('/filterFields')
              store.geschaefteRemoveFilters()
            }
          }}
        >
          <MenuItem header>aktive Filterkriterien:</MenuItem>
          <MenuItem>
            <StyledCriteria>{activeFiltercriteria}</StyledCriteria>
          </MenuItem>
          <MenuItem header>aktive Sortierkriterien:</MenuItem>
          <MenuItem>
            <StyledCriteria>{activeSortcriteria}</StyledCriteria>
          </MenuItem>
          <MenuItem header>vorbereitete Filter:</MenuItem>
          <MenuItem
            onSelect={() => {
              geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige')
              // order by frist desc
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
            }}
            style={{
              backgroundColor: filterType === 'fällige' ? '#FFBF73' : null,
            }}
          >
            fällige Geschäfte
          </MenuItem>
          <MenuItem
            onSelect={() => {
              const now = moment().format('YYYY-MM-DD')
              const filter = [
                {
                  field: 'fristMitarbeiter',
                  value: now,
                  comparator: '<=',
                },
                {
                  field: 'kannFaelligSein',
                  value: true,
                  comparator: '===',
                },
                {
                  field: 'verantwortlichItKonto',
                  value: username,
                  comparator: '===',
                },
              ]
              geschaefteFilterByFields(filter, 'eigene fällige')
              // order by frist desc
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
            }}
            style={{
              backgroundColor: filterType === 'eigene fällige' ? '#FFBF73' : null,
            }}
          >
            eigene fällige Geschäfte
          </MenuItem>
          <MenuItem
            onSelect={() => {
              geschaefteFilterByFields(filterForVernehmlAngek(), 'angekündigte Vernehmlassungen')
              geschaefteResetSort()
              geschaefteSortByFields('idGeschaeft', 'DESCENDING')
            }}
            style={{
              backgroundColor: filterType === 'angekündigte Vernehmlassungen' ? '#FFBF73' : null,
            }}
          >
            angekündigte Vernehmlassungen
          </MenuItem>
          <MenuItem
            onSelect={() => {
              geschaefteFilterByFields(filterForVernehmlLaeuft(), 'laufende Vernehmlassungen')
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
              geschaefteSortByFields('idGeschaeft', 'DESCENDING')
            }}
            style={{
              backgroundColor: filterType === 'laufende Vernehmlassungen' ? '#FFBF73' : null,
            }}
          >
            laufende Vernehmlassungen
          </MenuItem>
        </StyledFilterDropdown>
        <FilterRemoveButton disabled={!dataIsFiltered} onClick={() => geschaefteRemoveFilters()}>
          <Glyphicon glyph="remove" title="Filter entfernen" />
        </FilterRemoveButton>
      </SubContainer>
    </Container>
  )
}

FilterNav.displayName = 'FilterNav'

FilterNav.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(FilterNav)
