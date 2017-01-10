import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PagesModal from '../components/PagesModal'
import * as appActions from '../actions/app'
import * as pagesActions from '../actions/pages'

const actions = Object.assign(
  appActions,
  pagesActions,
)

function mapStateToProps(state) {
  const {
    showModal,
    modalTextLine1,
    modalTextLine2,
  } = state.pages
  return {
    showModal,
    modalTextLine1,
    modalTextLine2,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesModal)
