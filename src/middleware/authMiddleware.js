import jwt from 'jsonwebtoken'


const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization


    if(!authHeader){
        return res.status(401).json({
            message: "No tokens"
        })
    }

    const token = authHeader.split(" ")[1]


    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) 

        req.userId = decoded.userId

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid tokens"
        })
    }
}

export default authMiddleware