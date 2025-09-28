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
            resJSON(response, 200);
        }
    }

    else if (pathName === '/notReal') {
        if (request.method === 'GET') {
            resJSON(response, 404, {message: "The page you are looking for was not found.", id: "notFound" });
        }

        else if (request.method === 'HEAD') {
            resJSON(response, 404);
        }
    }

    else if (request.method === 'POST' && pathName === '/addUser') {
        
        let body = '';
        request.on('data', (chunk) => { body += chunk; });
        request.on('end', () => {

            let params = {};
            params = JSON.parse(body);

            const { name, age } = params;

            if (!name || !age) {
                resJSON(response, 400, { message: 'Name and age are required' });
            }

            else if (!users[name]) {
                users[name] = { name, age: age };
                resJSON(response, 201, { message: 'Created Successfully', id: 'created' });
            }

            else {
                users[name].age = age;
                resJSON(response, 204);
            }
        });
        return;
    }

    else {
        resJSON(response, 404);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});