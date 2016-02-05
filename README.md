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

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
