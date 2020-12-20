select vh.*, vhp.history_pro_id, vhp.product_id, vhp.product_title, vhp.product_img from vacay_history vh
join vacay_history_pro vhp on vh.history_id = vhp.history_id
where vh.user_id = $1;