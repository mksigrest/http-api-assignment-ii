const fs = require('fs');
const path = require('path');

const client = path.join(__dirname, '..', 'client', 'client.html');
const style = path.join(__dirname, '..', 'client', 'style.css');

let clientHtml = fs.readFileSync(client);
let styleCss = fs.readFileSync(style);

const baseSwitch = (pathName, request, response) => {
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
}

module.exports = { baseSwitch };