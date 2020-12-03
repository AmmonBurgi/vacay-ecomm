select vp.*, vpt.type_title from vacay_pro vp
join vacay_pro_types vpt on vp.type_id = vpt.type_id
where vp.product_id = $1;