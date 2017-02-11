import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import TableRow from '../containers/table/TableRow'
import Table from '../containers/table/Table'

const TableLayout = ({
  configSetKey,
  config,
  id,
}) =>
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

TableLayout.propTypes = {
  config: PropTypes.object.isRequired,
  configSetKey: PropTypes.func.isRequired,
  id: PropTypes.number,
}

TableLayout.defaultProps = {
  id: null,
}

export default TableLayout
