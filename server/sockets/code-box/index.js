const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

function codeBoxServe(app,port,fileType) {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        const parameters = socket.handshake.query;
        const filePath = decodeURIComponent(parameters.filePath);
        const fullPath = path.join(process.cwd(), 'demo', filePath, fileType);
        const dirPath = path.dirname(fullPath);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, '');
        }

        const sendFileContent = () => {
            fs.readFile(fullPath, 'utf8', (err, data) => {
                if (!err) {
                    socket.emit('fileContent', { code: 200, filePath, content: data });
                } else {
                    console.error('Read error:', err);
                    socket.emit('fileContent', { code: 500, message: 'Error reading file' });
                }
            });
        };

        sendFileContent();

        const checkAndSendFileContent = () => {
            let previousContent = '';
            return  () => {
                fs.readFile(fullPath, 'utf8', (err, currentContent) => {
                    if (err) {
                        console.error('Read error:', err);
                        socket.emit('fileContent', { code: 500, message: 'Error reading file' });
                        return;
                    }
                    if (currentContent !== previousContent) {
                        previousContent = currentContent;
                        sendFileContent(currentContent);
                    }
                });}
        };
        const sendFileContentThrottled = checkAndSendFileContent();

        fs.watch(fullPath, (event) => {
            if (event === 'change') {
                sendFileContentThrottled();
            }
        });


        socket.on('saveFile', (message) => {
            const { content } = message;
            fs.writeFile(fullPath, content, (err) => {
                if (err) {
                    console.error('Write error:', err);
                    socket.emit('fileContent', { code: 500, message: 'Error writing file' });
                } else {
                    console.log('File written successfully.');
                }
            });
        });
    });

    server.listen(port || 8080, () => {
        console.log(`${fileType} Server is running on http://0.0.0.0:${port || 8080}`);
    });
}

module.exports = { codeBoxServe};