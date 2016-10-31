import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaRechtsmittel from '../../components/filterFields/AreaRechtsmittel'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions,
  } = state.geschaefte
  const {
    values,
    change,
    firstTabIndex,
    changeComparator,
  } = props

  return {
    values,
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions,
    change,
    firstTabIndex,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaRechtsmittel)
