import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaParlVorstoss from '../../components/geschaeft/AreaParlVorstoss'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    parlVorstossTypOptions,
  } = state.geschaefte
  const {
    blur,
    change,
    nrOfFieldsBeforePv,
  } = props
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    parlVorstossTypOptions,
    change,
    blur,
    nrOfFieldsBeforePv,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaParlVorstoss)
