import 'dotenv/config'
import express from 'express'
import userRoute from './routes/userRoute.js'
import errorHandler from './middleware/errorHandler.js'
import noteRoute from './routes/noteRoute.js'
import cors from 'cors'


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


app.use('/api/user',userRoute)
app.use('/notes',noteRoute)

app.use(errorHandler)

app.listen(port , () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})