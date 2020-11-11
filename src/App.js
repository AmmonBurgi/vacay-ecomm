import React from 'react'
import './App.css'
import Landing from './Components/Landing/Landing'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import Collections from './Components/Collections/Collections'
import Connect from './Components/Connect/Connect'
import Login from './Components/Login/Login'
import Payment from './Components/Payment/Payment'
import Search from './Components/Search/Search'
import Shipping from './Components/Shipping/Shipping'
import Story from './Components/Story/Story'
import Register from './Components/Register/Register'

function App() {
  return (
    <div className="App">
     <Landing />
     <Cart />
     <Checkout />
     <Collections />
     <Connect />
     <Login />
     <Payment />
     <Search />
     <Shipping />
     <Story />
     <Register />
    </div>
  );
}

export default App;
