import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import * as AppActions from '../../actions/app'

function mapStateToProps(state) {
  const {
    geschaefte,
    geschaefteGefilterteIds,
    willDelete,
  } = state.geschaefte
  const {
    showMessageModal,
  } = state.app
  const {
    showPagesModal,
  } = state.pages
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    geschaefte,
    geschaefteGefilterteIds,
    willDeleteGeschaeft: willDelete,
    path,
    showMessageModal,
    showPagesModal,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
