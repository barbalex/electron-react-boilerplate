import React, { PropTypes } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import SortSelector from '../../containers/filterFields/SortSelector'
import createOptions from '../../src/createOptions'

const SelectInput = ({
  name,
  change,
  values,
  changeComparator,
  tabIndex,
  autoFocus,
  options,
}) =>
  <InputGroup>
    <SortSelector
      name={name}
    />
    <ComparatorSelector
      name={name}
      changeComparator={changeComparator}
    />
    <FormControl
      componentClass="select"
      value={values[name] || ''}
      name={name}
      onChange={change}
      bsSize="small"
      tabIndex={tabIndex}
      autoFocus={autoFocus}
    >
      {createOptions(options)}
    </FormControl>
  </InputGroup>

SelectInput.displayName = 'SelectInput'

/**
 * do not make options required
 * as they may be loaded after the component
 */
SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
  changeComparator: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  options: PropTypes.array,
}

export default SelectInput
