const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    port = 4040,
    app = express()

    app.use(express.json())

    app.listen(port, () => console.log(`server listening on port ${port}`))