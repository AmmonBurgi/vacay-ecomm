const stripe = require('stripe')(`${process.env.STRIPE_SECRET}`)

module.exports = {
    payIntent: async (req, res) => {
        const {email, total} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
            amount: (total * 100),
            currency: 'usd',
            // customer: req.session.user.user_id,
            receipt_email: email
        })
        if(!paymentIntent.client_secret){
            return res.status(500).send('No PaymentIntent!')
        }
        res.status(200).send(paymentIntent.client_secret)
    },
    payHistory: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {address, apartment, city, country, zipCode, state, cart} = req.body
        db.history.add_purchase_address(user_id, address, apartment, city, country, zipCode, state)
        .then((id) => {
            console.log(id)
            const {history_id} = id[0]
            console.log(history_id)
            cart.forEach((element) => {
                const {product_id, cart_quantity, cart_title, product_img, cart_price} = element
                db.history.add_purchase_items(history_id, product_id, cart_title, product_img, cart_quantity, cart_price).then(() => console.log('Item Added!')).catch(err => console.log(err))
            })
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send(err)
            console.log('Address Error..', err)
        })
    },
    getHistory: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        db.history.get_history(user_id)
        .then((history) => {
            res.status(200).send(history)
        }).catch(err => {
            res.status(500).send(err)
            console.log('History Error...', err)
        })
    }
}