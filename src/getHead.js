const resJSON = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(object));
    return;
};

const ghSwitch = (pathName, users, request, response) => {
    if (pathName === '/getUsers') {
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
            resJSON(response, 404, { message: "The page you are looking for was not found.", id: "notFound" });
        }

        //JSON error
        else if (request.method === 'HEAD') {
            resJSON(response, 404);
        }
    }
}

module.exports = { ghSwitch };