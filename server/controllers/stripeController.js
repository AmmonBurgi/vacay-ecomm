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
        res.status(200).send(paymentIntent.client_secret)
    },
    payHistory: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {address, apartment, city, country, zipCode, state, cart} = req.body
        console.log(cart)
        db.history.add_purchase_address(user_id, address, apartment, city, country, zipCode, state)
        .then((historyId) => {
            cart.forEach((element) => {
                const {product_id, cart_quantity, cart_title, product_img, cart_price} = element
                db.history.add_purchase_items(historyId, product_id, cart_title, product_img, cart_quantity, cart_price)
            })
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
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
            console.log(err)
        })
    }
}