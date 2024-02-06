const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const PORT = 5500;

const server = http.createServer((req, res) => {
    // Log message when server starts listening
    console.log(`Server listening on port ${PORT}`);

    // Routing
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Home Page');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is About Page');
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Contact Page');
    } else if (req.url === '/file-write') {
        // Using fs.writeFile() to create a file and write text
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error writing file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('File written successfully');
            }
            res.end();
        });
        return; // To prevent further processing for this route
    } else if (req.url === '/upload-file') {
        // Using multer to handle file uploads
        // Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage }).single('file');

        upload(req, res, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error uploading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('File uploaded successfully');
            }
            res.end();
        });
        return; // To prevent further processing for this route
    } else {
        // Handle other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Page not found');
    }

    // End the response
    res.end();
});

server.listen(PORT);
console.log(`Server is running on success`);
