import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaLinks from '../../components/geschaeft/AreaLinks'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state) {
  const {
    links,
    activeId,
  } = state.geschaefte
  const path = state.routing.locationBeforeTransitions.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const linksDesGeschaefts = links.filter(l =>
    l.idGeschaeft === activeId
  )

  return {
    links: linksDesGeschaefts,
    activeId,
    isPrintPreview,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaLinks)
