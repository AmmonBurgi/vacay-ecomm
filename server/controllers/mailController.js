const sgMail = require('@sendgrid/mail')

module.exports = {
    sendFeedback: (req, res) => {
        const {message, name, email, phone} = req.body
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        console.log(message)

        const msg = {
            to: 'ammonburgi@gmail.com',
            from: 'vacay.feedback@gmail.com',
            subject: 'Feedback',
            html: `<div style="width:100%; display:flex; justify-content:center; align-items:center;">
            <div style="width:400px; display:flex; flex-direction:column; align-items:flex-start; height:auto; border:2px solid black; word-wrap:break-word;" >
                <p style="margin:0;">Name: ${name}</p>
                <p style="margin:0;">Email: ${email}</p>
                <p style="margin:0;">Phone: ${phone}</p>
                <hr style="width:100%; margin-bottom:10px;"></hr>
                <p>${message}</p>
            </div>
            </div>
            `
        }
        sgMail.send(msg).then(() => {
            res.status(200).send({message: 'Feedback sent!'})
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
    }   
}