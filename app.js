const http = require('http');


http.createServer(function (req,res){
res.write("on the way of being fullstack engineer");
res.end();


}).listen(3000);

console.log("server started")
