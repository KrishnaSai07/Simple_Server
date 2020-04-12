const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes= {
    "html":"text/html",
    "jpeg":"image/jpeg",
    "jpg":"image/jpg",
    "png":"image/png",
    "js":"text/javacript",
    "css": "text/css"
}

http.createServer(function(req,res){
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(),unescape(uri));
    console.log(filename);
    console.log("Loading "+uri);
    var stats;

    try {
        console.log('Hits');
        stats = fs.lstatSync(filename);
        console.log(stats);
    } catch (error) {
        res.writeHead(404,{'Content-type':'text/plain'});
        res.write("404 Page not found");
        res.end();
    }
    if(stats.isFile())
    {
        var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200,{'Content-type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);


    }
    else if(stats.isDirectory())
    {
        res.writeHead(302,{
            'Location':'index.html'
        });
        res.end();
    }
    else
    {
        res.writeHead(500,{
            'Content-type' : 'text/plain'
        });
        res.write('500 Internal error');
        res.end();
    }

}).listen(8080);


// const hostname = 'localhost';
// const port = 8080;

// http.createServer((req,res) =>{
//     res.writeHead(200,{'Content-type': 'text/plain'});
//     res.end('Hello World\n');

// }).listen(port,hostname,()=>{
//     console.log(`Server is running at http://${hostname}:${port}/`);
// });