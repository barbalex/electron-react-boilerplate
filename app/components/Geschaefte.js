import React, { Component, PropTypes } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import _ from 'lodash'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Geschaefte.css'
import GeschaefteItem from '../components/GeschaefteItem'

const StyledNoRowsDiv = styled.div`
  padding: 10px;
  font-weight: bold;
`

const enhance = compose(
  inject('store'),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('geschaefteColumnWidth', size),
  }),
  withRouter,
  observer
)

class Geschaefte extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  state = {
    tableBodyOverflows: true,
  }

  componentDidUpdate() {
    const { router } = this.props
    const path = router.location.pathname

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

  doesTableBodyOverflow = () =>
    this.tableBody.offsetHeight < this.tableBody.scrollHeight

  rowRenderer = ({ key, index, style }) =>
    <div key={key} style={style}>
      <GeschaefteItem
        index={index}
        keyPassed={key}
      />
    </div>

  noRowsRenderer = () => {
    const { filterFields, filterFulltext, geschaefte } = this.props.store.geschaefte
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
    const { activeId, geschaeftePlusFilteredAndSorted: geschaefte } = this.props.store.geschaefte
    const { tableBodyOverflows } = this.state
    // get index of active id
    const indexOfActiveId = _.findIndex(
      geschaefte,
      g => g.idGeschaeft === activeId
    )

    console.log('Geschaefte: location:', this.props.router.location)

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
                  rowCount={geschaefte.length}
                  rowHeight={77}
                  rowRenderer={this.rowRenderer}
                  noRowsRenderer={this.noRowsRenderer}
                  width={width}
                  scrollToIndex={indexOfActiveId}
                  ref={(c) => { this.reactList = c }}
                  {...geschaefte}
                />
              }
            </AutoSizer>
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(Geschaefte)
