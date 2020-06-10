const path = require('path')
const express = require('express')
const videoStream = require('video-stream')

const app = express()

// video-stream route
app.get('/video/:filename', videoStream({ dir: path.resolve(__dirname) + '/video' }))

// Your normal routes
app.get('/', (req, res) => {
  res.send('Hello World')
  res.end()
})

app.listen(3000, () => {
  console.log(`Listening on port 3000`)
})