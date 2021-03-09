# Loc8r

[![EditorConfig](https://github.com/iproman/loc8r/actions/workflows/editorconfig.yml/badge.svg?branch=main)](https://github.com/iproman/loc8r/actions/workflows/editorconfig.yml)

Find places to work with wifi near you!

## Using tech

- Angular
- NodeJs + ExpressJs
- MongoDB
- HTML5 geolocation
- Pug (View in ExpressJs)
- Scss

## Installation

1. Install default packages in main folder

```
./ npm install
```

2. Install angular in `app_public` folder

```
./app_public npm install
```

3. Install MongoDB

- Go to MongoDB official site.

## Run

1. Go to main folder `./` and run

```
    node nodemon
```

- You'll see if MongoDB connected in console.

2. Go to angular folder `./app_public` and run

```
    ng serve
```

3. Open Browsers

- For angular `http://localhost:4200/`
- For express `http://localhost:3000/`
- API connection `http://localhost:3000/api/`

---

## Default changes:

- `scss` instead of `css`
- `angular` default folder for components `app/views`
- `ng` disable test files when create component
- `api` folder instead `app_api` for `express/mongo`
- `server` folder instead `app_server` for `express`
