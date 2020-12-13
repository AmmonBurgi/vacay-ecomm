import React from 'react'
import './App.css'
import routes from './routes'
import Header from './Components/Header/Header'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import {withRouter} from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51GxfLDIvVVGRQ9wLZdeKLkEieEKliFGS6yGGwLt2b0jHmVzlbSruFeMbzTX6ABfoZb1u2bX4legnRHxhn08QDbYf00iUQC9LPn')

function App() {
  return (
    <Elements stripe={stripePromise} >
      <div className="App">
        <Header />
        <NavBar />
        {routes}
        <Footer />
      </div>
    </Elements>
  );
}

export default withRouter(App);
