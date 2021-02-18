<template>
<div id="home-wrapper">
<!-- main slider -->
  <div class="container-main-slider">
    <div class="container-main-slider__inner" id="sliderBox">
      <swiper
        :slides-per-view="1"
        :space-between="20"
        :pagination="{ clickable: true}"
        :autoplay="{ delay: 4000,  disableOnInteraction: true}"
        effect="fade"
      >
        <swiper-slide v-for="sliderData in mainSliderDetails" :key="sliderData.id">
          <!-- video box -->
          <video-box></video-box>
          <div class="slider-box">
            <a :href="sliderData.link">
            <div class="slider-box__inner">
                <img :src="sliderData.picture.full_size" />
              <div class="overlay-test"></div>
            </div>
            </a>
            <div class="slider-text-wrapper">
              <div class="slider-main-title">
                <div class="slider-main-title__inner">
                  <p :class="addLanguageFontTitle">{{sliderData.title}}</p>
                </div>
              </div>
              <div class="slider-sub-title">
                <div class="slider-sub-title__inner">
                  <p :class="addLanguageFontTitle">{{sliderData.sub_title}}</p>
                </div>
              </div>
            </div>
            <div class="video-icon" v-show="VideoIsVisiable" @click="showVideo">
              <img :src="require(`@/assets/img/video2.png`)" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>


  <room-types></room-types>
  <div id="services" class="services-wrapper">
     <main-services></main-services>
  </div>
  <about-us></about-us>
  <blog-section></blog-section>
 </div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";
