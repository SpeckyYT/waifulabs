const fetch = require('node-fetch');
const url = require('url');

module.exports = (endpoint, data) => 
    fetch(
        url.format(
            {
                protocol: 'https',
                host: 'api.waifulabs.com',
                pathname: endpoint
            }
        ),
        {
            method: 'POST',
            body: JSON.stringify(data)
        }
    )
    .then(resp => resp.json());
