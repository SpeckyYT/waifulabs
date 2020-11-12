const fetch = require('node-fetch');

const protocolURL = 'https://';
const baseURL = "api.waifulabs.com";

module.exports = (endpoint, data) => 
    fetch(`${protocolURL}${baseURL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(resp => resp.json());
