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
              <el-col :span="12"><el-slider v-model="value1" show-input></el-slider></el-col>
          </el-row>
              
          <el-row>
              <el-col :span="10">Video lag time(s)</el-col>
              <el-col :span="12"><el-slider v-model="value2" show-input></el-slider></el-col>
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
            <source src="http://localhost:3000/video/test.mp4">
          </video>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
      return {
        value1: 0,
        value2:0,
      }
  },
  methods:{
    play(){
      console.log("click play")
    },
    pause(){
      console.log("click pause")
    },
    // click good integration
    click_good_integration(){
      console.log("good integration")
    },
    // click bad response
    click_bad_integration(){
      console.log("bad integration")
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