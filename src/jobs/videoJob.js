const http = require('http');
const { Job } = require("../job");
const fs = require("fs");

class VideoJob extends Job {
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

        const range = res.req.headers.range || "0";
        const videoSize = fs.statSync(data.filePath).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;

        let headers;

        switch(data.ext) {
            case "mp4":
                headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                    "Charset": "UTF-8"
                };
                break;
            case "mkv":
                headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/webm",
                    "Charset": "UTF-8"
                };
                break;
            case "avi":
                headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                    "Charset": "UTF-8"
                };
                break;
            default:
                return;
        }

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(data.filePath, { start, end });
        videoStream.pipe(res, {
            end: true
        });
    }
}

module.exports = { VideoJob };