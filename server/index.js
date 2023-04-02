const http = require('http');
const PORT = 8000;

const fs = require('fs');
const path = require('path');
const url = require('url');

const publicPath = '../public'; 

const routes = {
    "/": "index.html",
    "/cari-mobil": "sewa.html"
}

// maps file extention to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
};

//request handler
function onRequest(req, res){
    // parse URL
    const parsedUrl = url.parse(req.url);
    let pathUrl = parsedUrl.pathname

    // ROUTERS
    if (routes.hasOwnProperty(pathUrl)) pathUrl = routes[pathUrl];

    const sanitizePath = path.normalize(pathUrl).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, publicPath, sanitizePath);

    fs.exists(pathname, function (exist) {
        if (!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }

        // read file from file system
        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
   
}

const server = http.createServer(onRequest);

server.listen(PORT, '127.0.0.1', ()=>{
    console.log("Server sudah berjalan, silahkan dibuka http://127.0.0.1:%d", PORT);
})