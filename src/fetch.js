const https = require('https');
const baseURL = "api.waifulabs.com";

module.exports = (endpoint, _data) => {
    const data = JSON.stringify(_data);
    return new Promise((res,rej) => {
        const cr = https.request({
            host: baseURL,
            path: endpoint,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, r => {
            if(Math.floor(r.statusCode/100) != 2) rej();
            let collected = '';
            r.on("data", c => {
                collected += c;
            });
            r.on("close", () => {
                res(JSON.parse(collected));
            });
        });
        cr.write(data);
        cr.end();
    })
}