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
  const path = state.routing.locationBeforeTransitions.pathname

  return {
    config,
    activeId,
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayout)
