import React, { Component, PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'

class FilterFieldsLayout extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    configSetKey: PropTypes.func.isRequired,
  }

  render = () => {
    const {
      configSetKey,
      config,
    } = this.props
    return (
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize={config.geschaefteColumnWidth}
        onChange={size => configSetKey('geschaefteColumnWidth', size)}
      >
        <Geschaefte />
        <FilterFields />
      </SplitPane>
    )
  }
}

export default FilterFieldsLayout
