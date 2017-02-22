import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'

function mapStateToProps(state) {
  const {
    activeId,
    geschaefteGefilterteIds,
    geschaefte,
    filterFields,
    filterFulltext,
  } = state.geschaefte
  const path = state.routing.locationBeforeTransitions.pathname

  return {
    activeId,
    geschaefteGefilterteIds,
    geschaefte,
    filterFields,
    filterFulltext,
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
