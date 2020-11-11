import React from 'react'
import {Switch, Route} from 'react-router-dom'
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

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/cart/:id' component={Cart} />
        <Route exact path='/checkout/:id' component={Checkout} />
        <Route exact path='/collections' component={Collections} />
        <Route exact path='/connect' component={Connect} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/payment/:id' component={Payment} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/shipping/:id' component={Shipping} />
        <Route exact path='/story' component={Story} />
    </Switch>
)