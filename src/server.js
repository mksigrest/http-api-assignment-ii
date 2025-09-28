const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

const responseJSON = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(object));
};

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === '/' || path === '/client.html') {
        fs.readFile('client.html', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Server error');
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
        return;
    }

    else if (path === '/style.css') {
        fs.readFile('style.css', (error, data) => {
            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Not found');
                return;
            }

            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(data);
        });
        return;
    }

    else if (path === '/getUsers') {

    }
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});