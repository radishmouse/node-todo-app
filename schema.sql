
-- TODOs
-- name
-- completed

create table todos (
  id serial primary key,
  name text,
  completed boolean
);

-- USERs
-- name

create table users (
  id serial primary key,
  name text
);