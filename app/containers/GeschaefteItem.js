import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteItem from '../components/GeschaefteItem'
import * as GeschaefteActions from '../actions/geschaefte'
import { getGeschaefteWithNSideData } from '../selectors'

function mapStateToProps(state, props) {
  const {
    geschaefteGefilterteIds,
    activeId,
  } = state.geschaefte
  const geschaefte = getGeschaefteWithNSideData(state)
  const path = state.routing.locationBeforeTransitions.pathname
  const {
    index,
    keyPassed,
  } = props

  return {
    geschaefte,
    geschaefteGefilterteIds,
    activeId,
    path,
    index,
    keyPassed,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteItem)
