select * from reset_tokens
where email = $1 and token = $2;