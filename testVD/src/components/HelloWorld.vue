<template>
  <div style="display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;">
    <audio id= 'audio' preload="auto">
      <source :src='audio_src'>
    </audio>
    <el-container>
      <el-header style="height:10%;"><center>Audiovisual Integration </center></el-header>
      <el-main>
        <el-row type='flex' justify="space-between">
          <el-col :span="20">
            <video preload="auto" id= 'video' >
              <source :src="video_src">
            </video>
          </el-col>
          <el-col style="margin-left:10px" :span="10">
              <div class="title-1">Video List</div>
              <div style="overflow-y: scroll; height: 600px">
                <el-card v-for="(item, idx) in video_list" v-bind:key="idx"  shadow="hover">
                <el-row>
                  <el-col :span="10">
                    <el-image
                    style="width: 100%; height: 100%"
                    :src="image_base + `${item}.png`"
                    fit></el-image>
                  </el-col>
                  <el-col :span="10">
                    <div style="padding: 14px;">
                      <span>{{item}}</span>
                      <div class="bottom clearfix">
                        <el-button type="text" @click="changeVideo(item)" class="button">View This Video</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                </el-card>
              </div>
              
          </el-col>
        </el-row>
        <el-row type='flex' justify="space-between">
          <el-col style="margin-left:10px">
            <el-row  type='flex'  justify="center">
              <el-col :span="10">
                <el-button icon="el-icon-video-play" circle @click="play">Play</el-button>
              </el-col>
              <el-col :span="10">
                <el-button icon="el-icon-video-pause" circle @click="pause">Pause</el-button>            
              </el-col>
            </el-row>
            <el-row type='flex' justify="center">
              <el-col :span='8'>
              Change audio timeline for your integration
                </el-col>
              <el-col :span='8'>
              <el-slider @change="pTimeChange" v-model="ptime" :format-tooltip="formatTooltip" show-input></el-slider>
              </el-col>
              </el-row>         
            <el-row type='flex'  justify="center">
              <el-col :span="6">
                Response:
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="click_good_integration">Good Integration</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" @click="click_bad_integration">Bad Integration</el-button>
              </el-col>
              </el-row>
            </el-col>
          <el-col style="margin-left:10px" :span="12">
              <el-input type="textarea" disabled :rows="8" 
              placeholder="Your Operation will be shown here" v-model="op_text">
              </el-input>
           </el-col>
        </el-row>     
      </el-main>
      <el-footer style="height:30%">
          <el-row type='flex' justify="space-between" style="font-size:1ex; align-items:center;">
             <!-- <el-col :span="8">
              <div>
                Video lag time(s)
              </div>
              <div>
                <el-slider @change="mTimeChange" v-model="mtime"  :format-tooltip="formatTooltip"></el-slider>
              </div>
            </el-col>  -->
          </el-row>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
