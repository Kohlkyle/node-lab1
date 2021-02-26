'use strict'

// require the Express module
const express = require('express')

const routes = require('./routes')

// require the cors module
const cors = require('cors')
// creates an instance of express server
const app = express()

// Enable Cross Origin Resource Sharing so this api can be used form web apps on other domains

app.use(cors())

// allow POST and Put requests to use JSON bodies
app.use(express.json())

// use the router object(and all the defined routes)
app.use('/', routes)

// define a port
const port = 3000
// run the server
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
