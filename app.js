import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import router from './routes/web.js'

import connectDB from './config/connectDB.js'

const app = express()

const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL

//database connection
connectDB(DATABASE_URL)

//json
app.use(express.json())

//CORS Policy
app.use(cors())

//req.body
app.use(express.urlencoded({extended:false}))

app.use( express.static("public") );

//set view engine
app.set('view engine', 'ejs')

app.use(router)

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})