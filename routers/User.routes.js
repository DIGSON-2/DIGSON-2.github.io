const express = require("express")


const User = require("../models/user")

const router = express.Router()

// /User/newUser
router.post('/newUser', async (req, res) => {
    try {
        const candidate = await User.findOne({name: req.body?.name}) 
        if (!candidate) {
            const user = await User.create(req.body)
            user.save()
            console.log('User was created')
        }
    } catch (e) {
        console.log(e.message)
    }
})

module.exports = router;