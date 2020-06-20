const path = require('path')
const express = require('express')
const videoStream = require('video-stream')
const Record = require("./DBUtil.js").Record // the DB util
const app = express()
const port = 3000 // the port of your backend
const video_names = ['test', 'test2']
app.use(express.static(path.join(__dirname, 'public')));
// cors, for 
var cors = require('cors');
app.use(cors({
  origin:['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization']
}));
// JSON middle ware
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// welcome console log
app.get('/', function(req, res, next) {
  var html = fs.readFileSync('./views/index.html')
  res.write(html);
  res.end();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// video-stream route
app.get('/video/:filename', videoStream({ dir: path.resolve(__dirname) + '/video' }))
app.get('/audio/:filename', videoStream({ dir: path.resolve(__dirname) + '/audio' }))
// return available videos
app.get('/available_videos', (req, res) =>{
  res.json({video_names:video_names})
})
// upload results
app.post('/upload_result', (req, res) =>{
  console.log(req.body)
  let {video_name, indicator, actions, timestamp, rand} = req.body
  record_text = {
    video_name:video_name,
    indicator:indicator,
    actions:actions,
    timestamp:timestamp,
    rand:rand
  }
  Record.create(record_text).then(result =>{
    res.json({status:0, msg:'ok'})
  }).catch(e =>{
    res.json({status:1, msg:'nok'})
  })
})
// images path
app.get('/public/images/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
})
// port
app.listen(port, () => {
  console.log(`Listening on port 3000`)
})