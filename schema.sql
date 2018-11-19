

-- USERs
-- name
create table users (
  id serial primary key,
  name text,
  username varchar(200) unique not null,
  pwhash varchar(60) not null
);

-- TODOs
-- name
-- completed
create table albums (
  id serial primary key,
  name text,
  code text,
  user_id integer references users (id) on delete cascade
);

create table images (
  id serial primary key,
  url text,
  album_id integer references todos (id) on delete cascade
)