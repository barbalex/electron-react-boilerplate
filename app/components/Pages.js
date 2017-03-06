import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Page from './Page'
import styles from './Pages.css'

const enhance = compose(
  inject('store'),
  observer
)

const Pages = ({ store }) =>
  <div className={styles.body}>
    {
      store.pages.pages.map((page, pageIndex) =>
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
  store: PropTypes.object.isRequired,
}

export default enhance(Pages)
