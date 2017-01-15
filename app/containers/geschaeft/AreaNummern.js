import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaNummern from '../../components/geschaeft/AreaNummern'
import * as GeschaefteActions from '../../actions/geschaefte'
import { getGeschaefteWithNSideData } from '../../selectors'

function mapStateToProps(state, props) {
  const {
    aktenstandortOptions,
    activeId,
  } = state.geschaefte
  const {
    blur,
    change,
    wrapperClass,
    nrOfGFields,
  } = props
  const geschaefte = getGeschaefteWithNSideData(state)
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    aktenstandortOptions,
    geschaeft,
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
