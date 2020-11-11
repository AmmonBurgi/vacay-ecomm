module.exports = {
    login: (req, res) => {
        console.log(req.query)
        res.status(200).send('hello')
    }
}