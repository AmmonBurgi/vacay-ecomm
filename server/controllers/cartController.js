module.exports={
    addToCart: async(req, res) => {
        const db = req.app.get('db')
        const { product_id, product_title, product_img, product_price, type_id, addQuantity } = req.body
        const {user_id} = req.session.user

        const existingProduct = await db.cart.checkCart(product_id, user_id)

        if(existingProduct[0]){
            const newQuantity = existingProduct[0].cart_quantity + addQuantity
            return (
                db.cart.updateQuantity(newQuantity, (product_price * newQuantity), product_id, user_id).then(() => {
                    res.status(200).send('Product added to cart!')
                }).catch(err => res.status(500).send(err))
            )
        }

        db.cart.add_cart(user_id, product_id, addQuantity, product_title, (product_price * addQuantity), product_img, type_id ).then(() => {
            res.status(200).send('Product added to cart!')
        }).catch(err => res.status(500).send(err))
    },
    getCart: (req, res) => {
        if(!req.session.user){
            return res.status(204).send('No session can be found!')
        }

        const db = req.app.get('db')
        const {user_id} = req.session.user

        db.cart.get_cart(user_id)
        .then(cart => {
            res.status(200).send(cart)
        }).catch(() => res.status(500).send('Could not obtain users cart!'))
    },
    deleteProductCart: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {productId} = req.query

        db.cart.delete_product_cart(user_id, productId)
        .then(() => {
            res.sendStatus(200)
        }).catch(err => res.status(500).send('Could not delete product from cart!', err))
    },
    updateCart: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {updateFilter} = req.body

        updateFilter.forEach((element, index) => {
            const {quantity, cartId, productPrice} = element
            db.cart.updateCart(user_id, quantity, cartId, (productPrice * quantity))
            .then(() => {
                console.log('Updated Cart!')
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
        })
        res.sendStatus(200)
    }
}