const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { VideoJob } = require('./jobs/videoJob');
const { Tokenizer } = require('./Tokenizer');

const FOLDERS = {
    public: [path.join(__dirname, "./../public")],
    private: [path.join(__dirname, "./../private"), 'C:/Users/trist/Videos'],
    admin: [path.join(__dirname, "./../admin")]
}

const CREDENTIALS = {
    private: {
        secret: "1234",
    },
    admin: {
        secret: "azerty"
    }
}

let TOKENIZER = new Tokenizer();

// Create server
const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        return console.error(" POST request")
    }

    // Parser l'url
    const parsedUrl = url.parse(req.url, true);

    // Search the file in public folders
    let file;
    let needAuth = false;
    let needAdminAccess = false;

    if (parsedUrl.pathname && parsedUrl.pathname !== "/") {
        for (const folder of FOLDERS.public) {
            const filePath = path.join(folder, parsedUrl.pathname);

            try {
                fs.accessSync(filePath, fs.constants.F_OK);
                file = filePath;
                break;
            } catch (error) {
                // console.warn(`${filePath} not found`);
            }
        }

        if (!file) {
            for (const folder of FOLDERS.private) {
                const filePath = path.join(folder, parsedUrl.pathname);

                try {
                    fs.accessSync(filePath, fs.constants.F_OK);
                    file = filePath;
                    needAuth = true;
                    break;
                } catch (error) {
                    // console.warn(`${filePath} not found`);
                }
            }
        }

        if (!file) {
            for (const folder of FOLDERS.admin) {
                const filePath = path.join(folder, parsedUrl.pathname);

                try {
                    fs.accessSync(filePath, fs.constants.F_OK);
                    file = filePath;
                    needAuth = true;
                    needAdminAccess = true;
                    break;
                } catch (error) {
                    // console.warn(`${filePath} not found`);
                }
            }
        }
    }

    // Authentication
    let isAuth = false;
    const token = parsedUrl.query.token;

    if (token) {
        try {
            const readedToken = TOKENIZER.readToken(token);
            console.log("token:", readedToken)

            if (readedToken) {
                if (readedToken.username === "admin" || (!needAdminAccess && readedToken.username === "private")) {
                    if (TOKENIZER.validateExpiry(readedToken.expiry)) {
                        if (TOKENIZER.validateSecret(readedToken.secret)) {
                            isAuth = true;
                        } else {
                            console.warn("Bad secret");
                        }
                    } else {
                        console.warn("Token expired");
                    }
                } else {
                    console.warn("Bad username");
                }
            }
        } catch (error) {
            console.error(`Token can't be decrypted`);
        }
    }

    if (!isAuth) {
        const secret = parsedUrl.query.secret;
        let generatedToken = undefined;

        if (secret) {
            if (secret === CREDENTIALS.admin.secret) {
                generatedToken = TOKENIZER.createToken("admin");
            }

            if (!needAdminAccess && !generatedToken) {
                if (secret === CREDENTIALS.private.secret) {
                    generatedToken = TOKENIZER.createToken("private");
                }
            }
        }

        if (generatedToken) {
            res.statusCode = 302;
            res.setHeader('Location', `${parsedUrl.pathname}?token=${generatedToken}`);
            res.end();
            return;
        }
    }

    if (needAuth && !isAuth) {
        // Return unauthorized
        console.log(`Unauthorized`);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Connection</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <h1>Who TF are u?</h1>
                <form method="get">
                    <span>
                        <label for="secret">What's the secret?</label>
                        <input type="password" name="secret" id="secret">
                    </span>
            
                    <input type="submit" value="Connect">
                </form>
            </body>
            </html>
        `);
        return;
    }

    // If no one corresponding file founded
    if (!file) {
        switch (parsedUrl.pathname) {
            default:
                // Redirect to the 404 page
                console.log(`No ${parsedUrl.pathname} file founded, redirect to home page...`);
                res.statusCode = 302;
                res.setHeader('Location', "/404.md");
                res.end();
                return;
        }
    }

    // Filter with extension
    const split = file.split('.');
    const extension = split[split.length - 1] || "";

    try {
        switch (extension) {
            case "css":
                return fs.readFile(file, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    // Envoyer le contenu du fichier en tant que réponse
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                    return;
                });

            case "mp4":
            case "mkv":
            case "avi":
                return new VideoJob().execute({
                    filePath: file,
                    ext: extension
                }, res);

            case "png":
            case "jpg":
            case "jpeg":
                // Envoyer le contenu du fichier en tant que réponse
                res.writeHead(200, { 'Content-Type': 'image/' + extension });
                fs.createReadStream(file).pipe(res);
                return;

            case "html":
                return fs.readFile(file, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    // Envoyer le contenu du fichier en tant que réponse
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                    return;
                });

            case "md":
                return fs.readFile(file, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    // Envoyer le contenu du fichier en tant que réponse
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
                        <!doctype html>
                        <html>
                        <head>
                            <meta charset="utf-8"/>
                            <title>Nec Plus Ultra</title>
                            <link rel="stylesheet" href="style.css" />
                        </head>
                        <body>
                            <div id="content"></div>
                            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                            <script>
                                document.getElementById('content').innerHTML =
                                marked.parse(\`${data}\`);
                            </script>
                            <script>
                            document.addEventListener('DOMContentLoaded', function () {
                                const anchorElements = document.getElementsByTagName('a');

                                for (let index = 0; index < anchorElements.length; index++) {
                                    const anchorElement = anchorElements.item(index);

                                    anchorElement.addEventListener('click', function (event) {
                                        // Prevent the default behavior of the anchor element
                                        event.preventDefault();

                                        // Get the current URL
                                        const currentUrl = window.location.href;

                                        // Get the URL of the destination
                                        const destinationUrl = anchorElement.getAttribute('href');

                                        // Append the current GET parameters to the destination URL
                                        const updatedUrl = destinationUrl + (currentUrl.includes('?') ? currentUrl.substring(currentUrl.indexOf('?')) : '');

                                        // Navigate to the updated URL
                                        window.location.href = updatedUrl;
                                    });
                                }
                            });
                            </script>
                        </body>
                        </html>
                        `
                    );
                    return;
                });
        }
    } catch (error) {
        console.error(error);
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 ${parsedUrl.pathname} not found`);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    setInterval(() => {
        console.log("Recreate a new TOKENIZER");
        TOKENIZER = new Tokenizer();
    }, 8.64e+7);
});