import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import Page from '../containers/page/Page'
import styles from './Pages.css'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const { pages } = store.pages
    return { pages }
  }),
  observer
)

const Pages = ({ pages = [] }) =>
  <div className={styles.body}>
    {
      pages.map((page, pageIndex) =>
        <Page
          key={pageIndex}
          pageIndex={pageIndex}
          className={styles.pageContainer}
        />
      )
    }
  </div>

Pages.displayName = 'Pages'

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default enhance(Pages)
