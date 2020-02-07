
const express = require('express')
const Task = require('../db/models/tasks')
const mongoose = require('mongoose')


const router = new express.Router()








router.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save()
        res.status(200).send(task)
    } catch (err) {
        res.status(500).send(err)

    }

    // const task = new Task(req.body)
    // task.save().then(() => {

    //     res.status(201).send(task)
    //     console.log(task)

    // }).catch((err) => {
    //     res.status(400).send(err)
    // })

})
// find all tasks 
router.get('/tasks', async (req, res) => {

    try {
        const result = await Task.find({})
        res.send(result)
    } catch (err) {
        res.status(500).send(err)

    }




    // User.find({}).then((result) => {
    //     res.status(302).send(result)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})





// find task by id 
router.get('/tasks/:id', async (req, res) => {


    const _id = req.params.id

    if (_id.length != 24) {
        return res.status(406).send()
    }
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        res.status(302).send(task)
    } catch (err) {
        res.status(500).send()
    }








    // Task.findById(_id).then((task) => {



    //     if (!task) {
    //         res.status(404).send()
    //         return console.log(404)

    //     }

    //     res.status(302).send(task)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })



})


// delte t5ask by id 

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(406).send()
    }
    try {
        const del = await Task.findByIdAndDelete(_id)
        if (!del) {
            return res.status(404).send()
        }
        res.send(del)

    } catch (err) {
        res.status(500).send(err)
    }


})


router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(406).send({ err: "invalid id" })
    }

    // geting updte requst form the user 
    const updates = Object.keys(req.body)
    // init the update that is allowed to do 
    const alldUpdate = ['descrption', 'complated']
    // cheacking the clint requst is the update is valid and return a boolian
    const isValid = updates.every((update) => alldUpdate.includes(update))

    if (!isValid) {
        return res.status(400).send({ err: "invalid update" })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // change the code to new syntax to make a middle ware for password 

        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (err) {
        res.status(400).send(err)

    }
})

module.exports = router