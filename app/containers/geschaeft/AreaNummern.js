import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaNummern from '../../components/geschaeft/AreaNummern'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    aktenstandortOptions,
    geschaefte,
    activeId,
    geko,
  } = state.geschaefte
  const {
    blur,
    change,
    wrapperClass,
    nrOfGFields,
  } = props
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    aktenstandortOptions,
    geschaeft,
    geko,
    blur,
    change,
    wrapperClass,
    nrOfGFields,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaNummern)
