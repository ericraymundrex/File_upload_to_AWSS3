const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');


const app = express();

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'awsresumeforinfinte',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, uuid()+"-"+ext);
        }
    })
});

app.get("/",(req,res)=>{
    res.render("index");
})
app.post('/upload', upload.single('userSentfile'), (req, res) => {
    res.send("Done");
});

app.listen(3000,()=>{
    console.log("SERVER STARTED");
});