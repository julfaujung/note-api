import prisma from "../config/database.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateTokens from "../utils/jwt.js"


export const register = asyncHandler(async(req, res)=> {
    const {email, name, password} = req.body

    const existing = await prisma.user.findUnique({
        where: {email}
    })

    if(existing){
        throw new AppError("Email already registered", 400)
        
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data : {
            email,
            name,
            password:hashedPassword
        }
    })

    res.json({
        succes:true,
        message:"User created"
    })
})



export const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where : {email}
    })

    if(!user){
        throw new AppError("User not found",404)
    }

    const match = await bcrypt.compare(
        password,
        user.password
    )

    if(!match){
        throw new AppError("Invalid password")
    }

    const token = generateTokens(user.id)

    res.json({
        succes: true,
        token
    })
})

export const getProfil = asyncHandler(async(req, res) => {
    const user = await prisma.user.findUnique({
        where:{id: req.userId},
        select:{
            id:true,
            email:true,
            name:true
        }
    })

    res.json({
        succes:true,
        data:user
    })
})