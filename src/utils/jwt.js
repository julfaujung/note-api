import jwt from 'jsonwebtoken'


const generateTokens = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
}

export default generateTokens