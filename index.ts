import * as Express from "express";
import * as mysql from 'mysql'
import {CreateBody} from './constant'

let app = Express()
let port = 5050;
// root get method
app.get("/",(req,res)=>{
    res.send("you got the server")
})


app.listen(port,()=>console.log("server is running on the port 5050"))
app.use(Express.json())
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


// create user
app.post('/user/create',async (req,res)=>{
    let userData :CreateBody = req.body
    let sqlQuery = 'INSERT INTO user SET ?'
    await con.query(sqlQuery, userData, (err) => {
        if(!err){
            res.send("user inserted successfully")
        }else{
            res.json({statusCode:400,message:"error occured while inserting data"})
        }
      });
})
// get user
app.get('/user/:userID',async (req,res)=>{
    let userID:Number = req.params.userID
    let sqlQuery = 'SELECT * FROM user WHERE PersonId =?'
    await con.query(sqlQuery, userID, (err,result) => {
        if(!err){
            res.json({statusCode:200,body:result})
        }else{
            res.json({statusCode:400,message:"error occured while fetching data"})
        }
      });
})
// delete user
app.delete('/user/:userID',async (req,res)=>{
    let userID:Number = req.params.userID
    let sqlQuery = 'DELETE FROM user WHERE PersonID = ?;'
    await con.query(sqlQuery, userID, (err) => {
        if(!err){
            res.send("user deleted successfully")
        }else{
            res.json({statusCode:400,message:"error occured while deleting data"})
        }
      });
})
// update user
app.put('/user/update',async (req,res)=>{
    let userData:any = [req.body.name,req.body.dob,req.body.PersonID]
    let sqlQuery = 'UPDATE user SET name = ?, dob = ? WHERE PersonID =?;'
    await con.query(sqlQuery, userData, (err) => {
        if(!err){
            res.send("user updated successfully")
        }else{
            res.json({statusCode:400,message:"error occured while updating data"})
        }
      });
})