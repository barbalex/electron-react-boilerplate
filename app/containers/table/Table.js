import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from '../../components/table/Table'
import * as TableActions from '../../actions/table'

function mapStateToProps(state) {
  const {
    table,
    rows,
    id,
  } = state.table
  const {
    config,
  } = state.app

  return {
    table,
    rows,
    id,
    config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
