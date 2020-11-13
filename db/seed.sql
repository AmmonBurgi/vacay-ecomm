create table vacay_users(
user_id serial primary key,
email varchar(300) NOT NULL,
first_name varchar(300) NOT NULL,
last_name varchar(300) NOT NULL,
password text NOT NULL
);