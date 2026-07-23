CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    country VARCHAR(50),
    address VARCHAR(250),
    postal_code VARCHAR(50)
) ENGINE=InnoDB;

CREATE TABLE refresh_token(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(190) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE products(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    price DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE images(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(250) NOT NULL,
    id_products INT NOT NULL,
    FOREIGN KEY (id_products) REFERENCES products(id) 
) ENGINE=InnoDB;

CREATE TABLE baskets(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id) 
) ENGINE=InnoDB;

CREATE TABLE orders(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date_order DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL,
    address VARCHAR(250) NOT NULL,
    postal_code VARCHAR(50) NOT NULL,
    delivery_url VARCHAR(250),
    total_price DECIMAL(10,2) NOT NULL,
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id) 
) ENGINE=InnoDB;

CREATE TABLE orders_products(
    quantity INT NOT NULL,
    id_products INT,
    id_orders INT,
    PRIMARY KEY (id_products, id_orders),
    FOREIGN KEY (id_products) REFERENCES products(id),
    FOREIGN KEY (id_orders) REFERENCES orders(id)
) ENGINE=InnoDB;

CREATE TABLE baskets_products(
    quantity INT NOT NULL,
    id_products INT,
    id_baskets INT,
    PRIMARY KEY (id_products, id_baskets),
    FOREIGN KEY (id_products) REFERENCES products(id),
    FOREIGN KEY (id_baskets) REFERENCES baskets(id)
) ENGINE=InnoDB;