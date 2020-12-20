insert into vacay_history(
user_id,
date_purchased,
first_address,
second_address,
city, 
country,
zip,
state
) values (
$1,
NOW(),
$2,
$3,
$4,
$5,
$6,
$7
)returning history_id;