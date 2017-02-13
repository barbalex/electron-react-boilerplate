import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PageTitle from '../../components/page/PageTitle'
import * as PagesActions from '../../actions/pages'

function mapStateToProps(state, props) {
  const { pages } = state
  const { firstPage } = props
  const {
    title,
    queryTitle,
  } = pages

  return {
    firstPage,
    title,
    queryTitle,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PagesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle)
