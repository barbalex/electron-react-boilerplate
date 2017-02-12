import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'

const FilterFieldsLayout = ({
  configSetKey,
  config,
}) =>
  <SplitPane
    split="vertical"
    minSize={100}
    defaultSize={config.geschaefteColumnWidth}
    onChange={size => configSetKey('geschaefteColumnWidth', size)}
  >
    <Geschaefte />
    <FilterFields />
  </SplitPane>

FilterFieldsLayout.propTypes = {
  config: PropTypes.object.isRequired,
  configSetKey: PropTypes.func.isRequired,
}

export default FilterFieldsLayout
