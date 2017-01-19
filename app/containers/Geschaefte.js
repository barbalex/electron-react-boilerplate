import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'

function mapStateToProps(state) {
  const {
    activeId,
    geschaefteGefilterteIds,
  } = state.geschaefte
  const path = state.routing.locationBeforeTransitions.pathname

  return {
    activeId,
    geschaefteGefilterteIds,
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
