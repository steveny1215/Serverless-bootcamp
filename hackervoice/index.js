module.exports = async function (context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");
  
    // param name = password
    var password = req.query.password;
    context.log(password);
  
    let result = "";
  
    result = password == "letmein" ? "Access granted." : "Access denied.";
  
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: result,
    };
  };