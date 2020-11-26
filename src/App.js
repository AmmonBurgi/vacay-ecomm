import React from 'react'
import './App.css'
import routes from './routes'
import Header from './Components/Header/Header'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import {withRouter} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      {routes}
      <Footer />
    </div>
  );
}

export default withRouter(App);
