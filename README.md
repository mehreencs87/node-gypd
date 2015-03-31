Build your node.js native dependencies only once on a single place.

Status: experimental.

## Why?

We waste too much time waiting npm and node-gyp to build native dependencies every single time.

**You are supposed to use the same platform on both sides.**

## Installation

```
npm install -g node-gypd
```

## Run the server

```
PORT=9000 CACHE_PATH=/var/gypd node-gypd
```

## Usage

From your packages:

```javascript
//old:
"bcrypt": "~0.7.5"

//new:
"bcrypt": "http://localhost:9000/node/0.10.30/packages/bcrypt/0.7.5"
```

From the command line:

```
npm install http://localhost:9000/node/0.10.30/packages/bcrypt/0.7.5
```

## License

MIT 2015 - AUTH0 INC.