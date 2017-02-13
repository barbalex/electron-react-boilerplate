import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Page.css'
import logoImg from 'file!../../etc/logo.png'  // eslint-disable-line

const enhance = compose(
  withHandlers({
    onClickHG1: props => () {
      
    }
  })
)

class Page extends Component {
  static propTypes = {
    firstPage: PropTypes.bool.isRequired,
    pagesQueryTitle: PropTypes.func.isRequired,
    pagesSetTitle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    queryTitle: PropTypes.bool.isRequired,
  }

  onClickH1 = () => {
    const { pagesQueryTitle } = this.props
    pagesQueryTitle(true)
  }

  onKeyPressTitle = (e) => {
    const { pagesQueryTitle, title } = this.props
    if (e.key === 'Enter' && title) {
      pagesQueryTitle(false)
    }
  }

  onBlurTitle = () => {
    const { pagesQueryTitle, title } = this.props
    if (title) pagesQueryTitle(false)
  }

  changeQueryTitle = (e) => {
    const { pagesSetTitle } = this.props
    const { value } = e.target
    pagesSetTitle(value)
  }

  render = () => {
    const {
      firstPage,
      queryTitle,
      title,
    } = this.props

    return (
      <div>
        {
          firstPage &&
          queryTitle &&
          <FormGroup>
            <FormControl
              type="text"
              value={title}
              placeholder="Titel erfassen"
              onChange={this.changeQueryTitle}
              onKeyPress={this.onKeyPressTitle}
              onBlur={this.onBlurTitle}
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
            onClick={this.onClickH1}
            className={styles.h1}
          >
            {title}
          </h1>
        }
      </div>
    )
  }
}

export default Page
