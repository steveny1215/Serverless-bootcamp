const multipart = require("parse-multipart");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // When the data starts and when the data ends
  const boundary = multipart.getBoundary(req.headers['content-type']);
  //We'll be specify a body parser for the multipart data
  const body = req.body;
  // here's your parts:
  const parts = multipart.Parse(body, boundary);
  //Buffer the process of preloading data into a reserved area of memory
  let convertedResult = Buffer.from(parts[0].data).toString('base64');

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: convertedResult,
  };
};