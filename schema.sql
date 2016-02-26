DROP DATABASE IF EXISTS gtables;
CREATE DATABASE gtables;


\connect gtables;


DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS cuisines;


CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address_city VARCHAR(255) NOT NULL,
    address_state VARCHAR(5) NOT NULL,
    cuisine_id INT,
    rating INT CHECK(rating BETWEEN 1 AND 5) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT
);


CREATE TABLE cuisines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE restaurants ADD FOREIGN KEY (cuisine_id) REFERENCES cuisines(id);
