CREATE DATABASE IF NOT EXISTS groceries;

USE groceries;

CREATE TABLE section (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  color VARCHAR(6) NOT NULL,

  UNIQUE KEY(name),
  PRIMARY KEY(id)
);

CREATE TABLE grocery (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  section_id INT NOT NULL,

  UNIQUE KEY(name),
  PRIMARY KEY(id),
  FOREIGN KEY (section_id) REFERENCES section(id)
);

CREATE INDEX section_id ON grocery (section_id);