import {getVideos} from '../../api/api';
import {uploadResult} from '../../api/api';
export default {
  name: 'HelloWorld',
  data(){
      return {
        test_val:2,
        cur_video:null,
        video_src:'http://localhost:3000/video/test.mp4',
        audio_src:'http://localhost:3000/audio/test.mp3',
        video_src_base:'',
        audio_src_base:'',
        image_base:'',
        l_ptime:0,
        l_mtime:0,
        ptime: 0,
        mtime:0 ,
        form:{}, // send value
        action_list:[],
        video_list: null,
        op_text:'',

      }
  },
  created(){
    //. init base
    this.base = 'http://localhost:3000/' // for dev mode
    //this.base = '' // for build
    this.video_src_base = this.base + 'video/'
    this.audio_src_base = this.base + 'audio/'
    this.image_base = this.base + 'public/images/'

    var rand = Math.random() * 3;
    var mod = Math.floor(Math.random() * 10); 
    mod = mod%2;
    this.rand = rand
    this.mod = mod
  },
  mounted(){
    this.getvideos()
    this.getVAndA()
    if(this.mod){
      this.video.currentTime += this.rand;
    }else{
      this.audio.currentTime += this.rand;
    }
  },
  methods:{
    // get video element and audio element
    getVAndA(){
      this.video = document.getElementById('video')
      this.audio = document.getElementById('audio')
    },
    // change video
    changeVideo(item){
      this.cur_video = item
      this.setUrls()
      this.getVAndA()
      // clean action list
      this.action_list = []
      console.log(item)
    },
    // trigger the p time change
    pTimeChange(){
      let pt = this.ptime / 100 - this.l_ptime
      this.l_ptime = this.ptime / 100
      // the action, contains current time, operation moving
      let action_info =  `${this.video.currentTime}/${pt}`
      this.video.currentTime !== this.video.duration ? this.video.currentTime += pt : 1; 
      pt = pt.toFixed(2)
      let info = `Video Ahead, with value ${pt} s`
      this.action_list.push(action_info) // store in db

      this.op_text =  this.op_text + info + '\n'
      this.$message({
          message: info,
          type: 'success'
      });
    },
    // trigger the lag time change
    mTimeChange(){
      let mt = this.mtime / 100 - this.l_mtime
      this.l_mtime = this.mtime / 100
      let action_info =  `${this.video.currentTime}/${mt}`
      this.video.currentTime !== this.video.duration ? this.video.currentTime -= mt : 1; 
      pt = pt.toFixed(2)
      let info = `Video Backward, with value ${mt} s`
      this.action_list.push(action_info) // store in db
      this.op_text =  this.op_text + info + '\n'
      this.$message({
          message: info,
          type: 'success'
      });
    },
    // reset video audio urls
    setUrls(){
      this.video_src = this.video_src_base + `${this.cur_video}.mp4`
      this.audio_src = this.audio_src_base + `${this.cur_video}.mp3`

      this.video.src = this.video_src
      this.audio.src = this.audio_src
    },
    // get all available videos
    getvideos(){
      let params = null
      getVideos(params).then(res =>{
        this.video_list = res.data.video_names
        this.cur_video = this.video_list[0]
        // console.log(this.cur_video)
        this.setUrls()
        console.log(this.video_list)
      })
    },
    // upload final result
    upload_result(){
      this.pause()
      let params = this.form
      var timestamp = (new Date()).valueOf();
      params['video_name'] = this.cur_video
      params['actions'] = this.action_list.join('|')
      params['timestamp'] = timestamp
      params['rand'] = this.rand
      console.log(params)
      uploadResult(params).then(res =>{
        let {status} = res
        if(status == 0){
          this.$notify({
          title: 'Success',
          message: 'Your Response has been uploaded, Thank you!',
          type: 'success'
        })
        }else{
          this.$notify.error({
            title: 'Fail',
            message: 'Something Wrong in uploading, please check.',
            type: 'success'
          })
        }
      })
    },
    // play and pause the video and audio
    play(){
      if(this.video.paused && this.audio.paused){
				video.play();
        audio.play();
      }
      console.log("click play")
    },
    pause(){
      this.video.pause();
      this.audio.pause();
      console.log("click pause")
    },
    // reposne: integration
    click_good_integration(){
      this.form['indicator'] = 1
      this.upload_result()
      console.log("good integration")
    },
    click_bad_integration(){
      this.form['indicator'] = 0
      this.upload_result()
      console.log("bad integration")
    },
    // format the slider
    formatTooltip(val) {
      // raw inetval [0 - 100] 1 as step new [-x - x]
      val =(val - 50) / 100 * 6;
      val = val.toFixed(2);
        return val;
    }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .outer{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #ebf7a8;
    color: #333;
    text-align: left;
    padding: 20px;
    font-size: 5ex;
  }
  
  .el-aside {
    background-color: #dfe9f5;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #f0f1f2;
    color: #333;
    text-align: center;
    height:40%;
  }
  
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }


  .title-1 {
    background: #2B6695;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0 0 0 1px #5F5A4B, 1px 1px 6px 1px rgba(10, 10, 0, 0.5);
    color: #FFFFFF;
    font-family:"微软雅黑", "宋体", "黑体", Arial;
    font-size: 18px;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
    margin: 18px 0 !important;
    padding: 8px 0 5px 5px;
    text-shadow: 2px 2px 3px #222222;
}


</style>