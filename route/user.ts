import * as Express from "express";
import {getUser,deleteUser,createUser,updateUser} from '../controllers'
const router =Express.Router()
//get user
router.get('/:userID',getUser)
//create User
router.post('/create',createUser)
//delete user
router.delete('/:userID',deleteUser)
//update user
router.put('/update',updateUser)

export default router