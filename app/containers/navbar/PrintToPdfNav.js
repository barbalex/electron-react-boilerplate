import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PrintToPdfNav from '../../components/navbar/PrintToPdfNav'

function mapStateToProps(state) {
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintToPdfNav)
