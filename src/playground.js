require('./db/mongoose')
const Task = require('./db/models/tasks')


// const deleteByID = async (id) => {


//     const del = await Task.findByIdAndDelete(id)
//     const count = await Task.countDocuments({
//         complated: false
//     })

//     return count
// }

// deleteByID('5da73702a0e3d604e8eecd84').then((task) => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })


const updateByID = async (id) => {
    const upDate = await Task.findByIdAndUpdate(id, { complated: false })
    const count = await Task.countDocuments({
complated:true
    })

    return count 
}

updateByID('5da737800af2681864dab8d6').then((task)=>{
    console.log(task)
}).catch((err)=>{
    console.log(err)
})