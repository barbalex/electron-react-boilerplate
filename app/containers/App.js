import React, { Component, PropTypes } from 'react'
import Navbar from '../containers/navbar/Navbar.js'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div ref="app">
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
