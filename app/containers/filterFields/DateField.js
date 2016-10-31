import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DateField from '../../components/filterFields/DateField'

function mapStateToProps(state, props) {
  const {
    name,
    label,
    tabIndex,
    values,
    change,
    blur,
    changeComparator,
  } = props

  return {
    name,
    label,
    tabIndex,
    values,
    change,
    blur,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DateField)
