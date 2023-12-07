const http = require('http');
const port = process.env.PORT || 8000;
const fs = require('fs');
let pets = [];
fs.readFile('../pets.json', 'utf-8', function(error, data) {
    if(error) {
        console.error(error);
        exit(1);
    }
    else {
        pets = JSON.parse(data);
    }
})
const server = http.createServer(function(req, res) {
    const petRegExp = /^\/pets\/(.*)$/;
    const index = Number(req.url.slice(req.url.lastIndexOf('/') + 1))
    if(req.method === 'GET' && req.url === '/pets') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(pets));
    } else if(req.method === 'GET' && req.url === `/pets/${index}` && index >= 0 && index < pets.length && typeof index === 'number') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(pets[index]));
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
      }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});