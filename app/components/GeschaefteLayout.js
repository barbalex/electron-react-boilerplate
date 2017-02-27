import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'

import Geschaeft from '../components/geschaeft/Geschaeft'
import Pages from '../containers/Pages'
import GeschaeftPdf from '../components/GeschaeftPdf'
import Geschaefte from '../components/Geschaefte'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store, routing } = props
    const { config } = store.app
    const { activeId } = store.geschaefte
    const { configSetKey } = store
    const path = routing.locationBeforeTransitions.pathname
    return {
      configSetKey,
      config,
      activeId,
      path,
    }
  }),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('geschaefteColumnWidth', size),
  }),
  observer
)

const GeschaefteLayout = ({
  onChange,
  config,
  activeId,
  path,
}) => {
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
      onChange={onChange}
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

GeschaefteLayout.propTypes = {
  config: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  activeId: PropTypes.number,
  path: PropTypes.string.isRequired,
}

GeschaefteLayout.defaultProps = {
  activeId: null,
}

export default enhance(GeschaefteLayout)
