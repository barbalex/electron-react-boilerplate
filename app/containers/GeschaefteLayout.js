import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteLayout from '../components/GeschaefteLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    config,
  } = state.app
  const {
    activeId,
  } = state.geschaefte

  return {
    config,
    activeId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayout)
