
\connect d797pbs2oonkvi;


DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS cuisines;


CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address_city VARCHAR(255) NOT NULL,
    address_state VARCHAR(5) NOT NULL,
    cuisine VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer VARCHAR(255) NOT NULL,
    review_date DATE NOT NULL,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    restaurant_id INT NOT NULL
);


ALTER TABLE reviews ADD CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE;