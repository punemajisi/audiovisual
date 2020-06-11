const path = require('path')
const express = require('express')
const videoStream = require('video-stream')
// const Service = require("./DBUtil.js").Service
const app = express()
const video_names = ['test', 'test2']
app.use('/public',express.static('public'));
// cors, please annotate it in real application
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// video-stream route
app.get('/video/:filename', videoStream({ dir: path.resolve(__dirname) + '/video' }))
app.get('/audio/:filename', videoStream({ dir: path.resolve(__dirname) + '/audio' }))

app.get('/available_videos', (req, res) =>{
  res.json({video_names:video_names})
})
app.post('/upload_result', (req, res) =>{
  console.log(req.body)
  res.json({status:0, msg:'ok'})
})
// Your normal routes
app.post('/record', (req, res) => {
  res.send('Hello World')
  res.end()
})

app.listen(3000, () => {
  console.log(`Listening on port 3000`)
})