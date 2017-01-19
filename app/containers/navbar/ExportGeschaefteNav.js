import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ExportGeschaefteNav from '../../components/navbar/ExportGeschaefteNav'
import * as AppActions from '../../actions/app'
import { getGeschaefteWithNSideData } from '../../selectors'

function mapStateToProps(state) {
  const {
    geschaefteGefilterteIds,
  } = state.geschaefte
  const geschaefte = getGeschaefteWithNSideData(state)
  return {
    geschaefte,
    geschaefteGefilterteIds,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportGeschaefteNav)
