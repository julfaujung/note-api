import express from 'express'
import { register, login, getProfil } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const userRoute = express.Router()


userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/profil', authMiddleware, getProfil)


export default userRoute