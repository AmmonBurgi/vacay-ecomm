const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    port = 4040,
    app = express(),
    authCtrl = require('./controllers/authController')

    app.use(express.json())

    app.get('/api/stuff', authCtrl.login)

    app.listen(port, () => console.log(`server listening on port ${port}`))