insert into vacay_users(
email,
first_name,
last_name,
password
) values (
$3,
$1,
$2,
$4
)returning user_id, email, first_name, last_name;