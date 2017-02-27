import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'

import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const { config } = store.app
    const { configSetKey } = store
    return {
      configSetKey,
      config,
    }
  }),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('geschaefteColumnWidth', size),
  }),
  observer
)

const FilterFieldsLayout = ({
  onChange,
  config,
}) =>
  <SplitPane
    split="vertical"
    minSize={100}
    defaultSize={config.geschaefteColumnWidth}
    onChange={onChange}
  >
    <Geschaefte />
    <FilterFields />
  </SplitPane>

FilterFieldsLayout.propTypes = {
  config: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default enhance(FilterFieldsLayout)
