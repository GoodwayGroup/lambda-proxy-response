exports.cors = {
    origin: '*',
    maxAge: 86400,
    exposedHeaders: [
        'WWW-Authenticate',
        'Server-Authorization'
    ],
    additionalExposedHeaders: [],
    credentials: false
};

exports.statusCode = 200;

exports.contentType = 'application/json';
