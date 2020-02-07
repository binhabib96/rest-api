const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./Router/userRoute')
const taskRouter = require('./Router/taskRoute')





const app = express()

const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('server runs on port ' + port)
})