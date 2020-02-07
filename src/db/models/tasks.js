const mongoose = require('mongoose')
const validator = require('validator')






// /// create a model for tasks 

const Tasks = mongoose.model('Tasks', {
    descrption: {
        type: String,
    },
    complated: { type: Boolean }
})




module.exports=Tasks

