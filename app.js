const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require("cors")


const user = require("./routers/User.routes.js")

const app = express()
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/User', user)
// GET method route
app.get('/', (req, res) => {
    console.log('aaaaaaa')
    res.send('GET request to the homepage')
})

app.post('/addCard', async (req, res) => {
    try {
        const candidate = await User.findOne({name: req.body?.name, password: req.body.password}) 
        candidate.cards = req.body.cards
        await candidate.save()  
    } catch (e) {
        console.log(e.message)
    }
})
console.log(process.env.MONGO)
const start = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO}`)
        app.listen(5000, () => {
            console.log('SERVER RUNING')
        })
    } catch (e) {
        console.log(e.message)
    }
}




start()




