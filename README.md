# Cycle JSONP Driver

A [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for making HTTP requests through the JSONP hack, based on the [jsonp](https://github.com/webmodules/jsonp) package. This package is small, hacky (as JSONP is too), and untested. Whenever possible, use proper server and client CORS solution with the [HTTP Driver](https://github.com/cyclejs/cycle-http-driver).

```
npm install @cycle/jsonp
```

## Usage

```js
function main(responses) {
  // This API endpoint returns a JSON response
  const HELLO_URL = 'http://localhost:8080/hello';
  let request$ = Rx.Observable.just(HELLO_URL);
  let vtree$ = responses.JSONP
    .filter(res$ => res$.request === HELLO_URL)
    .mergeAll()
    .startWith({text: 'Loading...'})
    .map(json =>
      h('div.container', [
        h('h1', json.text)
      ])
    );

  return {
    DOM: vtree$,
    JSONP: request$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('.js-container'),
  JSONP: makeJSONPDriver()
})
```

- - -

[![Build Status](https://travis-ci.org/cyclejs/cycle-jsonp-driver.svg?branch=master)](https://travis-ci.org/cyclejs/cycle-jsonp-driver)
[![Dependency Status](https://david-dm.org/cyclejs/cycle-jsonp-driver.svg)](https://david-dm.org/cyclejs/cycle-jsonp-driver)
[![devDependency Status](https://david-dm.org/cyclejs/cycle-jsonp-driver/dev-status.svg)](https://david-dm.org/cyclejs/cycle-jsonp-driver#info=devDependencies)
