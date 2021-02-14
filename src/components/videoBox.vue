<template>
<transition>
  <div class="dynamic-video-box" :class="{'scale-out-br':VideoIsVisiable}">
    <div class="video-box__inner">
      <div class="img-close" @click="hideVideo">
        <img :src="require(`@/assets/img/iconclose.svg`)" />
      </div>
        <div class="playpause">
          <input type="checkbox" value="None" id="playpause" name="check"  @click="playVideo"/>
          <label for="playpause" :class="{'buttonVisibility': giveOpactiy}"></label>
        </div>
      <video controls  :class="{'resize-video':VideoIsVisiable}" id="video">
        <source :src="require(`@/assets/img/test.mp4`)" />
      </video>
    </div>
  </div>
</transition>
</template>

<script>
import {mapGetters} from "vuex"
export default {

  components:{
  
  },

    data(){
        return{
            giveOpactiy:false,
        }
    },

    methods:{
        hideVideo(){
           this.$store.commit("CheckvideoVisibility", true);
           var video = document.getElementById("video");
           video.pause();
        },
        
        /* play video costum btn */
        playVideo(){
        var video = document.getElementById("video")
          if (video.paused || video.ended) {
             video.play();
        } else {
         video.pause();
          }

          this.giveOpactiy = !this.giveOpactiy
        }
    },

    computed:{
      ...mapGetters(['VideoIsVisiable'])
    }
};
</script>


<style lang="scss" scoped>
.dynamic-video-box {
  position: absolute;
  z-index: 1111;
  top: 53%;
  right: 0;
  transform: translate(-13%, -50%);
}

.video-box__inner {
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 14px;
  position: relative;
}

.buttonVisibility{
  opacity: 0;
  transition: 0.3s;
}

.img-close img {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 3px;
  top: -28px;
  z-index: 1111;
  cursor: pointer;
 filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(211deg) brightness(109%) contrast(101%);
}

video {
  width: 990px;
  position: relative;
}

.resize-video{
  width: 480px;
  transition: 0.5s;
}


/* animation  */


.scale-out-br {
	-webkit-animation: scale-out-br 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: scale-out-br 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out-br {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 88% 88%;
    transform-origin: 88% 88%;
    opacity: 1;
  }
}
@keyframes scale-out-br {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100%  100% ;
    transform-origin: 100%  100% ;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 88% 88%;
    transform-origin: 88% 88%;
    opacity: 1;
  }
}

.playpause label {
  display: block;
  box-sizing: border-box;
  width: 0;
  height: 74px;
  border-color: transparent transparent transparent #FFFFFF;
  transition: 100ms all ease;
  cursor: pointer;
  border-style: solid;
  border-width: 37px 0 37px 60px;
  opacity: 0.5;

}

.playpause{
    position: absolute;
    z-index: 1111;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.playpause input[type="checkbox"] {
  visibility: hidden;
}
.playpause input[type="checkbox"]:checked + label {
  border-style: double;
  border-width: 0 0 0 60px;
}

@media (max-width: 1700px) {
  video {
    width: 550px;
  }
  .dynamic-video-box {
  top: 48%;
}

.video-box__inner {
  padding: 10px;
}

.img-close img{
  top: -19px;
  right: -1px;
  height: 12px;
}

.playpause{
    transform: translate(-50%, 80%);
    top: unset;
}

.dynamic-video-box {
  transform: translate(-26%, -50%);
}

}

@media (max-width: 1300px) {
  video {
    max-width: 680px;
    width: 100%;
  }
}


@media(max-width:768px){
  .dynamic-video-box{
      display: none;
  }

}

</style>


