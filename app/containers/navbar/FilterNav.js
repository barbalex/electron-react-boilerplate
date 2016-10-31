import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterNav from '../../components/navbar/FilterNav'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state) {
  const {
    filterFields,
    filterType,
    filterFulltext,
    sortFields,
    geschaefte,
    geschaefteGefilterteIds,
  } = state.geschaefte
  const {
    username,
  } = state.user
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    username,
    filterFields,
    filterType,
    filterFulltext,
    sortFields,
    geschaefte,
    geschaefteGefilterteIds,
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterNav)
