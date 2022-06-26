var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
//const connectionString = "DefaultEndpointsProtocol=https;AccountName=stevensstorageaccount;AccountKey=79QO9CIcJEQ56tnFC4uWk2MTah8Cv6G6VIM0IMYx7s5OAfWprDgnRpUuWBlIkjffkGDvlMxGEnR1+AStKsiPOw==;EndpointSuffix=core.windows.net";
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    // Assigns the body variable the correct value
    const body = req.body;
    const parsedBody = multipart.Parse(body, boundary);

    let filetype = parsedBody[0].type;
    let ext;
    if (filetype == "image/png") {
        ext = "png";
    } else if (filetype == "image/jpeg") {
        ext = "jpeg";
    } else if (filetype == "image/jpg") {
        ext = "jpg"
    } else {
    username = "invalidimage"
    ext = "";
    }

    let responseMessage = await uploadFile(parsedBody, ext);
    context.res = {
        body: responseMessage
    };
    }

async function uploadFile(parsedBody, ext) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName); // Get a reference to a container
    const blobName = 'test.' + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
    // Uploading blob
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    return "File Saved";
}