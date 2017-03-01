import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'

import TableRow from './table/TableRow'
import Table from './table/Table'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const { tableLayout, config } = store.app
    const { id } = store.table
    const { configSetKey } = store
    return {
      configSetKey,
      tableLayout,
      config,
      id,
    }
  }),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('tableColumnWidth', size),
  }),
  observer
)

const TableLayout = ({
  onChange,
  config,
  id,
}) =>
  <SplitPane
    split="vertical"
    minSize={100}
    defaultSize={config.tableColumnWidth}
    onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number,
}

TableLayout.defaultProps = {
  id: null,
}

export default enhance(TableLayout)
