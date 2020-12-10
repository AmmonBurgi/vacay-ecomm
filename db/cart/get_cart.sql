select vc.*, vp.pro_quantity, vp.product_price from vacay_cart vc
join vacay_pro vp on vc.product_id = vp.product_id
where vc.user_id = $1