import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../../components/page/Page'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as PagesActions from '../../actions/pages'
import * as AppActions from '../../actions/app'

const actions = Object.assign(
  AppActions,
  GeschaefteActions,
  PagesActions,
)

function mapStateToProps(state, props) {
  const {
    pages,
  } = state
  const {
    pageIndex,
  } = props
  const {
    remainingGeschaefte,
    activePageIndex,
    title,
    queryTitle,
    building,
    reportType,
  } = pages
  const {
    geschaefteGefilterteIds,
    filterFields,
    sortFields,
  } = state.geschaefte
  const myGeschaefte = pages.pages[pageIndex].geschaefte

  return {
    pages: pages.pages,
    building,
    geschaefte: myGeschaefte,
    filterFields,
    sortFields,
    remainingGeschaefte,
    activePageIndex,
    pageIndex,
    title,
    queryTitle,
    reportType,
    geschaefteGefilterteIds,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
