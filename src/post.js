const resJSON = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(object));
    return;
};

const postSwitch = (pathName, request, response) => {

}

module.exports = { postSwitch };