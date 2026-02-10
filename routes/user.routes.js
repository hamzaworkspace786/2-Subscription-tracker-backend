import { Router } from 'express';

// import authorize from '../middlewares/auth.middleware.js'
// import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', (req, res) => {res.send("GET All Users")})
userRouter.get('/:id', (req, res) => {res.send("GET User Details")})
userRouter.post('/', (req, res) => {res.send("Create New User")})
userRouter.put('/:id', (req, res) => {res.send("Update User")})
userRouter.delete('/:id', (req, res) => {res.send("Delete User")})

export default userRouter;