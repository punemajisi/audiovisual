webpackJsonp([1],{NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("kV13"),o={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]};var a=i("C7Lr")({name:"App"},o,!1,function(t){i("xUdR")},null,null).exports,n=i("wUgx"),l=i("I29D"),r=i.n(l);let c="http://localhost:3000";var d={name:"HelloWorld",data:function(){return{test_val:2,cur_video:null,video_src:"http://localhost:3000/video/test.mp4",audio_src:"http://localhost:3000/audio/test.mp3",video_src_base:"",audio_src_base:"",image_base:"",l_ptime:0,l_mtime:0,ptime:50,mtime:0,form:{},action_list:[],video_list:null,op_text:""}},created:function(){this.base="",this.video_src_base=this.base+"video/",this.audio_src_base=this.base+"audio/",this.image_base=this.base+"public/images/";var t=3*Math.random(),e=Math.floor(10*Math.random());e%=2,this.rand=t,this.mod=e},mounted:function(){this.getvideos(),this.getVAndA(),this.mod?this.video.currentTime+=this.rand:this.audio.currentTime+=this.rand},methods:{getVAndA:function(){this.video=document.getElementById("video"),this.audio=document.getElementById("audio")},changeVideo:function(t){this.cur_video=t,this.setUrls(),this.getVAndA(),this.action_list=[],console.log(t)},pTimeChange:function(){var t=this.ptime/100-this.l_ptime;this.l_ptime=this.ptime/100;var e=this.video.currentTime+"/"+t;this.video.currentTime===this.video.duration||(this.video.currentTime+=t);var i="Video Ahead, with value "+(t=t.toFixed(2))+" s";this.action_list.push(e),this.op_text=this.op_text+i+"\n",this.$message({message:i,type:"success"})},mTimeChange:function(){var t=this.mtime/100-this.l_mtime;this.l_mtime=this.mtime/100;var e=this.video.currentTime+"/"+t;this.video.currentTime===this.video.duration||(this.video.currentTime-=t),pt=pt.toFixed(2);var i="Video Backward, with value "+t+" s";this.action_list.push(e),this.op_text=this.op_text+i+"\n",this.$message({message:i,type:"success"})},setUrls:function(){this.video_src=this.video_src_base+(this.cur_video+".mp4"),this.audio_src=this.audio_src_base+(this.cur_video+".mp3"),this.video.src=this.video_src,this.audio.src=this.audio_src},getvideos:function(){var t=this;(t=>r.a.get(`${c}/available_videos`,{params:t}))(null).then(function(e){t.video_list=e.data.video_names,t.cur_video=t.video_list[0],t.setUrls(),console.log(t.video_list)})},upload_result:function(){var t=this;this.pause();var e=this.form,i=(new Date).valueOf();e.video_name=this.cur_video,e.actions=this.action_list.join("|"),e.timestamp=i,e.rand=this.rand,console.log(e),(t=>r.a.post(`${c}/upload_result`,t).then(t=>t.data))(e).then(function(e){0==e.status?t.$notify({title:"Success",message:"Your Response has been uploaded, Thank you!",type:"success"}):t.$notify.error({title:"Fail",message:"Something Wrong in uploading, please check.",type:"success"})})},play:function(){this.video.paused&&this.audio.paused&&(video.play(),audio.play()),console.log("click play")},pause:function(){this.video.pause(),this.audio.pause(),console.log("click pause")},click_good_integration:function(){this.form.indicator=1,this.upload_result(),console.log("good integration")},click_bad_integration:function(){this.form.indicator=0,this.upload_result(),console.log("bad integration")},formatTooltip:function(t){return t=(t=(t-50)/100).toFixed(2)}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{display:"block",width:"100%","margin-left":"auto","margin-right":"auto"}},[i("audio",{attrs:{id:"audio",preload:"auto"}},[i("source",{attrs:{src:t.audio_src}})]),t._v(" "),i("el-container",[i("el-header",{staticStyle:{height:"10%"}},[i("center",[t._v("Audiovisual Integration ")])],1),t._v(" "),i("el-main",[i("el-row",{attrs:{type:"flex",justify:"space-between"}},[i("el-col",{attrs:{span:20}},[i("video",{attrs:{preload:"auto",id:"video"}},[i("source",{attrs:{src:t.video_src}})])]),t._v(" "),i("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:10}},[i("div",{staticClass:"title-1"},[t._v("Video List")]),t._v(" "),i("div",{staticStyle:{"overflow-y":"scroll",height:"600px"}},t._l(t.video_list,function(e,s){return i("el-card",{key:s,attrs:{shadow:"hover"}},[i("el-row",[i("el-col",{attrs:{span:10}},[i("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.image_base+e+".png",fit:""}})],1),t._v(" "),i("el-col",{attrs:{span:10}},[i("div",{staticStyle:{padding:"14px"}},[i("span",[t._v(t._s(e))]),t._v(" "),i("div",{staticClass:"bottom clearfix"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return t.changeVideo(e)}}},[t._v("View This Video")])],1)])])],1)],1)}),1)])],1)],1),t._v(" "),i("el-footer",{staticStyle:{height:"30%"}},[i("el-row",{staticStyle:{"font-size":"1ex","align-items":"center"},attrs:{type:"flex",justify:"space-between"}},[i("el-col",{attrs:{span:6}},[i("el-button",{attrs:{icon:"el-icon-video-play",circle:""},on:{click:t.play}},[t._v("Play")])],1),t._v(" "),i("el-col",{attrs:{span:6}},[i("el-button",{attrs:{icon:"el-icon-video-pause",circle:""},on:{click:t.pause}},[t._v("Pause")])],1),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",[t._v("\n              Change audio timeline for your integration\n            ")]),t._v(" "),i("div",[i("el-slider",{attrs:{"format-tooltip":t.formatTooltip},on:{change:t.pTimeChange},model:{value:t.ptime,callback:function(e){t.ptime=e},expression:"ptime"}})],1)])],1),t._v(" "),i("el-row",{staticStyle:{"font-size":"2ex"}},[i("el-col",{attrs:{span:4}},[t._v("\n            Response:\n          ")]),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-button",{attrs:{type:"success"},on:{click:t.click_good_integration}},[t._v("Good Integration")])],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-button",{attrs:{type:"warning"},on:{click:t.click_bad_integration}},[t._v("Bad Integration")])],1),t._v(" "),i("el-col",{attrs:{span:10}},[i("el-input",{attrs:{type:"textarea",disabled:"",rows:4,placeholder:"Your Operation will be shown here"},model:{value:t.op_text,callback:function(e){t.op_text=e},expression:"op_text"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var h=i("C7Lr")(d,u,!1,function(t){i("cUgq")},"data-v-7d83ebae",null).exports;s.default.use(n.a);var p=new n.a({routes:[{path:"/",name:"HelloWorld",component:h}]}),v=i("bQIR"),_=i.n(v);i("gFLX");s.default.config.productionTip=!1,s.default.use(_.a),new s.default({el:"#app",router:p,components:{App:a},template:"<App/>"})},cUgq:function(t,e){},gFLX:function(t,e){},xUdR:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.80acef7ba00495c32755.js.map