import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalGeschaeftDelete from '../components/ModalGeschaeftDelete'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state) {
  const {
    activeId,
  } = state.geschaefte
  return {
    activeId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGeschaeftDelete)
