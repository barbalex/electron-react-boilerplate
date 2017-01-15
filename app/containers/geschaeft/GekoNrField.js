import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GekoNrField from '../../components/geschaeft/GekoNrField'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    idGeschaeft,
    gekoNr,
    tabsToAdd,
  } = props

  return {
    idGeschaeft,
    gekoNr,
    tabsToAdd,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GekoNrField)
