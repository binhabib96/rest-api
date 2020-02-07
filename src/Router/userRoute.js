const express = require('express')
const User = require('../db/models/users')
const auth = require('../middleWare/auth')




const router = new express.Router()



router.post('/user', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.genToken()

        res.status(201).send({ user, token })
        console.log(user)
    } catch (err) {
        res.status(500).send(err)
        console.log(err)

    }




    // const user = new User(req.body)
    // user.save().then(() => {
    //     res.send(user)
    //     console.log(user)

    // }).catch((err) => {

    //     res.status(400).send(err)


    // })
})



// user login route 

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCred(req.body.email, req.body.password)
        const token = await user.genToken()
        res.send({ user, token })
    } catch (err) {

        res.status(400).send()

    }



})


//logout 

router.post('/logout', auth, async (req, res) => {


    try {

   

        req.user.tokens = []

        await req.user.save()
        res.status(200).send()






    } catch (err) {

        res.status(500).send(err)
        console.log(err)

    }
})


router.post('/logout/all', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })


        // req.user.tokens.forEach((token)=>{
        //     if(token.token!==req.token){

        //         req.user.tokens.push(token.token)


        //     }
        // })

       await req.user.tokens.save()
        res.status(200).send()
    } catch (err) {

        res.status(500).send()

    }
})

// find all users 

router.get('/users', auth, async (req, res) => {
    try {
        const result = await User.find({})
        res.send(result)


    } catch (err) {
        res.status(500).send(err)
    }
})


//user profile 
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// find users by id 

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(406).send({ err: 'invalid id' })
    }

    const user = await User.findById(_id)



    if (!user) {
        return res.status(404).send()
    }




    res.status(302).send(user)
})


//delete user 

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(406).send()

    }

    try {
        const del = await User.findByIdAndDelete(_id)
        if (!del) {
            return res.status(404).send()

        }

        res.status(200).send(del)
    } catch (err) {
        res.status(500).send()
    }
})


router.patch('/users/:id', async (req, res) => {

    const _id = req.params.id

    if (_id.length != 24) {
        return res.status(406).send()

    }
    const updates = Object.keys(req.body)

    const allwoedUpdate = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allwoedUpdate.includes(update))
    if (!isValid) {
        return res.status(400).send({ err: 'invaid id' })
    }
    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send()
    }
})













module.exports = router
