

-- USERs
-- name
create table users (
  id serial primary key,
  name text,
  username varchar(200) not null,
  password varchar(60) not null
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
