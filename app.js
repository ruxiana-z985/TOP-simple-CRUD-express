const express = require('express')
const app = express();

const path = require('path')

require('dotenv').config()
const {userRouter} = require('./routes/userRouting');

app.set('views',path.join(__dirname,'view'))
app.set('view engine','ejs')

app.use('/user{s}',userRouter)
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'landingPage.html'))
})


const PORT = process.env.PORT || 8080
app.listen(PORT,(err)=>{
    if(err){
        console.log(`a server listening error: ${err}`)
        res.status(500).send('<h1>Server Error</h1>')
    }
    console.log(`listening on port: ${PORT}`)
})