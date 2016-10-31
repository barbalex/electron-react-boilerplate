import React, { Component, PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import Geschaeft from '../containers/geschaeft/Geschaeft'
import Geschaefte from '../containers/Geschaefte'

class GeschaefteLayout extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    configSetKey: PropTypes.func.isRequired,
    activeId: PropTypes.number,
  }

  render = () => {
    const {
      configSetKey,
      config,
      activeId,
    } = this.props
    return (
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize={config.geschaefteColumnWidth}
        onChange={size => configSetKey('geschaefteColumnWidth', size)}
      >
        <Geschaefte />
        <div>
          {
            activeId
            && <Geschaeft />
          }
        </div>
      </SplitPane>
    )
  }
}

export default GeschaefteLayout
