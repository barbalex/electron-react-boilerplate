import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableRowDeleteNav from '../../components/navbar/TableRowDeleteNav'
import * as TableActions from '../../actions/table'

function mapStateToProps(state) {
  const { table, id } = state.table
  return {
    table,
    activeTableRowId: id,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRowDeleteNav)
