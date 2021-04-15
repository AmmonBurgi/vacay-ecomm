const bcrypt = require('bcryptjs');
const uuid = require('uuidv1');
const sgMail = require('@sendgrid/mail');
const moment = require('moment')

module.exports = {
    register: async(req, res) => {
        const db = req.app.get('db')
        const {firstName, lastName, email, password} = req.body

        const user = await db.auth.check_user(email)
        if(user[0]){
            return res.status(401).send('Email already in use!')
        }

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        const newUser = await db.auth.register_user(firstName, lastName, email, hash)
        req.session.user = newUser[0]
        res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        
        const user = await db.auth.check_user(email)
        if(!user[0]){
            return res.status(401).send('Email does not exist!')
        }
        
        let authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(401).send('Wrong Password')
        }
        delete user[0].password
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },
    session: (req, res) => {
        // console.log(req.session.user)
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    passReset: async(req, res) => {
        const {email} = req.body
        const db = req.app.get('db')

        const user = await db.auth.check_user(email)
        if(user[0]){
            const newToken = uuid()

            const expireDate = moment(moment()).add(1, 'hours').format('MMMM Do YYYY, h:mm:ss a')

            db.auth.create_token(email, newToken, expireDate)
            .then(() => {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                const msg = {
                    to: email,
                    from: 'elevate.energy.mail@gmail.com',
                    subject: 'Password Recovery',
                    html: 
                    `<div>
                        <b>Select the link below to reset your password!</b>
                        <p>http://localhost:3000/#/reset/${newToken}---${email}</p>
                    </div>`
                 }

                sgMail.send(msg)
                .then(() => {
                    console.log('Message Sent!')
                })
                .catch((error) => {
                    console.log('Message did not send!')
                    console.log(error)
                })
                })
            .catch(err => {
                console.log(err)
                console.log('Token was not created!')
            })


        }

        res.status(200).send({response: 'Password recovery email is on its way!'})
    },
    tokenCheck: (req, res) => {
        const db = req.app.get('db')
        const {token, email} = req.body

        db.auth.get_token(email, token)
        .then(tokens => {
            const currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a')

            console.log(tokens)
            if(!tokens[0]){
                return res.status(200).send({response: 'Token can not found!', expired: true})
            }
            if(tokens[0].expiration < currentDateTime){
               return res.status(200).send({response: 'Token is expired!', expired: true})
            }
            res.status(200).send({response: 'Token is accepted!', expired: false})
        }).catch(err => console.log(err))
    }
}