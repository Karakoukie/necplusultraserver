const { Parser } = require("../parser");
const fs = require("fs");

class JsonParser extends Parser {
    /**
     * @param {string} path 
     */
    parse(path) {
        let json;

        try {
            const data = fs.readFileSync(path);
            json = JSON.parse(data);
        } catch(error) {
            throw error;
        }

        if (!json) {
            throw new Error("Null pointer exception");
        }
    }
}