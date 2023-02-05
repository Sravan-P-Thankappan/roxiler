const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')
const productRoute = require('./route/product')

const connection = require('./config/db')

app.use(cors())
app.use(express.json())


//--------db connection-------------

connection()

app.use((req,res,next)=>{
     
    console.log(req.method ,req.path)
    next()
})

app.use('/product',productRoute)

app.listen(process.env.PORT,(er,data)=>{
     
    if(er) console.log(er.message)

    else console.log(`Server Started on ${process.env.PORT}`)
})