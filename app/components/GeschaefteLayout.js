import React, { Component, PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import Geschaeft from '../containers/geschaeft/Geschaeft'
import Pages from '../containers/Pages'
import GeschaeftPdf from '../components/GeschaeftPdf'
import Geschaefte from '../containers/Geschaefte'

class GeschaefteLayout extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    configSetKey: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    path: PropTypes.string.isRequired,
  }

  render = () => {
    const {
      configSetKey,
      config,
      activeId,
      path,
    } = this.props
    const showGeschaeft = (
      path === '/geschaefte'
      && activeId
    )
    const showPages = path === '/pages'
    const showGeschaeftPdf = path === '/geschaeftPdf' && activeId
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
            showGeschaeft
            && <Geschaeft />
          }
          {
            showPages
            && <Pages />
          }
          {
            showGeschaeftPdf
            && <GeschaeftPdf />
          }
        </div>
      </SplitPane>
    )
  }
}

export default GeschaefteLayout
