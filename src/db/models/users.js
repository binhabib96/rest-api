const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw Error('Age should be Postive')

            }
        }

    },

    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('email is invalid ')
            }

        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true,



    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]



})


//generate token 
userSchema.methods.genToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'Mr.robot')

    // store the token in the database and concat them with others arrys

    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

//finding by credinsials method 


userSchema.statics.findByCred = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {

        throw new Error('Unable to login')
    }

    const isMacth = await bcrypt.compare(password, user.password)
    if (!isMacth) {
        throw new Error('Unable to login ')
    }

    return user


}



//convert the password from a plane text to a hash 
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})
// create a model for user 
const User = mongoose.model('User', userSchema)
module.exports = User