import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaPersonen from '../../components/geschaeft/AreaPersonen'
import * as GeschaefteActions from '../../actions/geschaefte'
import { getGeschaefteWithNSideData } from '../../selectors'

function mapStateToProps(state, props) {
  const {
    activeId,
    interneOptions,
  } = state.geschaefte
  const geschaefte = getGeschaefteWithNSideData(state)
  const {
    blur,
    change,
    nrOfFieldsBeforePersonen,
  } = props
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    activeId,
    interneOptions,
    change,
    blur,
    nrOfFieldsBeforePersonen,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaPersonen)
