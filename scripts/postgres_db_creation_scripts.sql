

-- -----------------------------------------------
-- Create user (role)
-- -----------------------------------------------
-- Role: mycity

-- DROP ROLE mycity;

CREATE ROLE mycity LOGIN
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
COMMENT ON ROLE mycity IS 'mycity user';

-- -----------------------------------------------
-- Create tablespace
-- -----------------------------------------------

-- Tablespace: data_tbs

-- DROP TABLESPACE data_tbs

CREATE TABLESPACE data_tbs
  OWNER postgres
  LOCATION 'C:\\Postgres_DB\\data';
  
-- -----------------------------------------------
-- Create database
-- -----------------------------------------------

-- Database: mycitydb

-- DROP DATABASE mycitydb;

CREATE DATABASE mycitydb
  WITH OWNER = mycity
       ENCODING = 'UTF8'
       TABLESPACE = data_tbs
       LC_COLLATE = 'English_United States.1252'
       LC_CTYPE = 'English_United States.1252'
       CONNECTION LIMIT = -1;

-- -----------------------------------------------
-- Create schema
-- -----------------------------------------------
-- Schema: mycity

-- DROP SCHEMA mycity;

CREATE SCHEMA mycity
  AUTHORIZATION mycity;

-- -----------------------------------------------
-- Create tables
-- -----------------------------------------------

-- Table: mycity."case"

-- DROP TABLE mycity."case";

CREATE TABLE mycity."case"
(
  id serial NOT NULL,
  case_id text NOT NULL,
  date_reported date NOT NULL,
  time_reported time without time zone,
  case_type_id integer NOT NULL,
  local_area_id integer NOT NULL,
  hundred_block text,
  street text,
  CONSTRAINT case_id_pk PRIMARY KEY (id),
  CONSTRAINT case_caseid_uk UNIQUE (case_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mycity."case"
  OWNER TO mycity;

-- Table: mycity.case_type

-- DROP TABLE mycity.case_type;

CREATE TABLE mycity.case_type
(
  id serial NOT NULL,
  case_type_name text,
  division_id integer,
  CONSTRAINT case_type_id_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mycity.case_type
  OWNER TO mycity;


-- Table: mycity.department

-- DROP TABLE mycity.department;

CREATE TABLE mycity.department
(
  id serial NOT NULL,
  dept_name text,
  CONSTRAINT dept_id_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mycity.department
  OWNER TO mycity;


-- Table: mycity.division

-- DROP TABLE mycity.division;

CREATE TABLE mycity.division
(
  id serial NOT NULL,
  dept_id integer NOT NULL,
  division_name text,
  CONSTRAINT division_id_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mycity.division
  OWNER TO mycity;


-- Table: mycity.local_area

-- DROP TABLE mycity.local_area;

CREATE TABLE mycity.local_area
(
  id serial NOT NULL,
  local_area_name text NOT NULL,
  CONSTRAINT local_area_id_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mycity.local_area
  OWNER TO mycity;

