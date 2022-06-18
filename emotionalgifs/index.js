module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const multipart = require('parse-multipart');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;
    const parts = multipart.Parse(body, boundary);

    let result = Buffer.from(parts[0].data).toString('base64');
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}