<template>
  <section class="slider-left-content  costum--margin" v-for="serviceData in servicesDetails" :key="serviceData.id">
    <div class="slider-container d-flex">
      <div class="slider-img-content">
        <div class="slider-img-content__inner">
          <swiper
            :slides-per-view="1"  :space-between="20" :pagination="{ clickable: true,  }">
              <swiper-slide v-for="image in serviceData.images" :key="image.id">
                 <div class="swiper-slider-main-img">
                      <img :src="image.image.full_size" :alt="serviceData.title" :title="serviceData.title" />
                 </div>
              </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="side-text">
        <div class="slider-text-left__inner">
          <h2 :class="setDynamicLanguageFontToHeader">{{serviceData.title}}</h2>
          <p  :class="setDynamicLanguageFont" v-html="serviceData.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import {mapGetters, mapActions} from "vuex"
/* swiper slider imports */
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([A11y, Autoplay, Pagination]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    ...mapActions("services", ["RecieveServicesAPI"]),
    getServices(){
       this.RecieveServicesAPI()
    },
  },

  computed:{
     ...mapGetters("services", ["servicesDetails"]),
     ...mapGetters(["translateLanguage"]),

     setDynamicLanguageFont(){
      return{
         'bpg-nateli-reg': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'larrseit-thin-italic': this.translateLanguage === "en",
        }
     },

    setDynamicLanguageFontToHeader(){
      return{
         'bpg-rioni-regular': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'calson-medium': this.translateLanguage === "en",
        }
     }

  },

  created(){
    this.getServices()
  }


};
</script>


<style lang="scss" >

.costum--margin{
  margin-top: 140px;
}



.slider-left-content:nth-child(2n){
  .d-flex{
    display: flex;
    flex-direction: row-reverse;
      .side-text{
      position: relative;
      right: -116px;
      z-index: 99;
        .slider-text-left__inner{
        border-left: 1px solid #56D9D4;
        max-height: 500px;
        overflow: auto;
      }
    }
  }
}

.slider-left-content:nth-child(odd){
  .d-flex{
    display: flex;
    flex-direction: row;
    .side-text{
      position: relative;
      left: -116px;
      z-index: 99;
      .slider-text-left__inner{
        border-right: 1px solid #56D9D4;
        max-height: 500px;
        overflow: auto;
      }
    }
  }
}
.slider-img-content{
  flex: 0 0 70%;
  max-width: 70%;
}

 .slider-text-left__inner::-webkit-scrollbar {
    width: 5px;
}

 .slider-text-left__inner::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgb(255, 255, 255); 
    border-radius: 10px;
}

.slider-text-left__inner::-webkit-scrollbar-thumb {
    border-radius: 9px;
    -webkit-box-shadow: inset 0 0 5px #56D9D4; 
}

.side-text{
  flex: 0 0 35%;
  max-width: 35%;
  transform: translate(0%, 13%);
}

.swiper-slider-main-img{
  height: 700px;
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.slider-text-left__inner{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    padding: 51px 37px 70px 37px;
    min-height: 250px;
    p{
      line-height: 24px;
      font-size: 18px;
      text-align: left;
      color: #464646;
      display: -webkit-box;
    -webkit-line-clamp: 18;
    -webkit-box-orient: vertical;
     overflow: hidden;
     text-overflow: ellipsis;
    }  

    h2{
        font-size: 30px;
        padding-bottom: 70px;
        color: #464646;
        display: -webkit-box;
        line-height: 28px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}



@media(max-width:1600px){
  .swiper-slider-main-img{
    height: 590px;
  }

  .slider-text-left__inner h2 {
    padding-bottom: 30px;
    font-size: 25px;
}
.slider-text-left__inner[data-v-3d2af73e] {
    padding: 37px 37px 38px 37px;
}

.slider-text-left__inner p{
  font-size: 16px;
}

.side-text{
    transform: translate(0%, 9%);
}
}

@media(max-width:991px){
  .slider-left-content:nth-child(2n) .d-flex{
    flex-wrap: wrap;
  }
  .slider-img-content{
    flex: 0 0 100%;
    max-width: 100%;
}

.slider-left-content:nth-child(2n) .d-flex .side-text {
    position: unset;
    right: unset;
    z-index:99;
}

.side-text{
  flex: 0 0 100%;
  max-width: 100%;
}

.slider-left-content:nth-child(odd) .d-flex{
  flex-wrap: wrap;
  .side-text{
    position: unset;
    right: unset;
    z-index:99;
  }
}

.side-text{
  transform: translate(0%, -27%);
}

.slider-text-left__inner p{
  -webkit-line-clamp: unset;
}

.side-text{
  transform: translate(0%, -16%);
}

}

@media(max-width:576px){
  .swiper-slider-main-img{
    height: 350px;
}

.slider-left-content:nth-child(2n) .d-flex .side-text .slider-text-left__inner{
    max-width: 90%;
    left: 8%;
    position: relative;
    max-height: unset;
    overflow: hidden;
}

.slider-left-content:nth-child(odd) .d-flex .side-text .slider-text-left__inner{
    max-width: 90%;
    left: 8%;
    position: relative;
    max-height: unset;
   overflow: hidden;
}


.slider-text-left__inner h2{
  padding-bottom: 15px;
  font-size: 20px;
}

.side-text{
  transform: translate(0%, -16%);
}

.slider-text-left__inner p{
  font-size: 13px;
}

.slider-text-left__inner{
  padding: 18px 13px 29px 16px;
}

.slider-left-content:nth-child(odd) .d-flex .side-text{
  
}

.slider-left-content:nth-child(2n) .d-flex .side-text{

}


.costum--margin{
  margin-top: 60px;
}
}

.slider-img-content__inner{
  .swiper-container{
    .swiper-pagination{
      .swiper-pagination-bullet-active{
        background-color: #FFFFFF !important;
        width: 16px !important;
        border-radius: 20px;
      }
      .swiper-pagination-bullet{
        background-color: #FFFFFF !important;
        opacity: 1;
      }
    }
  }
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 10px;
    left: 0;
    width: 100%;
}

.swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 300ms opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;
}
.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #000;
    opacity: 0.2;
}

.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 4px;
}

.swiper-pagination-clickable .swiper-pagination-bullet {
    cursor: pointer;
}
</style>