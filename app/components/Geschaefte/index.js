import React, { Component, PropTypes } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import _ from 'lodash'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Geschaefte.css'
import RowRenderer from './RowRenderer'

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
  observer
)

class Geschaefte extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

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
    const { store } = this.props
    const { setGeschaefteListOverflowing } = store
    const { geschaefteListOverflowing } = store.ui
    const { activeId, geschaeftePlusFilteredAndSorted: geschaefte } = store.geschaefte
    // get index of active id
    const indexOfActiveId = _.findIndex(
      geschaefte,
      g => g.idGeschaeft === activeId
    )

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div
              className={styles.tableHeaderRow}
              style={{
                paddingRight: geschaefteListOverflowing ? 17 : 5,
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
              {({ height, width }) => {
                const overflowing = height < geschaefte.length * 77
                // need to setTimeout because changing state in render
                // is a no go
                setTimeout(() => setGeschaefteListOverflowing(overflowing))
                return (
                  <List
                    height={height}
                    rowCount={geschaefte.length}
                    rowHeight={77}
                    rowRenderer={RowRenderer}
                    noRowsRenderer={this.noRowsRenderer}
                    width={width}
                    scrollToIndex={indexOfActiveId}
                    ref={(c) => { this.reactList = c }}
                    {...geschaefte}
                  />
                )
              }}
            </AutoSizer>
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(Geschaefte)
