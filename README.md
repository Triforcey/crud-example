# CRUD Example

## What is CRUD?

A CRUD API is a method of **c**reating, **r**eading, **u**pdating, and **d**eleting data. Thus CRUD.

### Create

A create request is made with the method `POST`. These requests are usually made at a create user page or something similar.

### Read

A read request is made with the method `GET`. A read request can often be made to either fetch a list of objects, or a single object.

### Update

An update request is made with the method `PUT`. An update request usually only needs to have an object with the changed values in the body. The server will then change only those values.

### Delete

A delete request is made with the method `DELETE`. A delete request need only contain an identifier of what is to be deleted.

## Identifying Data

### Querying

Usually a CRUD API is made to a server connected to a database. Because of this the best way to identify the data to be affected is with a database query. Therefore, if you wished to delete any objects with a field matching a specific value, you would send a query specifying that value.

Note: Sometimes queries may actually refer to more than one object. If this is allowed, the path should be plural rather than singular. For instance: `/potatoes`, not `/potato`.

## Running this Sample

### What You Need

1. Node.js, probably not a really old version
2. A MongoDB running somewhere
3. Your database url, credentials, etc

Clone this repository:

```bash
git clone https://github.com/Triforcey/crud-example.git
```

Install dependencies:

```bash
npm i
```

Configure enviornment variables:
```bash
export DB_URL="mongodb://user:pwd@your-mongo-server.com/login-database" DB_NAME="your-database"
```

Start!
```bash
npm start
```
