import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaPersonen from '../../components/filterFields/AreaPersonen'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    interneOptions,
    externeOptions,
  } = state.geschaefte
  const {
    values,
    change,
    firstTabIndex,
    changeComparator,
  } = props

  return {
    values,
    interneOptions,
    externeOptions,
    change,
    firstTabIndex,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaPersonen)
