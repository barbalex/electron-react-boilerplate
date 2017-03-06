import React, { Component, PropTypes } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import _ from 'lodash'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Geschaefte.css'
import RowRenderer from './RowRenderer'
import NoRowsRenderer from './NoRowsRenderer'

const enhance = compose(
  inject('store'),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('geschaefteColumnWidth', size),
  }),
  observer
)

/**
 * need to keep this as es6 class
 * at least: after refactoring to a functional component
 * the row renderer rendered no rows any more :-(
 */
class Geschaefte extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
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
                    noRowsRenderer={() => <NoRowsRenderer />}
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
