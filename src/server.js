const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

const users = {};

const resJSON = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(object));
    return;
};

const resJSONHead = (response, statusCode) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end();
    return;
}

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;

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
        if (request.method === 'GET') {
            resJSON(response, 200, users);
        }

        else if (request.method === 'HEAD') {
            resJSONHead(response, 200);
        }
    }

    else if (path === '/notReal') {
        if (request.method === 'GET') {
            resJSON(response, 404, users);
        }

        else if (request.method === 'HEAD') {
            resJSONHead(response, 404);
        }
    }

    else if (request.method === 'POST' && path === '/addUser') {
        const { name, age } = request.body;

        if (!name || !age) {
            resJSON(response, 404, users);
        }

        else if (!users[name]) {
            users[name] = { name, age };
            resJSON(response, 201, users);
        }

        else {
            users[name].age = age;
            resJSONHead(response, 201);
        }
    }

    else {
        resJSONHead(response, 404);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});