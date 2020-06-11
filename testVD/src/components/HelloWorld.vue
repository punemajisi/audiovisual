<template>
  <div>
    <el-container>
      <el-header style="height:120px;">Audiovisual Integration</el-header>
      <el-container>
        <el-aside width="40%">
          <el-row>
            <el-col>
              <el-button icon="el-icon-video-play" circle @click="play">Play</el-button>
              <el-button icon="el-icon-video-pause" circle @click="pause">Pause</el-button>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="10">Video Ahead Times</el-col>
              <el-col :span="12"><el-slider @change="pTimeChange" v-model="ptime" show-input :format-tooltip="formatTooltip"></el-slider></el-col>
          </el-row>
          <el-row>
              <el-col :span="10">Video lag time(s)</el-col>
              <el-col :span="12"><el-slider @change="mTimeChange" v-model="mtime" show-input :format-tooltip="formatTooltip"></el-slider></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button type="success" @click="click_good_integration">Good Integration</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="warning" @click="click_bad_integration">Bad Integration</el-button>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <video id= 'video'>
            <source :src="video_src">
          </video>
          <audio id= 'audio'>
            <source :src='audio_src'>
          </audio>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {getVideos} from '../../api/api';
import {uploadResult } from '../../api/api';
export default {
  name: 'HelloWorld',
  data(){
      return {
        cur_video:null,
        video_src:'http://localhost:3000/video/test.mp4',
        audio_src:'http://localhost:3000/audio/test.mp3',
        video_src_base:'http://localhost:3000/video/',
        audio_src_base:'http://localhost:3000/audio/',
        ptime: 0,
        mtime:0 ,
        form:{
          indicator: null, // 0 indicate bad, 1 indicate good
        },
        action_list:[],
        video_list: null

      }
  },
  created(){
    var rand = Math.random() * 3;
    var mod = Math.floor(Math.random() * 10); 
    mod = mod%2;
    this.rand = rand
    this.mod = mod
  },
  mounted(){
    this.video = document.getElementById('video');
    this.audio = document.getElementById('audio');
    if(this.mod){
      this.video.currentTime += this.rand;
    }else{
      this.audio.currentTime += this.rand;
    }
    this.getvideos()
  },
  methods:{
    pTimeChange(){
      let pt = this.ptime / 100
      this.video.currentTime !== this.video.duration ? this.video.currentTime += pt : 1; 
      this.action_list.push(`Video Ahead Time Change, with value ${pt} s`)
      this.$message({
          message: `Video Ahead Time Change, with value ${pt} s`,
          type: 'success'
      });
    },
    mTimeChange(){
      let mt = this.mtime / 100
      this.video.currentTime !== this.video.duration ? this.video.currentTime -= mt : 1; 
      this.action_list.push(`Video lag Time Change, with value ${mt} s`)
      this.$message({
          message: `Video lag Time Change, with value ${mt} s`,
          type: 'success'
      });
    },
    // set video audio urls
    setUrls(){
      this.video_src = this.video_src_base + `${this.cur_video}.mp4`
      this.audio_src = this.audio_src_base + `${this.cur_video}.mp3`
    },
    // get all available videos
    getvideos(){
      let params = null
      getVideos(params).then(res =>{
        this.video_list = res.data.video_names
        this.cur_video = this.video_list[0]
        // console.log(this.cur_video)
        this.setUrls()
        console.log('get available videos')
      })
    },
    // upload final result
    upload_result(){
      let params = this.form
      uploadResult(params).then(res =>{
        console.log(res)
      })
    },
    play(){
      if(this.video.paused && this.audio.paused){
				video.play();
        audio.play();
        this.action_list.push('Play')
      }
      console.log("click play")
    },
    pause(){
      this.video.pause();
      this.audio.pause();
      this.action_list.push('Pause')
      console.log("click pause")
    },
    // click good integration
    click_good_integration(){
      this.form.indicator = 1
      this.$notify({
          title: 'Success',
          message: 'Your Response has been uploaded, Thank you!',
          type: 'success'
      })
      this.upload_result()
      console.log("good integration")
    },
    // click bad response
    click_bad_integration(){
      this.form.indicator = 0
      this.$notify({
          title: 'Success',
          message: 'Your Response has been uploaded, Thank you!',
          type: 'success'
      })
      this.upload_result()
      console.log("bad integration")
    },
    // format the slider
    formatTooltip(val) {
        return val / 100;
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 20px;
    font-size: 10ex;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>