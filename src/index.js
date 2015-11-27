let most = require(`most`)
let jsonp = require(`jsonp`)

function createResponse$(url) {
  return most.create((next, end, error) => {
    if (typeof url !== `string`) {
      error(new Error(`Observable of requests given to JSONP ` +
        `Driver must emit URL strings.`))
      return () => {} // noop
    }

    try {
      jsonp(url, (err, res) => {
        if (err) {
          error(err)
        } else {
          next(res)
          end()
        }
      })
    } catch (err) {
      error(err)
    }
  })
}

function makeJSONPDriver() {
  return function jsonpDriver(request$) {
    return request$.map(url => {
      let response$ = createResponse$(url)
      response$.request = url
      return response$
    })
  }
}

module.exports = {
  /**
   * JSONP Driver factory.
   *
   * This is a function which, when called, returns a JSONP Driver for
   * Motorcycle.js apps. The driver is also a function, and it takes
   * an Observable of requests (URL strings) as input, and generates a
   * metastream of responses.
   *
   * **Requests**. The Observable of requests should strings as the URL of the
   * remote resource over HTTP.
   *
   * **Responses**. A metastream is an Observable of Observables. The response
   * metastream emits Observables of responses. These Observables of responses
   * have a `request` field attached to them (to the Observable object itself)
   * indicating which request (from the driver input) generated this response
   * Observable. The response Observables themselves emit the response object
   * received through the npm `jsonp` package.
   *
   * @return {Function} the JSONP Driver function
   * @function makeJSONPDriver
   */
  makeJSONPDriver,
}
