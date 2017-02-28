import React, { PropTypes } from 'react'
import DevTools from 'mobx-react-devtools'

import Navbar from '../components/navbar/Navbar'

const App = ({ children, ...rest }) => {
  // setting ref according to this:
  // http://stackoverflow.com/questions/35918706/overcoming-lack-of-refs-in-stateless-components
  let app  // eslint-disable-line no-unused-vars
  const setRef = (passedApp) => {
    app = passedApp
  }
  console.log('App, rest:', rest)
  return (
    <div ref={setRef}>
      <DevTools />
      <Navbar {...rest} />
      {children}
    </div>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
