module.exports = {
    getMatte: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_matte()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => console.log('Error...', err))
    },
    getPolarized: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_polarized()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => console.log('Error...', err))
    },
    getPrescription: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_prescription()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => console.log('Error...', err))
    }
}