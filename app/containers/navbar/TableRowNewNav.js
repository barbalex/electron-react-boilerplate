import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableRowNewNav from '../../components/navbar/TableRowNewNav'
import * as TableActions from '../../actions/table'

function mapStateToProps(state) {
  const {
    table,
  } = state.table
  return {
    table,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRowNewNav)
