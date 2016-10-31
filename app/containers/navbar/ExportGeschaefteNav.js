import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ExportGeschaefteNav from '../../components/navbar/ExportGeschaefteNav'
import * as AppActions from '../../actions/app'

function mapStateToProps(state) {
  const {
    geschaefte,
    geschaefteGefilterteIds,
  } = state.geschaefte
  return {
    geschaefte,
    geschaefteGefilterteIds,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportGeschaefteNav)
