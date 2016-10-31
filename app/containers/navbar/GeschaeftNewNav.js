import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaeftNewNav from '../../components/navbar/GeschaeftNewNav'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaeftNewNav)
