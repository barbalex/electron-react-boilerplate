import React, { Component, PropTypes } from 'react'
import { AutoSizer, List } from 'react-virtualized'
import _ from 'lodash'
import $ from 'jquery'
import Linkify from 'react-linkify'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './Table.css'

const StyledNoRowsDiv = styled.div`
  padding: 10px;
  font-weight: bold;
`

const enhance = compose(
  inject('store'),
  observer
)

class Table extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  state = {
    tableBodyOverflows: true
  }

  componentDidUpdate = () => {
    /**
     * this only works in a setTimeout!
     * otherwise tableBody scrollHeight equals offsetHeight
     */
    setTimeout(() => this.setTableBodyOverflow(), 0)
  }

  componentWillUnmount = () => {
    const { tableReset } = this.props.store
    tableReset()
  }

  onClickTableRow = (id) => {
    const { tableRowToggleActivated } = this.props.store
    const { table } = this.props.store.table
    tableRowToggleActivated(table, id)
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

  itemColumns = (row) => {
    const { config } = this.props.store.app
    const keys = Object.keys(row)
    const values = _.values(row)
    const windowWidth = $(window).width()
    const tableWidth = (windowWidth * config.tableColumnWidth) / 100
    const normalFieldWidth = (tableWidth - 50) / (keys.length - 1)

    return values.map((val, index) => {
      const widthClass = (
        keys[index] === 'id' ?
        { maxWidth: 50 } :
        { maxWidth: normalFieldWidth }
      )

      return (
        <div
          key={index}
          style={widthClass}
          className={styles.tableBodyCell}
        >
          {
            <Linkify>
              {val}
            </Linkify>
          }
        </div>
      )
    })
  }

  tableHeaders = () => {
    const { rows } = this.props.store.table
    const { config } = this.props.store.app
    const headers = Object.keys(rows[0])
    const windowWidth = $(window).width()
    const tableWidth = (windowWidth * config.tableColumnWidth) / 100

    const normalFieldWidth = (tableWidth - 50) / (headers.length - 1)
    return headers.map((header, index) => {
      const widthClass = (
        header === 'id' ?
        { maxWidth: 50 } :
        { maxWidth: normalFieldWidth }
      )
      return (
        <div
          key={index}
          style={widthClass}
          className={styles.tableHeaderCell}
        >
          {header}
        </div>
      )
    })
  }

  rowRenderer = ({ key, index, style }) => {
    const { rows, id } = this.props.store.table
    const row = rows[index]
    const isActive = !!id && id === row.id
    const trClassName = (
      isActive ?
      [styles.tableBodyRow, styles.active].join(' ') :
      styles.tableBodyRow
    )

    return (
      <div  // eslint-disable-line jsx-a11y/no-static-element-interactions
        key={key}
        className={trClassName}
        onClick={() =>
          this.onClickTableRow(row.id)
        }
        style={style}
      >
        {this.itemColumns(row)}
      </div>
    )
  }

  noRowsRenderer = () => {
    const text = 'lade Daten...'
    return (
      <StyledNoRowsDiv>
        {text}
      </StyledNoRowsDiv>
    )
  }

  render() {
    const { rows, id } = this.props.store.table
    const { tableBodyOverflows } = this.state// get index of active id
    const indexOfActiveId = _.findIndex(rows, r =>
      r.id === id
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
              {this.tableHeaders()}
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
                  rowCount={rows.length}
                  rowHeight={38}
                  rowRenderer={this.rowRenderer}
                  noRowsRenderer={this.noRowsRenderer}
                  width={width}
                  scrollToIndex={indexOfActiveId}
                  ref={(c) => { this.reactList = c }}
                  {...rows}
                />
              }
            </AutoSizer>
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(Table)
