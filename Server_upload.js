const express=require('express');
const multer=require('multer');
const uuid=require('uuid').v4;
 
const app=express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads');
    },
    filename:(req,file,callback)=>{
        const {originalname}= file; 
        callback(null,originalname);
    }
})
const upload=multer({storage})

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/upload",upload.single('userSentfile'),(req,res)=>{
    res.send("Done");
})

app.listen(3000, () => {
    console.log("SERVER STARTED");
});