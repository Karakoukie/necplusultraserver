const crypto = require('crypto');

/**
 * Class to generate a token with the Advanced Encryption Standard algorithm (AES).
 */
class Tokenizer {
    #key;
    #iv;
    #secret;

    /**
     * Create tokenizer object to encode/decode token(s) with keys
     */
    constructor() {
        this.#key = crypto.randomBytes(32);
        this.#iv = crypto.randomBytes(16);
        this.#secret = crypto.randomBytes(8).toString("hex");
    }

    /**
     * Generate a token
     * @param {string} username 
     * @param {string} secret 
     * @param {number} expiry 
     */
    createToken(username, secret=this.#secret, expiry = Date.now() + 3.6e+6) {
        return this.encryptToken(`${username}.${secret}.${expiry}`);
    }

    /**
     * Read a received token
     * @param {string} token 
     */
    readToken(token) {
        const decrypted = this.decryptToken(token);
        const splited = decrypted.split('.');

        if (splited.length !== 3) {
            return null;
        }

        return {
            username: splited[0],
            secret: splited[1],
            expiry: Number.parseInt(splited[2])
        };
    }

    /**
     * Compare secret
     * @param {string} received 
     * @param {string} known 
     * @returns {boolean}
     */
    validateSecret(received, known = this.#secret) {
        return received === known;
    }

    /**
     * Valide expiry date of a token
     * @param {number} expiry 
     */
    validateExpiry(expiry) {
        const availableDuration = expiry - Date.now();
        return availableDuration > 0.0;
    }

    /**
     * Encode a token
     * @param {string} token 
     */
    encryptToken(token) {
        // Create an AES cipher with PKCS7 padding
        const cipher = crypto.createCipheriv('aes-256-cbc', this.#key, this.#iv);

        // Encrypt the token and get the ciphertext
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Return the encrypted token
        return encrypted;
    }

    /**
     * Decode a token
     * @param {string} encryptedToken 
     */
    decryptToken(encryptedToken) {
        // Create an AES decipher with PKCS7 padding
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.#key, this.#iv);

        // Decrypt the encrypted token and get the plaintext
        let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // Return the decrypted token
        return decrypted;
    }
}

module.exports = { Tokenizer };