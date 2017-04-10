# beer-cellar-api
An experimental API set up with Mongo, Node and Express.

## setting up

Install packages:
```
npm install
```

Create mongodb path, for example:
```
sudo mkdir -p /data/beerdb
```

Start mongodb:
```
sudo mongod --dbpath /data/beerdb --port 28018
```

Launch server:
```
npm run dev
```

## consuming the API

### Users API

Register user
```
method: POST
url: http://localhost:3000/users/register
header: {
  Content-Type: application/json
}
body: {
	"name": "Roland of Gilead",
	"email": "roland.gilead@mail.com",
	"password": "testpassword"
}

=========================
Example response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzUwMSwiaWF0IjoxNDkxNDk4NzAxfQ.ePNtaqPc7UzDS6pZwZ13uDuK7Nj3rrl02TREAkVUqXw"
}
```

Login user
```
method: POST
url: http://localhost:3000/users/login
header: {
  Content-Type: application/json
}
body: {
	"email": "roland.gilead@mail.com",
	"password": "testpassword"
}

=========================
Example response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8"
}
```

Get user profile (protected route)
```
method: GET
url: http://localhost:3000/users/login
header: {
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8
}

=========================
Example response:
{
  "user": {
    "_id": "58ebc8fe6fa8885058155caf",
    "hash": "d8dbaa215dd54d1fa102020fefd7217390711f0a74768cad26e50e9ee0cd99b78318479ccc04708718f3015e654491986b2a37b0669b38d5f3096b3908e045ca",
    "salt": "88408b7b4059e5d4a660ab2e09fcbd55",
    "email": "jake.chambers@darktower.com",
    "name": "Jake Chambers",
    "__v": 1,
    "beers": [
      "58ebd51789ba3f53369334fb"
    ]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGViYzhmZTZmYTg4ODUwNTgxNTVjYWYiLCJlbWFpbCI6Impha2UuY2hhbWJlcnNAZGFya3Rvd2VyLmNvbSIsIm5hbWUiOiJKYWtlIENoYW1iZXJzIiwiZXhwIjoxNDkxODUyNzYwLCJpYXQiOjE0OTE4NTA5NjB9.a7gPwsrFoOutGGLChe8tI6684zAD4ReSHdcsQyFuKPQ"
}
```

### Beers API

Get all beers
```
method: GET
url: http://localhost:3000/beers
header: {
  Content-Type: application/json
}

=========================
Example response:
[
  {
    "_id": "58dd3d4fcdb2db82b2ff3fa0",
    "name": "Guiness",
    "country": "Ireland",
    "__v": 0
  },
  {
    "_id": "58dd3d69cdb2db82b2ff3fa2",
    "name": "Colorado",
    "country": "Brazil",
    "__v": 0
  },
  {
    "_id": "58dd433c5142ac85749a582a",
    "name": "Heineken",
    "country": "Netherlands",
    "__v": 0
  }
]
```

Get beers that match a query
```
method: GET
url: http://localhost:3000/beers?name=Guiness
header: {
  Content-Type: application/json
}

=========================
Example response:
[
  {
    "_id": "58dd3d4fcdb2db82b2ff3fa0",
    "name": "Guiness",
    "country": "Ireland",
    "__v": 0
  }
]
```

Save a beer in the database

```
method: POST
url: http://localhost:3000/beers
header: {
  Content-Type: application/json
}
body: {
  "_creator": "58ebc8fe6fa8885058155caf",
	"name": "Suomenlinnan Panimo",
	"country": "Finland"
}

=========================
Example response:
{
  "message": "Beer created!"
}
```

Edit a beer entry
```
method: PUT
url: http://localhost:3000/beers/58dd433c5142ac85749a582a
header: {
  Content-Type: application/json
}
body: {
	"name": "Heineken",
	"country": "Holland"
}

=========================
Example response:
{
  "message": "Beer updated!"
}
```

Delete a beer
```
method: DELETE
url: http://localhost:3000/beers/58dd433c5142ac85749a582a
header: {
  Content-Type: application/json
}

=========================
Example response:
{
  "message": "Successfully deleted"
}
```
