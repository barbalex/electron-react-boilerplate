import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import KontakteExternItems from '../../components/geschaeft/KontakteExternItems'
import * as GeschaefteKontakteExternActions from '../../actions/geschaefteKontakteExtern'

function mapStateToProps(state) {
  const {
    geschaefteKontakteExtern,
  } = state.geschaefteKontakteExtern
  const {
    externeOptions,
    activeId,
  } = state.geschaefte
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'

  return {
    geschaefteKontakteExtern,
    externeOptions,
    activeId,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteKontakteExternActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KontakteExternItems)
