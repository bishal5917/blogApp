const express = require('express')
const multer=require('multer')
var bodyParser = require('body-parser');
const path=require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));  //if i get an empty array as 
// response, so used bodyparser
app.use(bodyParser.json());

// MAKING IMAGES FOLDER PUBLIC TO USE
app.use('/images',express.static(path.join(__dirname,'/images')))

//cors policy
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//imports for routes
const authroute = require('./routes/auth')
const userroute = require('./routes/user')
const postroute = require('./routes/post')
const catroute = require('./routes/category')

// const dotenv = require('dotenv')
const Mongoose = require('mongoose')

MONGO_URL = "mongodb://localhost:27017/blogApp"
// dotenv.config()
// mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
Mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("Mongodb connected") }).catch((err) => console.log(err))

//routes for router
app.use('/api/auth', authroute)
app.use('/api/users', userroute)
app.use('/api/posts', postroute)
app.use('/api/categories', catroute)

app.use(express.json())

//code for file upload using multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage})

app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")

})

//running the app
app.listen('5000', () => {
    console.log("Backend server is running")
})