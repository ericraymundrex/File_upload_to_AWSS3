const express=require('express');
const multer=require('multer');
const uuid=require('uuid').v4;
 
const app=express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(3000, () => {
    console.log("SERVER STARTED");
});