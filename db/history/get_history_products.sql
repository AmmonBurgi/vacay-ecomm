select vh.user_id, vhp.* from vacay_history vh
join vacay_history_pro vhp on vh.history_id = vhp.history_id
where vh.user_id = $1;