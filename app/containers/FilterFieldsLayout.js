import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterFieldsLayout from '../components/FilterFieldsLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    config,
  } = state.app

  return {
    config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterFieldsLayout)
