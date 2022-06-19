const multipart = require("parse-multipart");
const fetch = require('node-fetch');
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // When the data starts and when the data ends
  const boundary = multipart.getBoundary(req.headers['content-type']);
  //We'll be specify a body parser for the multipart data
  const body = req.body;
  // here's your parts:
  const parts = multipart.Parse(body, boundary);
  //Buffer the process of preloading data into a reserved area of memory
  //module.exports function
  //analyze the image
  const result = await analyzeImage(parts[0].data);
  context.res = {
	  body: {
		  result
	  }
  };
  console.log(result)
  context.done(); 
}



async function analyzeImage(img){
  const subscriptionKey = process.env.SUBSCRIPTIONKEY;

  const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

  let params = new URLSearchParams({
    'returnFaceId': 'true',
    'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
  })
  let resp = await fetch(uriBase + '?' + params.toString(), {
    method: 'POST',  //WHAT TYPE OF REQUEST?
    body: img,  //WHAT ARE WE SENDING TO THE API?
    headers: {
        'Content-Type': 'application/octet-stream',  //do this in the next section
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  })
  let data = await resp.json();

  return data; 

}