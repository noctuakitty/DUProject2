-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;

-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;

DROP DATABASE IF EXISTS destinations;
CREATE DATABASE destinations;
USE destinations;

CREATE TABLE destinations (
locationType varchar (200) NOT NULL,
locationName varchar (200) NOT NULL,
city varchar (200) NOT NULL,
id int NOT NULL auto_increment,
primary key (id)
);

SELECT * FROM destinations;