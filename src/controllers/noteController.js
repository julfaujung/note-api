import prisma from "../config/database.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createNote = asyncHandler(async(req, res) => {
    const {title, content} = req.body

    const note = await prisma.note.create({
        data : {
            title,
            content,
            userId : req.userId
        }
    })

    res.json({
        succes: true,
        data: note
    })
})


export const getNote = asyncHandler(async(req, res) => {
    const note = await prisma.note.findMany({
        where: {
            userId : req.userId
        },
    })

    res.json({
        succes : true,
        data : note
    })
})