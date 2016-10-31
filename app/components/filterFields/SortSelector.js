import React, { PropTypes } from 'react'
import {
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styles from './sortSelector.css'

const SortSelector = ({
  name,
  sortFields,
  geschaefteSortByFields,
}) => {
  const filterField = sortFields.find(ff => ff.field === name)
  const direction = filterField ? filterField.direction : ''

  return (
    <InputGroup.Button>
      <FormControl
        componentClass="select"
        className={styles.sortSelector}
        onChange={e => geschaefteSortByFields(name, e.target.value)}
        value={direction}
      >
        <option value="" />
        <option value="ASCENDING">&#8679;</option>
        <option value="DESCENDING">&#8681;</option>
      </FormControl>
    </InputGroup.Button>
  )
}

SortSelector.displayName = 'SortSelector'

SortSelector.propTypes = {
  name: PropTypes.string.isRequired,
  sortFields: PropTypes.array.isRequired,
  geschaefteSortByFields: PropTypes.func.isRequired,
}

export default SortSelector
