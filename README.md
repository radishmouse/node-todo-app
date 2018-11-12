

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



# Adding a form to edit a user's info

## Add an `edit` link to each `<li>`

Added this to the backtick string in `userToItem` (in the `userList.js` file`).

## Make the link to go an "edit page"

## Add a new route hander to show an edit user form.

## Create a userForm template function

## Confirm that the `app.post` reads the values out of the form

## Send a `res.redirect`