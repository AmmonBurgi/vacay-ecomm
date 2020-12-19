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
    }
}