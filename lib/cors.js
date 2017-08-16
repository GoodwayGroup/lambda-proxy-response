const Defaults = require('./defaults');

exports.expand = (cors) => {
    if (cors === true) {
        return exports.expand(Defaults.cors);
    } else if (typeof cors === 'object') {
        cors = Object.assign({}, Defaults.cors, cors);
    } else if (cors === false) {
        return {};
    } else {
        cors = Defaults.cors;
    }

    const headers = {};

    if (cors.origin) {
        headers['access-control-allow-origin'] = cors.origin;
    }

    if (cors.maxAge) {
        headers['access-control-max-age'] = cors.maxAge;
    }

    if (cors.credentials) {
        headers['access-control-allow-credentials'] = cors.credentials;
    }

    if (cors.exposedHeaders || cors.additionalExposedHeaders) {
        const exposedHeaders = [].concat(
            cors.exposedHeaders || [],
            cors.additionalExposedHeaders || []);

        headers['access-control-expose-headers'] = exposedHeaders.join(', ');
    }

    return headers;
};
