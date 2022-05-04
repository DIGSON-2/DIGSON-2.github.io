const {Schema, model} = require("mongoose")

const User = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    cards: {
        type:[{fields: Array}],
        "default": [ { fields: [ 'a', 'b', 'c' ]}]
    }
})

module.exports = model('User', User)