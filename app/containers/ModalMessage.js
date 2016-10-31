import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalMessage from '../components/ModalMessage'
import * as appActions from '../actions/app'

function mapStateToProps(state) {
  const {
    showMessageModal,
    messageTextLine1,
    messageTextLine2,
  } = state.app
  return {
    showMessageModal,
    messageTextLine1,
    messageTextLine2,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
