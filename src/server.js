const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const client = path.join(__dirname, '..', 'client', 'client.html');
const style = path.join(__dirname, '..', 'client', 'style.css');

let clientHtml = fs.readFileSync(client);
let styleCss = fs.readFileSync(style);

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
    const pathName = parsedUrl.pathname;

    if (pathName === '/' || pathName === '/client.html') {
        response.writeHead(200, { 'Content-Type': 'text/html' });

        if (request.method === 'GET') {
            response.end(clientHtml);
        }

        else {
            response.end()
        }
    }

    else if (pathName === '/style.css') {
        response.writeHead(200, { 'Content-Type': 'text/css' });

        if (request.method === 'GET') {
            response.end(styleCss);
        }

        else {
            response.end();
        }
    }

    else if (pathName === '/getUsers') {
        if (request.method === 'GET') {
            resJSON(response, 200, users);
        }

        else if (request.method === 'HEAD') {
            resJSONHead(response, 200);
        }
    }

    else if (pathName === '/notReal') {
        if (request.method === 'GET') {
            resJSON(response, 404, users);
        }

        else if (request.method === 'HEAD') {
            resJSONHead(response, 404);
        }
    }

    else if (request.method === 'POST' && pathName === '/addUser') {
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