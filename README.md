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
  "_id": "58e676cd190bc1bbad6c768d",
  "hash": "85cb36183a786a117e21cf54ea7d3e7972e07ea4af6a642a92258ce3872625c3bb574e22d2a07f65a8cc4df814ef327cc9a6a1f3fb8b17e51880eeb2408afb15",
  "salt": "a19c4ee1c0c9e901e9e73360e52fcba0",
  "email": "roland.gilead@mail.com",
  "name": "Roland of Gilead",
  "__v": 0
}
```

### Beers API

Get all beers (protected route)
```
method: GET
url: http://localhost:3000/beers
header: {
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8,
  creator_id: "58ebc8fe6fa8885058155caf"
}

=========================
Example response:
[
  {
    "_id": "58dd3d4fcdb2db82b2ff3fa0",
    "_creator": "58ebc8fe6fa8885058155caf",
    "name": "Guiness",
    "country": "Ireland",
    "__v": 0
  },
  {
    "_id": "58dd3d69cdb2db82b2ff3fa2",
    "_creator": "58ebc8fe6fa8885058155caf",
    "name": "Colorado",
    "country": "Brazil",
    "__v": 0
  },
  {
    "_id": "58dd433c5142ac85749a582a",
    "_creator": "58ebc8fe6fa8885058155caf",
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
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8,
  creator_id: "58ebc8fe6fa8885058155caf"
}

=========================
Example response:
[
  {
    "_id": "58dd3d4fcdb2db82b2ff3fa0",
    "_creator": "58ebc8fe6fa8885058155caf",
    "name": "Guiness",
    "country": "Ireland",
    "__v": 0
  }
]
```

Save a beer in the database (protected route)

```
method: POST
url: http://localhost:3000/beers
header: {
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8,
  creator_id: "58ebc8fe6fa8885058155caf"
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
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8,
  creator_id: "58ebc8fe6fa8885058155caf"
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
  Content-Type: application/json,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU2NzZjZDE5MGJjMWJiYWQ2Yzc2OGQiLCJlbWFpbCI6InJvbGFuZC5naWxlYWRAbWFpbC5jb20iLCJuYW1lIjoiUm9sYW5kIG9mIEdpbGVhZCIsImV4cCI6MTQ5MjEwMzU5MSwiaWF0IjoxNDkxNDk4NzkxfQ.0Esj0ugc1mQ6mhYzFamtf682bS4Mcj6OcMej57F0Rv8,
  creator_id: "58ebc8fe6fa8885058155caf"
}

=========================
Example response:
{
  "message": "Successfully deleted"
}
```
