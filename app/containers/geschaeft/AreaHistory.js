import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistory from '../../components/geschaeft/AreaHistory'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
  } = state.geschaefte
  const {
    blur,
    change,
  } = props
  const path = state.routing.locationBeforeTransitions.pathname
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    change,
    blur,
    path,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistory)
