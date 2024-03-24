const http = require('http');

class Job {
    /**
     * @param {any} data
     * @param {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} res 
     */
    execute(data, res) {
        throw new Error('Not implemented');
    }
}

module.exports = { Job };