# lambda-proxy-util

### respond(value, [options, callback])
Alias: `respondSuccess(value, [options, callback])`

This function aims to structure the construction of the object needed to communicate with lambda-proxy. By default if it is only given a `value` it will return a positive, json response object for lambda-proxy.

```javascript
const respond = require('@goodwaygroup/lambda-proxy-util');

const response = respond({some: 'data'})

//returns
// { statusCode: 200,
//   headers:
//    { 'content-type': 'application/json' },
//   body: '{"some":"data"}' }

const response = respond({
    some: 'data'
}, {
    cors: {
        credentials: true
    }
});

//returns
// { statusCode: 200,
//   headers:
//    { 'access-control-allow-origin': '*',
//      'access-control-max-age': 86400,
//      'access-control-allow-credentials': true,
//      'access-control-expose-headers': 'WWW-Authenticate, Server-Authorization',
//      'content-type': 'application/json' },
//   body: '{"some":"data"}' }

```

#### Arguments

* `value` (required) The value to be returned in the body of the response.
* `options` (optional) Object of options described below.
* `callback` (optional) Standard node-style callback. If the statusCode >= 400, the response object will be given to the first argument of the callback method as opposed to the second. Otherwise, if the callback is not given, the response object will be returned.

#### Options

* `statusCode` (default = 200) Allows the control of the request's response status code
* `contentType` (default = `application/json`) Sets the content-type header and if it is JSON, the function will stringify the value
* `headers` (default = `{}`) Key-value pair of headers and their values
* `isBinary` (default = false) If set to true, the value is expected to be a `Buffer` and will base64 encode the value
* `cors` (default = false) If `true`, will assume the defaults for the available cors options. Otherwise, an object can be assigned to control specific aspects of the cors headers.
  * origin (default = `*`) Controls the [access-control-allow-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Origin) header
  * maxAge (default = `86400`) Controls the [access-control-max-age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Max-Age) header
  * credentials (default = `false`) Controls the [access-control-allow-credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Credentials) header
  * exposedHeaders (default = `[]`) Controls the [access-control-expose-headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Expose-Headers) header

### respondError(value, [options, callback])

This extends `respond()` with exception of the statusCode now defaulting to `500` and the addition of 2 more options. Also, the expectation of the value should now be an Error object. This is not required but recommended.

#### Options

* `raw` (default = `false`) Ignores all translation of the given value and returns it as-is.
* `includeStack` (default = `false`) Only is used if the given value is an instance of Error. If `true`, will include the stack as another property in the response as a property named `stack`.