import videoBox from "@/components/videoBox";
import roomTypes from "@/components/roomTypes";
import aboutUs from "@/components/aboutUs";
import blogSection from "@/components/blogSection";
import mainServices from "@/components/mainServices"
/* swiper slider imports */
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Pagination, EffectFade } from "swiper";
import "swiper/swiper.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([A11y, Autoplay, Pagination, EffectFade]);
export default {
  data() {
    return {
      fixedheader: false,
      serviceData:[],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    videoBox,
    roomTypes,
    aboutUs,
    blogSection,
    mainServices
  },

  methods: {
    ...mapActions("mainSlider",["RecieveMainSliderAPI"]),

    getSliderData(){
       this.RecieveMainSliderAPI()
    },
    /* toggle between video box */
    showVideo() {
      this.$store.commit("CheckvideoVisibility", false);
      var video = document.getElementById("video");
      video.play();
    },
    
    /* show navbar after scroll down slider image */
    showNavbar() {
        const firstbox = document.getElementById("sliderBox");
        const navLinks = document.querySelectorAll(".nav-link > a");
        for (let i = 0; i < navLinks.length; i++) {
            if(window.scrollY >= firstbox.scrollHeight){
                 navLinks[i].classList.add("dynamiccolor")
                 this.$store.commit("textCallback", true);
            }
            else{
                 navLinks[i].classList.remove("dynamiccolor")
                 this.$store.commit("textCallback", false);
            }
           }
    },



  },

  computed: {
    ...mapGetters(["VideoIsVisiable", "translateLanguage"]),
    ...mapGetters("mainSlider",[ "mainSliderDetails"]),

    addLanguageFontTitle(){
       return{
         'bpg-rioni-regular': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'calson-medium': this.translateLanguage === "en"
       }
     },
  },

  created() {
    window.addEventListener("scroll", this.showNavbar);
    this.getSliderData()
  },

  unmounted(){
    window.removeEventListener("scroll", this.showNavbar)
  }

  
};
</script>




<style lang="scss" >


body{
  counter-reset: my-sec-counter;
}

.services-wrapper{
  max-width: 1900px;
  width: 100%;
  margin: 0 auto;
}

.container-main-slider {
  width: 100%;
  max-width: 100%;
  position: relative;
}

.container-main-slider__inner .swiper-pagination-bullet-active {
    opacity: 1;
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    padding: 1px;
    left: -1px;
    position: relative;
    letter-spacing: 0px;
    color: #FFFFFF;
    text-shadow: 0px 3px 6px #0000004D;
}

.container-main-slider__inner .swiper-pagination-bullet{
 border-right: 2px solid snow;
 height: 40px;
 background-color: #ffffff;
 border-radius: unset;
 letter-spacing: 0px;
 width: 0px;
color: #FFFFFF;
text-shadow: 0px 3px 6px #0000004D;
 
}
 .container-main-slider__inner .swiper-pagination-bullet:after {
  counter-increment: my-sec-counter;
  content: "0" counter(my-sec-counter) "";
    font-size: 30px ;
    width: 35px ;
    height: 40px !important;
    line-height: 40px !important;
    right: 28px;
    position: relative;
    top: -1px;
     font-family: "mishafi-gold";
}

.container-main-slider__inner .swiper-pagination-fraction, .container-main-slider__inner .swiper-pagination-custom, .container-main-slider__inner .swiper-container-horizontal > .swiper-pagination-bullets {
     bottom: unset; 
     left: unset;
     width: unset; 
    display: flex;
    flex-direction: column;
    top: 50%;
    transform: translateY(-50%);
     right: 25px;
}

.container-main-slider__inner .swiper-pagination-bullet{
  opacity: 0.7;
}
 .container-main-slider__inner .swiper-pagination-bullet-active{
  opacity: 1;
}


.container-main-slider__inner {
  position: relative;
}

.slider-box__inner {
  position: relative;
  img {
    width: 100%;
    max-height: 1080px;
    object-fit: cover;
  }
}

.slider-box__inner {
  .overlay-test{
     position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #5C5959;
    opacity: 0.5;
  }

}

.slider-box {
  position: relative;
}

.slider-text-wrapper {
  position: absolute;
  bottom: 100px;
  left: 50px;
}

.slider-main-title__inner {
  width: 100%;
  p {
    text-align: left;
    letter-spacing: 0px;
    color: #ffffff;
    font-size: 35px;
    text-shadow: 0px 3px 6px #0000004d;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.slider-sub-title__inner {
  max-width: 1000px;
  width: 100%;
  margin-top: 22px;
  p {
    text-align: left;
    letter-spacing: 0px;
    color: #ffffff;
    font-size: 22px;
    text-shadow: 0px 3px 6px #0000004d;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.video-icon {
  img {
    position: absolute;
    bottom: 124px;
    right: 50px;
    width: 63;
    cursor: pointer;
  }
}

.slider-box__inner {
  position: relative;
}

@media (max-width: 1600px) {
  .slider-text-wrapper {
    bottom: 50px;
  }
  
 .video-icon {
  img {
    bottom: 79px;
  }
}
  

  .slider-box__inner {
  img {
    max-height: 700px;
  }
}
}

@media (max-width: 1300px) {
  .slider-main-title__inner p {
    font-size: 25px;
  }

  .slider-sub-title__inner p {
    font-size: 17px;
  }
}

@media (max-width: 768px) {
  .slider-box__inner {
    height: 590px;
  }

  .slider-box__inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media(max-width:768px){
    .container-main-slider__inner .swiper-pagination-fraction, .container-main-slider__inner .swiper-pagination-custom, .container-main-slider__inner .swiper-container-horizontal > .swiper-pagination-bullets {
    top: 52%;
    right: 3px;
}

.container-main-slider__inner .swiper-pagination-bullet::after {
    font-size: 22px;
    width: 35px;
    right: 24px;
    top: -1px;
}

.container-main-slider__inner .swiper-pagination-bullet {
    border-right: 1px solid snow;
}

.container-main-slider__inner .swiper-pagination-bullet {

    height: 32px;
}
}

@media (max-width: 576px) {
  .slider-main-title__inner p {
    font-size: 20px;
}

.slider-sub-title__inner p{
    font-size: 13px;
}
  .slider-text-wrapper {
    top: 47%;
    left: 3%;
  }

  .slider-sub-title__inner {
    max-width: 300px;
    width: 100%;
    margin-top: 17px;
  }
  .slider-sub-title__inner p {
    -webkit-line-clamp: 4;
  }

.slider-box{
    height: 513px;
}


}


</style>