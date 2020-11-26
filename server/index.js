const { configure } = require('@testing-library/react')

require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    port = SERVER_PORT,
    app = express(),
    authCtrl = require('./controllers/authController'),
    collectCtrl = require('./controllers/collectionsController')

    app.use(express.json())

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
    }))

    //Auth Endpoints
    app.post('/api/login', authCtrl.login)
    app.post('/api/register', authCtrl.register)
    app.get('/api/session', authCtrl.session)
    app.get('/api/logout', authCtrl.logout)

    //Product Endpoints
    app.get('/api/collections/all', collectCtrl.allCollections)
    app.get('/api/collections/matte', collectCtrl.getMatte)
    app.get('/api/collections/polarized', collectCtrl.getPolarized)
    app.get('/api/collections/prescription', collectCtrl.getPrescription)
    app.get('/api/collections/searched', collectCtrl.searchedCollection)
    

    massive({
        connectionString: CONNECTION_STRING,
        ssl: {rejectUnauthorized: false}
    }).then(db => {
        app.set('db', db)
        console.log('db connected')
        app.listen(port, () => console.log(`server listening on port ${port}`))
    })

    

    