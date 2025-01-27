import express from 'express';
import { createUser, getUsers } from '../controllers/user.controller.js';
import multer from 'multer';

const userRouter= express.Router()
const upload = multer({ dest: "uploads/" });

userRouter.route('/').get(getUsers)
userRouter.route('/').post(upload.array("images", 10),createUser)

export default userRouter;