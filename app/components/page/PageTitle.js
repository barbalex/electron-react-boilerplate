import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Page.css'
import logoImg from 'file!../../etc/logo.png'  // eslint-disable-line

const enhance = compose(
  withHandlers({
    onClickH1: props => () =>
      props.pagesQueryTitle(true)
    ,
    onKeyPressTitle: props => (e) => {
      const { pagesQueryTitle, title } = props
      if (e.key === 'Enter' && title) {
        pagesQueryTitle(false)
      }
    },
    onBlurTitle: props => () => {
      const { pagesQueryTitle, title } = props
      if (title) pagesQueryTitle(false)
    },
    changeQueryTitle: props => (e) =>
      props.pagesSetTitle(e.target.value)
    ,
  })
)

const Page = ({
  firstPage,
  queryTitle,
  title,
  onClickH1,
  onKeyPressTitle,
  onBlurTitle,
  changeQueryTitle,
}) =>
  <div>
    {
      firstPage &&
      queryTitle &&
      <FormGroup>
        <FormControl
          type="text"
          value={title}
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
      !queryTitle &&
      <h1
        onClick={onClickH1}
        className={styles.h1}
      >
        {title}
      </h1>
    }
  </div>

Page.propTypes = {
  firstPage: PropTypes.bool.isRequired,
  pagesQueryTitle: PropTypes.func.isRequired,
  pagesSetTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  queryTitle: PropTypes.bool.isRequired,
  onClickH1: PropTypes.func.isRequired,
  onKeyPressTitle: PropTypes.func.isRequired,
  onBlurTitle: PropTypes.func.isRequired,
  changeQueryTitle: PropTypes.func.isRequired,
}

export default enhance(Page)
