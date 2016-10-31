import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaFristen from '../../components/filterFields/AreaFristen'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    values,
    change,
    changeComparator,
    firstTabIndex,
  } = props

  return {
    values,
    change,
    changeComparator,
    firstTabIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaFristen)
