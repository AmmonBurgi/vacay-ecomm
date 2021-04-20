const sgMail = require('@sendgrid/mail')

module.exports = {
    sendFeedback: (req, res) => {
        const {message, name, email, phone} = req.body
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: 'ammonburgi@gmail.com',
            from: 'vacay.mailing@gmail.com',
            subject: 'Feedback',
            html: `<div>
                <p><b>Name: </b>${name}</p>
                <p><b>Email: </b>${email}</p>
                <p><b>Phone: </b>${phone}</p>
                <p>${message}</p>
            </div>
            `
        }
        sgMail.send(msg).then(() => {
            res.status(200).send({response: 'Feedback sent!'})
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
    }
}