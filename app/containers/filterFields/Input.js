import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from '../../components/filterFields/Input'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    type = 'text',
    name,
    change,
    values,
    changeComparator,
    tabIndex,
    autoFocus = false,
  } = props

  return {
    type,
    name,
    change,
    values,
    tabIndex,
    changeComparator,
    autoFocus,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
