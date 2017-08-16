const Cors = require('./cors');
const Defaults = require('./defaults');

exports.respond = (value, options, callback) => {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = options || {};

    const statusCode = options.statusCode || Defaults.statusCode;
    const contentType = options.contentType || Defaults.contentType;
    const isBinary = options.isBinary || false;
    let cors = false;
    let headers = options.headers || {};
    const result = {};

    if (Object.prototype.hasOwnProperty.call(options, 'cors')) {
        cors = options.cors;
    }

    headers = Object.assign(headers, Cors.expand(cors));
    headers['content-type'] = contentType;

    result.statusCode = statusCode;
    result.headers = headers;

    if (isBinary) {
        result.isBase64Encoded = true;
        result.body = value.toString('base64');
    } else if (contentType === 'application/json') {
        result.body = JSON.stringify(value);
    } else {
        result.body = String(value || undefined);
    }

    if (callback) {
        if (statusCode >= 400) {
            callback(result);
        } else {
            callback(null, result);
        }
    }

    return result;
};

exports.respondSuccess = (value, options, callback) => exports.respond(value, options, callback);

exports.respondError = (value, options, callback) => {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = options || {};

    options = Object.assign({
        statusCode: 500
    }, options);

    if (!options.raw && value instanceof Error) {
        const err = value;
        value = {
            message: err.toString()
        };

        if (options.includeStack && err.stack) {
            value.stack = err.stack;
        }
    }

    return exports.respond(value, options, callback);
};
