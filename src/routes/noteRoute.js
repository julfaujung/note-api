import express from 'express'
import { createNote, getNote } from '../controllers/noteController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const noteRoute = express.Router()

noteRoute.post('/' , authMiddleware, createNote)
noteRoute.get('/' , authMiddleware, getNote)


export default noteRoute