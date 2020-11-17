create table vacay_users(
user_id serial primary key,
email varchar(300) NOT NULL,
first_name varchar(300) NOT NULL,
last_name varchar(300) NOT NULL,
password text NOT NULL
);

create table vacay_pro_types(
type_id serial primary key,
type_title varchar(100) not null
);

create table vacay_pro_details(
detail_id serial primary key,
detail varchar(100) not null
);

create table vacay_pro(
product_id serial primary key,
product_title varchar(150) not null,
pro_quantity INTEGER not null,
type_id integer references vacay_pro_types(type_id),
detail_id integer references vacay_pro_details(detail_id)
);