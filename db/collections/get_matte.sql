select vp.*, vpt.type_title from vacay_pro vp
inner join vacay_pro_types vpt on vp.type_id = vpt.type_id 
where vp.type_id = 1;