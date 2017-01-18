import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaFristen from '../../components/geschaeft/AreaFristen'
import * as GeschaefteActions from '../../actions/geschaefte'
import { getGeschaefteWithNSideData } from '../../selectors'

function mapStateToProps(state, props) {
  const {
    activeId,
  } = state.geschaefte
  const geschaefte = getGeschaefteWithNSideData(state)
  const {
    blur,
    change,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker,
  } = props
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    change,
    blur,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaFristen)
