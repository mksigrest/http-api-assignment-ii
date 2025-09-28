const ghSwitch = (pathName, request, response) => {
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