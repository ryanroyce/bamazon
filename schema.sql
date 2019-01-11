CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
PRIMARY KEY (item_id),
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(20) NOT NULL
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ray Bans','Accessories',150.00, 200),
('Echo Dot','Electronics',40.00,100),
('Kindle','Electronics',80.00,400),
('Halo 8','Video Games',60.00,10),
('Rant','Books',10.00,350),
('Tank Top','Clothing',20.00,800),
('Mac Book Pro','Electronics',2500.00,70),
('Super Nintendo','Electronics',100.00,30),
('Gucci Watch','Accessories',500.00,150),
('Dog Food','Food',60.00,1000),
