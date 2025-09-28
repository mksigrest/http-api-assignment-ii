const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const responseJSONGet = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
    return;
};

const responseJSONHead = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end();
    return;
}

const server = http.createServer((request, response) => {
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
            responseJSONGet(response, 200, { message: "response success!" });
        }

        else if (request.method === 'HEAD') {
            responseJSONHead(response, 200, { message: "response success!" });
        }
    }

    else if (path === '/notReal') {
        if (request.method === 'GET') {
            responseJSONGet(response, 404, { message: "response success!" });
        }

        else if (request.method === 'HEAD') {
            responseJSONHead(response, 404, { message: "response success!" });
        }
    }

    else if (request.method === 'POST' && path === '/addUser') {
        let name;
        let age;

        if (!name || !age) {
            responseJSONGet(response, 404, { message: "no name or age read" });
        }

        else if (!users[name]) {
            users[name] = { name, age };
            responseJSONGet(response, 201, { message: "created new user" });
        }

        else {
            users[name].age = age;
            responseJSONHead(response, 201, { message: "updated age" });
        }
    }

    else {
        responseJSONHead(response, 404, { message: "error 404: page not found" });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});