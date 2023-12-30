const express = require('express')
const connectToMongose = require('./config')
const app = express()
const cros = require("cors")
const PORT = 4000
connectToMongose()

app.use(cros())
app.use(express.json())

app.use('/api/user', require('./Router/User'))
app.use('/api/blog', require('./Router/Blogs'))
app.use('/blogs', require('./Router/Fetchblogs'))

app.listen(PORT, () => {
    console.log(`Backend server started at http://localhost:${PORT}`);
})



