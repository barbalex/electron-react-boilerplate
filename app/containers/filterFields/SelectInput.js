import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SelectInput from '../../components/filterFields/SelectInput'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    name,
    change,
    values,
    changeComparator,
    tabIndex,
    autoFocus = false,
    options,
  } = props

  return {
    name,
    change,
    values,
    tabIndex,
    changeComparator,
    autoFocus,
    options,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput)
