select vp.*, vpt.type_title, vpd.detail from vacay_pro vp
inner join vacay_pro_types vpt on vp.type_id = vpt.type_id 
left join vacay_pro_details vpd on vp.detail_id = vpd.detail_id;