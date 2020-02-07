const jwt = require('jsonwebtoken')
const User = require('../db/models/users')





const auth = async (req, res, next) => {
    try {
        // store the header requst in const
        const token = req.header('Authorization').replace('Bearer ', "")
        // decode the token and check wather is valid or no
        const decode = jwt.verify(token, 'Mr.robot')
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })


        if (!user) {
            throw new Error
        }


        req.user = user
        console.log(decode)
        next()
    } catch (e) {
        res.status(401).send({ error: 'Plase authonticate' })
    }


}

module.exports = auth