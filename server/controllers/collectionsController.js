module.exports = {
    allCollections: (req, res) => {
        const db = req.app.get('db')

        db.collections.all_collections()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send('Error...', err))
    },
    getMatte: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_matte()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send('Error...', err))
    },
    getPolarized: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_polarized()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send('Error...', err))
    },
    getPrescription: (req, res) => {
        const db = req.app.get('db')

        db.collections.get_prescription()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send('Error...', err))
    },
    searchedCollection: async (req, res) => {
        const db = req.app.get('db')
        const {searchVal} = req.query

        const titleResult = await db.collections.get_searched_title(searchVal)
        if(titleResult.length !== 0){
            return res.status(200).send(titleResult)
        }

        const detailResult = await db.collections.get_searched_detail(searchVal)
        res.status(200).send(detailResult)
    },
    getProduct: async ( req, res ) => {
        const db = req.app.get('db')
        const {productId} = req.query

        const mainProduct = await db.collections.get_product(productId)
        const productDetails = await db.collections.get_product_details(productId)

        res.status(200).send({mainProduct, productDetails})
    }
}