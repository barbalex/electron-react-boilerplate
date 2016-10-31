import React, { PropTypes } from 'react'
import {
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styles from './comparatorSelector.css'

const ComparatorSelector = ({
  name,
  filterFields,
  changeComparator,
}) => {
  const filterField = filterFields.find(ff => ff.field === name)
  const comparatorValue = filterField ? filterField.comparator : ''

  return (
    <InputGroup.Button>
      <FormControl
        componentClass="select"
        className={styles.comparator}
        onChange={e => changeComparator(e.target.value, name)}
        value={comparatorValue}
      >
        <option value="" />
        <option value="=">&#8776;</option>
        <option value="===">=</option>
        <option value="!==">&#60;&#62;</option>
        <option value="&#60;">&#60;</option>
        <option value="&#62;">&#62;</option>
      </FormControl>
    </InputGroup.Button>
  )
}

ComparatorSelector.displayName = 'ComparatorSelector'

ComparatorSelector.propTypes = {
  name: PropTypes.string.isRequired,
  filterFields: PropTypes.array.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default ComparatorSelector
