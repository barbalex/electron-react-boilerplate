import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaParlVorstoss from '../../components/filterFields/AreaParlVorstoss'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    parlVorstossTypOptions,
  } = state.geschaefte
  const {
    values,
    change,
    firstTabIndex,
    changeComparator,
  } = props

  return {
    values,
    parlVorstossTypOptions,
    change,
    firstTabIndex,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaParlVorstoss)
