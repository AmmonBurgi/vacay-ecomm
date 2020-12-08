update vacay_cart
set cart_quantity = $1, cart_price = $2
where product_id = $3 and user_id = $4;