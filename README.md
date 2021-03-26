# Loc8r

[![AngularTest](https://github.com/iproman/loc8r/actions/workflows/ngtest.yml/badge.svg)](https://github.com/iproman/loc8r/actions/workflows/ngtest.yml)
[![Coverage Status](https://coveralls.io/repos/github/iproman/loc8r/badge.svg?branch=main)](https://coveralls.io/github/iproman/loc8r?branch=main)
[![EditorConfig](https://github.com/iproman/loc8r/actions/workflows/editorconfig.yml/badge.svg?branch=main)](https://github.com/iproman/loc8r/actions/workflows/editorconfig.yml)

Find places to work with wi-fi near you!

## Installation

1. Copy repo

```
git clone https://github.com/iproman/loc8r.git
```
or use GitHub CLI
```
gh repo clone iproman/loc8r
```

2. Install default packages in main folder

```
./ npm install
```

3. Install MongoDB

- Go to MongoDB official site [MongoDB](https://karma-runner.github.io).

## Run dev

1. Run MongoDB

2. Run server (api/server)

```
  npm start
```

- You'll see if MongoDB connected in console.

3. Run angular (front)

```
  npm start:ng
```

4. Open Browsers

- For angular `http://localhost:4200/`
- For express `http://localhost:3000/`
- API connection `http://localhost:3000/api/`

## Tests (angular)

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code scaffolding for angular

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build angular

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
