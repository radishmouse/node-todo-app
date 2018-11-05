

# Adding Users

## Start with the Database

- create the users table
- add some seed data

## Then add models

- create CRUD functions
- `module.exports` functions

# Adding Relationships

## Add foreign keys in the schema.sql

### For "has one" or "has many" relationships:

- Determine which "side" of the relationship needs the foreign key

### For "many to many" relationships

- Create a linking table that has foreign keys to both tables
- Add any necessary metadata to the linking table

## Add/modify functions to support relationships

### Add functions to query for related data

### Modify functions, adding `join`s to pull in related data (joining it onto existing `select` statements)