var http = require('http');
var url = require('url');
var fs = require('fs');
let count=1;
const mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "svg": "image/svg+xml",
  "json": "application/json",
  "js": "text/javascript",
  "css": "text/css"
};
console.log(__dirname);

//app.use(express.static(__dirname + '/public'));

http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  console.log(`${count}. q.pathname is ${q.pathname} type ${typeof q.pathname}`);
  if(q.pathname==="/"){
    q.pathname+="index.html";
  }
  function get404(){
    console.log(`can't find the url, sending 404`);
    filename= "./404.html";
    res.writeHead(404, {'Content-Type': 'text/html'});
    // trying to acess 404.html
    fs.readFile(filename, function(err2, data2) {
      if(err2){
        console.log(`error at 404.html`);
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
        console.log(`checkpoint1`)    
        res.writeHead(302, {'Content-Type': 'text/html', 'Location':'./404.html'});
        res.write(data2);
        console.log(`write data`)    
        return res.end();
      })
  }
  count++;
  fs.readFile(filename, function(err, data) {
    if (err) {
      return get404();
    } 
    // if file found
    console.log(`checkpoint3`)    
    res.writeHead(200, {'Content-Type': mimeTypes});
    res.write(data);
    return res.end();
  });
}).listen(8080); 

