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

create table pro_detail(
product_id integer references vacay_pro(product_id),
detail_id integer references vacay_pro_details(detail_id)
);

create table vacay_pro_details(
detail_id serial primary key,
detail varchar(100) not null
);

create table vacay_pro(
product_id serial primary key,
product_title varchar(150) not null,
product_price integer not null,
product_img text not null,
pro_quantity INTEGER not null,
type_id integer references vacay_pro_types(type_id)
);

create table vacay_cart(
cart_id serial primary key,
user_id INTEGER references vacay_users(user_id),
product_id INTEGER REFERENCES vacay_pro(product_id),
cart_quantity integer not null,
cart_title varchar(150) not null,
cart_price DECIMAL(65, 30) not null,
product_img text,
type_id integer
);