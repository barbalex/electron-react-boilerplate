import React, { Component, PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import TableRow from '../containers/table/TableRow'
import Table from '../containers/table/Table'

class TableLayout extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    configSetKey: PropTypes.func.isRequired,
    id: PropTypes.number,
  }

  static defaultProps = {
    id: null,
  }

  render = () => {
    const {
      configSetKey,
      config,
      id,
    } = this.props
    return (
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize={config.tableColumnWidth}
        onChange={size => configSetKey('tableColumnWidth', size)}
      >
        <Table />
        <div>
          {
            id
            && <TableRow />
          }
        </div>
      </SplitPane>
    )
  }
}

export default TableLayout
