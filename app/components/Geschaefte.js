import React, { Component, PropTypes } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import _ from 'lodash'
import styled from 'styled-components'

import styles from './Geschaefte.css'
import GeschaefteItem from '../containers/GeschaefteItem'

const StyledNoRowsDiv = styled.div`
  padding: 10px;
  font-weight: bold;
`

class Geschaefte extends Component {
  static propTypes = {
    activeId: PropTypes.number,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    geschaefte: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    filterFields: PropTypes.array,
    filterFulltext: PropTypes.string,
  }

  static defaultProps = {
    activeId: null,
    filterFields: [],
    filterFulltext: '',
  }

  state = {
    tableBodyOverflows: true,
  }

  componentDidUpdate() {
    const { path } = this.props

    if (
      path === '/geschaefte' ||
      path === '/'
    ) {
      /**
       * this only works in a setTimeout!
       * otherwise tableBody scrollHeight equals offsetHeight
       */
      setTimeout(() => this.setTableBodyOverflow(), 0)
    }
  }

  setTableBodyOverflow = () => {
    const { tableBodyOverflows } = this.state
    const overflows = this.doesTableBodyOverflow()
    if (overflows !== tableBodyOverflows) {
      this.setState({ tableBodyOverflows: !tableBodyOverflows })
    }
  }

  doesTableBodyOverflow = () => {
    if (this.tableBody && this.reactList) {
      return this.tableBody.offsetHeight === this.reactList.props.height
    }
    return false
  }

  rowRenderer = ({ key, index, style }) =>
    <div key={key} style={style}>
      <GeschaefteItem
        index={index}
        keyPassed={key}
      />
    </div>

  noRowsRenderer = () => {
    const { filterFields, filterFulltext, geschaefte } = this.props
    const isFiltered = (
      geschaefte.length > 0 &&
      (filterFields.length > 0 || !!filterFulltext)
    )
    const text = (
      isFiltered ?
      'Keine Daten entsprechen dem Filter' :
      'lade Daten...'
    )
    return (
      <StyledNoRowsDiv>
        {text}
      </StyledNoRowsDiv>
    )
  }

  render() {
    const { geschaefteGefilterteIds, activeId } = this.props
    const { tableBodyOverflows } = this.state
    const rowCount = geschaefteGefilterteIds ? geschaefteGefilterteIds.length : 0
    // get index of active id
    const indexOfActiveId = _.findIndex(
      geschaefteGefilterteIds,
      g => g === activeId
    )

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div
              className={styles.tableHeaderRow}
              style={{
                paddingRight: tableBodyOverflows ? 17 : null
              }}
            >
              <div
                className={[
                  styles.columnIdGeschaeft,
                  styles.tableHeaderCell,
                ].join(' ')}
              >
                ID
              </div>
              <div
                className={[
                  styles.columnGegenstand,
                  styles.tableHeaderCell,
                ].join(' ')}
              >
                Gegenstand
              </div>
              <div
                className={[
                  styles.columnStatus,
                  styles.tableHeaderCell,
                ].join(' ')}
              >
                Status
              </div>
              <div
                className={[
                  styles.columnKontaktIntern,
                  styles.tableHeaderCell,
                ].join(' ')}
              >
                Verantwortlich
              </div>
            </div>
          </div>
          <div
            className={styles.tableBody}
            ref={(c) => { this.tableBody = c }}
          >
            <AutoSizer>
              {({ height, width }) =>
                <List
                  height={height}
                  rowCount={rowCount}
                  rowHeight={77}
                  rowRenderer={this.rowRenderer}
                  noRowsRenderer={this.noRowsRenderer}
                  width={width}
                  scrollToIndex={indexOfActiveId}
                  ref={(c) => { this.reactList = c }}
                  {...geschaefteGefilterteIds}
                />
              }
            </AutoSizer>
          </div>
        </div>
      </div>
    )
  }
}

export default Geschaefte
