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
import Account from './Components/Account/Account'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/cart/:id' component={Cart} />
        <Route path='/checkout/:id' component={Checkout} />
        <Route path='/collections' component={Collections} />
        <Route path='/connect' component={Connect} />
        <Route path='/account/login' component={Login} />
        <Route path='/account/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/payment/:id' component={Payment} />
        <Route path='/search' component={Search} />
        <Route path='/shipping/:id' component={Shipping} />
        <Route path='/story' component={Story} />
    </Switch>
)