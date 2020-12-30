update vacay_cart
set cart_quantity = $2, cart_price = $4
where user_id = $1 and cart_id = $3; 