import React, { PropTypes } from 'react'
import Navbar from '../components/navbar/Navbar'

const App = ({ children }) => {
  // setting ref according to this:
  // http://stackoverflow.com/questions/35918706/overcoming-lack-of-refs-in-stateless-components
  let app  // eslint-disable-line no-unused-vars
  const setRef = (passedApp) => {
    app = passedApp
  }
  return (
    <div ref={setRef}>
      <Navbar />
      {children}
    </div>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
