CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(50),
    adress VARCHAR(255),
    postal_code INT,
);

CREATE TABLE refresh_token(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    token VARCHAR(190) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    id_users INT,
    FOREIGN KEY (id_users) REFERENCES users(id)
);
