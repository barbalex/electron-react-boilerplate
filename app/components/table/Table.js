import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'
import styles from './Table.css'

class Table extends Component {
  static propTypes = {
    table: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    id: PropTypes.number,
    tableRowToggleActivated: PropTypes.func.isRequired,
    tableReset: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  }

  state = {
    tableBodyOverflows: true
  }

  componentDidUpdate = () => {
    const { rows, id } = this.props
    const rL = this.reactList
    if (id) {
      // get visible indexes
      const visibleRange = rL.getVisibleRange()
      // get index of active id
      const index = _.findIndex(rows, r =>
        r.id === id
      )
      // scroll to active id
      // but only if necessary
      const visibleRangeIncludesId = (
        visibleRange[0] <= index &&
        index <= visibleRange[1]
      )
      if (!visibleRangeIncludesId) {
        rL.scrollAround(id)
      }
    }
    /**
     * this only works in a setTimeout!
     * otherwise tableBody scrollHeight equals offsetHeight
     */
    setTimeout(() => this.setTableBodyOverflow(), 0)
  }

  componentWillUnmount = () => {
    const { tableReset } = this.props
    tableReset()
  }

  onClickTableRow(id) {
    const { tableRowToggleActivated, table } = this.props
    tableRowToggleActivated(table, id)
  }

  setTableBodyOverflow() {
    const { tableBodyOverflows } = this.state
    const overflows = this.doesTableBodyOverflow()
    if (overflows !== tableBodyOverflows) {
      this.setState({ tableBodyOverflows: !tableBodyOverflows })
    }
  }

  doesTableBodyOverflow() {
    return this.tableBody.offsetHeight < this.tableBody.scrollHeight
  }

  itemColumns = (row) => {
    const { config } = this.props
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
          {val}
        </div>
      )
    })
  }

  tableHeaders = () => {
    const { rows, config } = this.props
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

  renderItem(index, key) {
    const { rows, id } = this.props
    const row = rows[index]
    const isActive = !!id && id === row.id
    const trClassName = (
      isActive ?
      [styles.tableBodyRow, styles.active].join(' ') :
      styles.tableBodyRow
    )

    return (
      <div
        key={key}
        className={trClassName}
        onClick={() =>
          this.onClickTableRow(row.id)
        }
      >
        {this.itemColumns(row)}
      </div>
    )
  }

  renderItems(items, ref) {
    return (
      <div
        ref={ref}
        className={styles.table}
      >
        {items}
      </div>
    )
  }

  render() {
    const { rows } = this.props
    const { tableBodyOverflows } = this.state

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
            <ReactList
              itemRenderer={::this.renderItem}
              length={rows.length}
              type="uniform"
              ref={(c) => { this.reactList = c }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Table
