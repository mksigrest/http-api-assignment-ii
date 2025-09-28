const http = require('http');
const url = require('url');

const clientStyle = require('./clientStyle.js');

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

    clientStyle.baseSwitch(pathName, request, response);

    else if (pathName === '/getUsers') {
        if (request.method === 'GET') {
            resJSON(response, 200, users);
        }

        else if (request.method === 'HEAD') {
            resJSON(response, 200);
        }
    }

    else if (pathName === '/notReal') {
        //JSON error
        if (request.method === 'GET') {
            resJSON(response, 404, {message: "The page you are looking for was not found.", id: "notFound" });
        }

        //JSON error
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

            //JSON error
            if (!name || !age) {
                resJSON(response, 400, { message: 'Name and age are required', id: 'addUserMissingParams' });
            }

            else if (!users[name]) {
                users[name] = { name, age: age };
                resJSON(response, 201, { message: 'Created Successfully' });
            }

            else {
                users[name].age = age;
                resJSON(response, 204);
            }
        });
        return;
    }

    else {
        resJSON(response, 404, { message: "The page you are looking for was not found.", id: "notFound" });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});