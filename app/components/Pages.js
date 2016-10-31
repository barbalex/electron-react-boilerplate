import React, { PropTypes } from 'react'
import Page from '../containers/page/Page.js'
import styles from './Pages.css'


const Pages = ({ pages }) =>
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

export default Pages
