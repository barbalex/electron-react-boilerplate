import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import Linkify from 'react-linkify'
import _ from 'lodash'
import $ from 'jquery'

import styles from './Table.css'

const enhance = compose(
  inject('store'),
  withHandlers({
    onClickTableRow: props => () => {
      const { store, index } = props
      const { tableRowToggleActivated } = store
      const { table, rows } = store.table
      const row = rows[index]
      tableRowToggleActivated(table, row.id)
    },
  }),
  observer
)

const TableItem = ({
  store,
  index,
  onClickTableRow,
}) => {
  const { rows, id } = store.table
  const row = rows[index]
  const { config } = store.app
  const keys = Object.keys(row)
  const values = _.values(row)
  const windowWidth = $(window).width()
  const tableWidth = (windowWidth * config.tableColumnWidth) / 100
  const normalFieldWidth = (tableWidth - 50) / (keys.length - 1)
  const isActive = !!id && id === row.id
  const trClassName = (
    isActive ?
    [styles.tableBodyRow, styles.active].join(' ') :
    styles.tableBodyRow
  )

  return (
    <div className={trClassName}>
      {
        values.map((val, i) =>
          <div  // eslint-disable-line jsx-a11y/no-static-element-interactions
            key={i}
            style={
              keys[i] === 'id' ?
              { maxWidth: 50 } :
              { maxWidth: normalFieldWidth }
            }
            className={styles.tableBodyCell}
            onClick={onClickTableRow}
          >
            <Linkify>
              {val}
            </Linkify>
          </div>
        )
      }
    </div>
  )
}

TableItem.displayName = 'TableItem'

TableItem.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClickTableRow: PropTypes.func.isRequired,
}

export default enhance(TableItem)
