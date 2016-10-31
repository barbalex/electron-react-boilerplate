import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  MenuItem,
  Button,
  SplitButton,
  Navbar,
  Glyphicon,
  FormControl,
} from 'react-bootstrap'
import moment from 'moment'
import filterForFaelligeGeschaefte from '../../src/filterForFaelligeGeschaefte'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'
import filterCriteriaToArrayOfStrings from '../../src/filterCriteriaToArrayOfStrings'
import sortCriteriaToArrayOfStrings from '../../src/sortCriteriaToArrayOfStrings'
import styles from './Navbar.css'

const FilterNav = ({
  sortFields,
  filterFulltext,
  filterFields,
  filterType,
  geschaefte,
  geschaefteGefilterteIds,
  geschaefteFilterByFields,
  geschaefteSortByFields,
  geschaefteResetSort,
  username,
  geschaefteRemoveFilters,
  geschaefteFilterByFulltext,
  path,
  router,
}) => {
  const dataIsFilteredByFulltext = (
    geschaefte.length !== geschaefteGefilterteIds.length &&
    filterFulltext
  )
  const dataIsFilteredByFields = (
    geschaefte.length !== geschaefteGefilterteIds.length &&
    !filterFulltext
  )
  const dataIsFiltered = (
    geschaefte.length !== geschaefteGefilterteIds.length
  )
  const dataIsFilteredByFulltextStyle = [
    styles.filterInput,
    styles.filterInputActive,
  ].join(' ')
  const classNameFilterInput = (
    dataIsFilteredByFulltext ?
    dataIsFilteredByFulltextStyle :
    styles.filterInput
  )
  const activeFiltercriteria = (
    dataIsFilteredByFields ?
    filterCriteriaToArrayOfStrings(filterFields).join(' & ') :
    '(es werden keine Felder gefiltert)'
  )
  const activeSortcriteria = (
    sortFields.length > 0 ?
    sortCriteriaToArrayOfStrings(sortFields).join(' & ') :
    '(die Geschäfte werden nicht sortiert)'
  )
  const title = filterType ? `Filter: ${filterType}` : 'Felder filtern / sortieren'
  return (
    <Navbar.Form
      pullLeft
      className={styles.filterGroupContainer}
    >
      <div className={styles.filterGroup}>
        <FormControl
          type="text"
          placeholder="Volltext filtern"
          value={filterFulltext}
          onChange={e =>
            geschaefteFilterByFulltext(e.target.value)
          }
          className={classNameFilterInput}
          title="Zum Filtern drücken Sie die Enter-Taste"
        />
        <SplitButton
          id="field-filter-dropdown"
          title={title}
          className={styles.fieldFilterDropdown}
          style={{
            backgroundColor: dataIsFilteredByFields ? '#FFBF73' : null
          }}
          onClick={() => {
            if (path !== '/filterFields') {
              router.push('/filterFields')
            }
          }}
        >
          <MenuItem header>
            aktive Filterkriterien:
          </MenuItem>
          <MenuItem>
            <span className={styles.filterCriteria}>
              {activeFiltercriteria}
            </span>
          </MenuItem>
          <MenuItem header>
            aktive Sortierkriterien:
          </MenuItem>
          <MenuItem>
            <span className={styles.filterCriteria}>
              {activeSortcriteria}
            </span>
          </MenuItem>
          <MenuItem header>
            vorbereitete Filter:
          </MenuItem>
          <MenuItem
            onSelect={() => {
              geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige')
              // order by frist desc
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
            }}
            style={{
              backgroundColor: (
                filterType === 'fällige' ?
                '#FFBF73' :
                null
              )
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
                  comparator: '<',
                },
                {
                  field: 'mutationsperson',
                  value: username,
                  comparator: '===',
                }
              ]
              geschaefteFilterByFields(filter, 'eigene fällige')
              // order by frist desc
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
            }}
            style={{
              backgroundColor: (
                filterType === 'eigene fällige' ?
                '#FFBF73' :
                null
              )
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
              backgroundColor: (
                filterType === 'angekündigte Vernehmlassungen' ?
                '#FFBF73' :
                null
              )
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
              backgroundColor: (
                filterType === 'laufende Vernehmlassungen' ?
                '#FFBF73' :
                null
              )
            }}
          >
            laufende Vernehmlassungen
          </MenuItem>
        </SplitButton>
        <Button
          disabled={!dataIsFiltered}
          className={styles.filterRemoveButton}
          onClick={() =>
            geschaefteRemoveFilters()
          }
        >
          <Glyphicon
            glyph="remove"
            title="Filter entfernen"
          />
        </Button>
      </div>
    </Navbar.Form>
  )
}

FilterNav.displayName = 'FilterNav'

FilterNav.propTypes = {
  sortFields: PropTypes.array.isRequired,
  filterFields: PropTypes.array.isRequired,
  filterType: PropTypes.string,
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  geschaefteFilterByFields: PropTypes.func.isRequired,
  geschaefteFilterByFulltext: PropTypes.func.isRequired,
  geschaefteRemoveFilters: PropTypes.func.isRequired,
  geschaefteSortByFields: PropTypes.func.isRequired,
  geschaefteResetSort: PropTypes.func.isRequired,
  filterFulltext: PropTypes.string,
  username: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  path: PropTypes.string.isRequired,
}

export default withRouter(FilterNav)
