select * from pro_detail pd
inner join vacay_pro vp on pd.product_id = vp.product_id
left join vacay_pro_details vpd on pd.detail_id = vpd.detail_id
where (vpd.detail ilike '%' || $1 || '%');