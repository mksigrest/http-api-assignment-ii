const http = require('http');
const url = require('url');

const clientStyle = require('./clientStyle.js');
const getHead = require('./getHead.js');
const post = require('./post.js');

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

    if (pathName === '/' || pathName === '/client.html' || pathName === '/style.css') {
        clientStyle.baseSwitch(pathName, request, response);
        return;
    }

    else if (pathName === '/getUsers' || pathName === '/notReal') {
        getHead.ghSwitch(pathName, users, request, response);
        return;
    }
    
    else if (request.method === 'POST' && pathName === '/addUser') {
        post.postSwitch(pathName, request, response);
        return;
    }

    else {
        resJSON(response, 404, { message: "The page you are looking for was not found.", id: "notFound" });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});