import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SortSelector from '../../components/filterFields/SortSelector'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    name,
  } = props
  const {
    sortFields,
  } = state.geschaefte

  return {
    name,
    sortFields,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelector)
