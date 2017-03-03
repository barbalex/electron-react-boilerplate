import React, { PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Page.css'

const enhance = compose(
  inject('store'),
  withHandlers({
    onClickH1: props => () =>
      props.store.pagesQueryTitle(true),
    onKeyPressTitle: props => (e) => {
      const { pagesQueryTitle } = props.store
      const { title } = props.store.pages
      if (e.key === 'Enter' && title) {
        pagesQueryTitle(false)
      }
    },
    onBlurTitle: props => () => {
      const { pagesQueryTitle } = props.store
      const { title } = props.store.pages
      if (title) pagesQueryTitle(false)
    },
    changeQueryTitle: props => (e) =>
      props.store.pagesSetTitle(e.target.value)
    ,
  }),
  observer
)

const Page = ({
  store,
  firstPage,
  onClickH1,
  onKeyPressTitle,
  onBlurTitle,
  changeQueryTitle,
}) =>
  <div>
    {
      firstPage &&
      store.pages.queryTitle &&
      <FormGroup>
        <FormControl
          type="text"
          value={store.pages.title}
          placeholder="Titel erfassen"
          onChange={changeQueryTitle}
          onKeyPress={onKeyPressTitle}
          onBlur={onBlurTitle}
          bsSize="large"
          autoFocus
          className={styles.titleInput}
        />
      </FormGroup>
    }
    {
      firstPage &&
      !store.pages.queryTitle &&
      <h1
        onClick={onClickH1}
        className={styles.h1}
      >
        {store.pages.title}
      </h1>
    }
  </div>

Page.propTypes = {
  store: PropTypes.object.isRequired,
  firstPage: PropTypes.bool.isRequired,
  onClickH1: PropTypes.func.isRequired,
  onKeyPressTitle: PropTypes.func.isRequired,
  onBlurTitle: PropTypes.func.isRequired,
  changeQueryTitle: PropTypes.func.isRequired,
}

export default enhance(Page)
