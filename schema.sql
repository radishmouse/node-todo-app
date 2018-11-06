

-- USERs
-- name
create table users (
  id serial primary key,
  name text
);

-- TODOs
-- name
-- completed
create table todos (
  id serial primary key,
  name text,
  completed boolean,
  user_id integer references users (id) on delete cascade
);

