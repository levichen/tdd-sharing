CREATE KeySpace my_db
  WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE my_db;

DROP TABLE IF EXISTS person;

CREATE TABLE person (
  person_id uuid PRIMARY KEY,
  person_name varchar,
  person_gender varchar,
  person_age int
);