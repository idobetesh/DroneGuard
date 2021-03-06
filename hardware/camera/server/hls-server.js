const http = require('http');
const fs = require('fs');

const PORT = 4000;

http.createServer(function (request, response) {
    console.log('request starting...', new Date());

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    if (request.method === 'OPTIONS') {
        respose.writeHead(204, headers);
        response.end();

        return;
    }

    let filePath = '/Users/ido/Desktop/test/video/ipcam' + request.url;
    console.log(filePath);

    fs.readFile(filePath, function (error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.end(content, 'utf-8');
        }
    });
}).listen(PORT);

console.log(`HLS-Server listening on port ${PORT}`);