import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StammdatenNav from '../../components/navbar/StammdatenNav'
import * as TableActions from '../../actions/table'

function mapStateToProps(state) {
  const {
    table,
    rows,
  } = state.table
  return {
    table,
    rows,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StammdatenNav)
