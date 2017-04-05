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

Do something
```
http://localhost:3000/api

Example response:
{
  bla: asdf,
  woot: qwer
}
```
