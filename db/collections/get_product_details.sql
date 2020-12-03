select vpd.*, pd.product_id from pro_detail pd
join vacay_pro_details vpd on pd.detail_id = vpd.detail_id
where pd.product_id = $1;