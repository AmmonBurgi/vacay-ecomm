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
        const db = req.app.get('db')
        const {user_id} = req.session.user

        db.cart.get_cart(user_id)
        .then(cart => {
            res.status(200).send(cart)
        }).catch(() => res.status(500).send('Could not obtain users cart!'))
    }
}