import * as mysql from 'mysql'
import { CreateBody } from '../constant'
// creating db connection
var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"USER",
    connectionLimit:10
})
export const getUser= async (req,res)=>{
    let userID:Number = req.params.userID
    let sqlQuery = 'SELECT * FROM user WHERE PersonId =?'
    await db.query(sqlQuery, userID, (err,result) => {
        if(!err){
            res.json({statusCode:200,body:result})
        }else{
            res.json({statusCode:400,message:"error occured while fetching data"})
        }
      });
}

export const deleteUser=async(req,res)=>{
        let userID:Number = req.params.userID
    let sqlQuery = 'DELETE FROM user WHERE PersonID = ?;'
    await db.query(sqlQuery, userID, (err) => {
        if(!err){
            res.send("user deleted successfully")
        }else{
            res.json({statusCode:400,message:"error occured while deleting data"})
        }
      });
}

export const createUser=async (req,res)=>{
    let userData :CreateBody = req?.body
    let sqlQuery = 'INSERT INTO user SET ?'
    await db.query(sqlQuery, userData, (err) => {
        if(!err){
            res.send("user inserted successfully")
        }else{
            res.json({statusCode:400,message:"error occured while inserting data"})
        }
      });
}

export const updateUser =async(req,res)=>{
        let userData:any = [req?.body?.name,req?.body?.dob,req?.body?.PersonID]
    let sqlQuery = 'UPDATE user SET name = ?, dob = ? WHERE PersonID =?;'
    await db.query(sqlQuery, userData, (err) => {
        if(!err){
            res.send("user updated successfully")
        }else{
            res.json({statusCode:400,message:"error occured while updating data"})
        }
    })
}