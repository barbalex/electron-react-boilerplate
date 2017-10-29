import React, { PropTypes } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import styles from './comparatorSelector.css'

const enhance = compose(inject('store'), observer)

const ComparatorSelector = ({ store, name, changeComparator }) => {
  const filterField = store.geschaefte.filterFields.find(ff => ff.field === name)
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
  store: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(ComparatorSelector)
