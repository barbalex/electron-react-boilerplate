import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DateField from '../../components/geschaeft/DateField'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
  } = state.geschaefte
  const {
    name,
    label,
    change,
    blur,
    onChangeDatePicker,
    tabIndex,
  } = props
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  )

  return {
    name,
    label,
    geschaeft,
    change,
    blur,
    onChangeDatePicker,
    tabIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DateField)
