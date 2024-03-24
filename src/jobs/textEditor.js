
const http = require('http');
const { Job } = require("../job");
const fs = require("fs");

class TextEditor extends Job {
    /**
     * @param {{ filePath: string, ext: string }} data
     * @param {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} res 
     */
    execute(data, res) {
        if (!data ||  !res) {
            throw new Error("Null pointer exception");
        }

        if (!data.ext || !data.filePath) {
            throw new Error("Null pointer exception");
        }

        
    }
}

module.exports = { VideoJob };