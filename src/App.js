import React from 'react'
import './App.css'
import routes from './routes'
import Header from './Components/Header/Header'
import {withRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default withRouter(App);
