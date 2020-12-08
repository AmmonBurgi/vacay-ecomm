select user_id, product_id, cart_quantity from vacay_cart
where product_id = $1 and user_id = $2;