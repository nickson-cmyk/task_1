import * as Express from "express";
import * as mysql from 'mysql'
import {CreateBody} from './constant'
import router from './route/user'

let app = Express()
let port = 5050;
// root get method
app.get("/",(req,res)=>{
    res.send("you got the server")
})
app.use(Express.json())
app.use('/user',router)


app.listen(port,()=>console.log("server is running on the port 5050"))
// creating db connection
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"USER",
    connectionLimit:10
})

con.connect((err)=>{
    if(err){
        console.log("error occured while connecting to the database",err)
    }else{
        console.log("DB connected successfully")
    }
})
