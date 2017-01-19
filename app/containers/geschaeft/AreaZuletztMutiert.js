import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AreaZuletztMutiert from '../../components/geschaeft/AreaZuletztMutiert'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state) {
  const {
    geschaefte,
    activeId,
    interneOptions,
  } = state.geschaefte
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'

  return {
    geschaeft,
    interneOptions,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaZuletztMutiert)
