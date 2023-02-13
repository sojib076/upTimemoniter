const url = require('url');
const { StringDecoder } = require('string_decoder');
const route = require('../route');
const { notFoundHandeler } = require('../routeHandeler/notFoundHandeler');
handeler = {};

handeler.handelReqRes = (req, res) => {
    //req.url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const reqProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject

    };

    const decoder = new StringDecoder('utf-8');
    let realData = ' ';
    console.log(route)
    const chosenHandeler = route[trimmedPath] ? route[trimmedPath] : notFoundHandeler;
    chosenHandeler(reqProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) == 'number' ? statusCode : 500;
        payload = typeof (payload) == 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    })
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);

    })
    req.on('end', () => {
        const realData = decoder.end();

        res.end('Hello World');
    })



}
module.exports = handeler;