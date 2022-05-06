const nodemailer = require('nodemailer');
const express = require("express")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andranikbaldryan55@gmail.com',
        pass: 'lrtqdykvvpqgtkpu'
    }
});

const mailOptions = {
    from: 'andranikbaldryan55@gmail.com',
    to: 'andranikbaldryan55@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p><button>accept</button>'
};

const User = require("../models/user")

const router = express.Router()

// http://localhost:5000/User/newUser 
router.post('/newUser', async (req, res) => {
    try {
        console.log(req.body)
        const candidate = await User.findOne({ name: req.body?.name })
        if (!candidate) {
            const user = await User.create(req.body)
            user.save()
            console.log('yeeeeeeeeeh')
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    } catch (e) {
        console.log(e.message)
    }
})
// http://localhost:5000/User/getUser
router.post('/getUser', async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const user = await User.findOne(data)
        console.log(user)
        res.send(user)
    } catch (e) {
        console.log(e.message)
    }
})




module.exports = router;