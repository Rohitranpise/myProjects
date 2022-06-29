const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config();

//mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => console.log('mongodb is connected')).catch(err => console.log(err))

app.use(express.json())

//routes
app.use('/user', require("./routes/user"))

app.listen(8000, () => {
    console.log(`server is running...`)
})