const resJSON = (response, statusCode, object) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(object));
    return;
};

const postSwitch = (request, response) => {
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
}

module.exports = { postSwitch };