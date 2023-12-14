DROP TABLE IF EXISTS pets;

--  create petshop database and table
CREATE TABLE pets (
    id serial PRIMARY KEY,
    age int,
    kind text,
    name varchar(20)
);

