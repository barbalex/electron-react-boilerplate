import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaGeschaeft from '../../components/filterFields/AreaGeschaeft'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    statusOptions,
    geschaeftsartOptions,
    abteilungOptions,
  } = state.geschaefte
  const {
    values,
    change,
    firstTabIndex,
    changeComparator,
  } = props

  return {
    statusOptions,
    geschaeftsartOptions,
    abteilungOptions,
    change,
    values,
    firstTabIndex,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaGeschaeft)
