import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Cart from './Components/Cart/Cart'
import Collections from './Components/Collections/Collections'
import Connect from './Components/Connect/Connect'
import Login from './Components/Login/Login'
import Payment from './Components/Payment/Payment'
import Search from './Components/Search/Search'
import Shipping from './Components/Shipping/Shipping'
import Story from './Components/Story/Story'
import Register from './Components/Register/Register'
import Account from './Components/Account/Account'
import CollectionsAll from './Components/CollectionsAll/CollectionsAll'
import DisplayCollection from './Components/DisplayCollection/DisplayCollection'
import Recovery from './Components/Recovery/Recovery'
import Information from './Components/Information/Information'
import Reset from './Components/Reset/Reset'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/cart' component={Cart} />
        <Route path='/collections/all/product/:id' component={DisplayCollection} />
        <Route path='/collections/:type' component={CollectionsAll} />
        <Route path='/collections' component={Collections} />
        <Route path='/connect' component={Connect} />
        <Route path='/account/login' component={Login} />
        <Route path='/account/register' component={Register} />
        <Route path='/account/recovery' component={Recovery} />
        <Route path='/account' component={Account} />
        <Route path='/checkout/info/shipping/payment' component={Payment} />
        <Route path='/checkout/info/shipping' component={Shipping} />
        <Route path='/checkout/info' component={Information} />
        <Route path='/search' component={Search} />
        <Route path='/story' component={Story} />
        <Route path='/reset/:token' component={Reset} />
    </Switch>
)