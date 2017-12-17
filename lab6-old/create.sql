CREATE KeySpace my_db
  WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE my_db;

DROP TABLE IF EXISTS person;

CREATE TABLE person (
  person_id uuid PRIMARY KEY,
  person_name varchar,
  person_age int
);

INSERT INTO person (person_id, person_name, person_age) VALUES (0efd11fd-6bc4-4f5f-b5ed-8baa23cad047, 'Mike', 27);
INSERT INTO person (person_id, person_name, person_age) VALUES (46568326-f158-4aa1-b1f5-d65840736cd3, 'Levi', 19);
INSERT INTO person (person_id, person_name, person_age) VALUES (44a3d909-0822-4af9-bfaa-f9589cc3be39, 'Peter', 30);
INSERT INTO person (person_id, person_name, person_age) VALUES (5139ba57-fa99-4df4-91fe-7ead588ff27a, 'Marry', 44) ;