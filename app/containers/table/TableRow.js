import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableRow from '../../components/table/TableRow'
import * as TableActions from '../../actions/table'
import * as AppActions from '../../actions/app'

const actions = Object.assign(TableActions, AppActions)

function mapStateToProps(state) {
  const {
    table,
    rows,
    id,
  } = state.table

  return {
    table,
    rows,
    id,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow)
