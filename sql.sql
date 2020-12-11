
-- SQLite
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name varchar(40),
    description varchar(128),
    price varchar(10)
    );

INSERT INTO products (name, description, price) VALUES
    ('Skirtless', 'A prada t-shirt, we like to call clothes random things that dont really make sense and are overpriced.', '30000 SEK'),
    ('The bag', 'GUCCI GUCCI FENDE FENDI PRADA. If you like brands we know YOU know what it is!', '45000 SEK'),
    ('Schoolbag', 'Its really a prada purse and your school stuff will most defentily not fit. Not even a pen.', '19999 SEK');

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email varchar(64) UNIQUE,
    firstname varchar(32),
    lastname varchar(32),
    password varchar(32),
    username varchar(16)
    );

INSERT INTO users (email, firstname, lastname, password, username) VALUES
    ('h18donme@du.se', 'Donika', 'Mehmeti','mypass', 'TheDon'),
    ('h17whatev@du.se', 'What', 'Ever', 'whatpass','What');