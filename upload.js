const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5500;

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

app.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            
            res.send('Error uploading file');
        } else {
           res.send('File uploaded successfully');
        }
        res.end();
    });
  });

 
 
// app.delete('/delete/:filename', (req, res) => {
//     const filename = req.params.filename;

//     // Delete the file from the server
//     // You might want to add error handling here
//     const filePath = path.join(__dirname, 'uploads', filename);
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error deleting file');
//         } else {
//             res.send('File deleted successfully');
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on success`);
});
