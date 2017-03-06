import React, { PropTypes } from 'react'
import {
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './sortSelector.css'

const enhance = compose(
  inject('store'),
  observer
)

const SortSelector = ({
  store,
  name,
}) => {
  const filterField = store.geschaefte.sortFields.find(ff => ff.field === name)
  const direction = filterField ? filterField.direction : ''

  return (
    <InputGroup.Button>
      <FormControl
        componentClass="select"
        className={styles.sortSelector}
        onChange={e => store.geschaefteSortByFields(name, e.target.value)}
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
  store: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default enhance(SortSelector)
