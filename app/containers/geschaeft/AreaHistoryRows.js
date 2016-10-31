import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistoryRows from '../../components/geschaeft/AreaHistoryRows'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state) {
  const {
    geschaefte,
    activeId,
  } = state.geschaefte

  return {
    geschaefte,
    activeId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistoryRows)
