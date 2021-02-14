<template>
<div class="modal"  @focus="handleFocus"  tabindex="0"  :class="{'isVisiableModal':galeryModalIsVisible}" :id="id" >
  <!-- Modal content -->
  <div class="modal-content" id="contentModal" >
    <div class="close-modal--btn" @click="closeGalleryModal"> <img :src="require(`@/assets/img/x-btn.svg`)" /></div>
        <swiper
        :slides-per-view="1"
        :space-between="20"
        navigation
      >
        <swiper-slide @click="closeGalleryModal" v-for="image in images" :key="image.id">
            <div class="modal-slider-image">
               <img  :src="image.image.full_size" />
            </div>
        </swiper-slide>
      </swiper>
  </div>
</div>
</template>


<script>
import {mapGetters} from "vuex";
/* swiper slider imports */
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { A11y, Autoplay, Pagination,Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import 'swiper/components/navigation/navigation.scss';
SwiperCore.use([A11y, Autoplay, Pagination,Navigation]);
export default {
    components:{
    Swiper,
    SwiperSlide,
    },


    props:["images", "id"],
    computed:{
        ...mapGetters(['galeryModalIsVisible'])
    },

    methods:{
        closeGalleryModal(){
          this.$router.push('/')
          this.$store.commit("CheckgaleryModalVisibility", false)
        },

        //@desc hide modal on focus outside & clean path
        handleFocus() {
            this.$store.commit("CheckgaleryModalVisibility", false)
            this.$router.push('/')
        },

    }
}
</script>


<style lang="scss">

.close-modal--btn{
    position: absolute;
    right: 0;
    top: 8px;
    z-index: 1111111111;
    cursor: pointer;
}
/* The Modal (background) */
.modal {
  outline: 0;
  border: 0;
  position: fixed; 
  z-index: 99999; /* Sit on top */
  padding-top: 100px; 
  left: 0;
  top: -120%;
  padding-top: 100px;
  width: 100%; 
  height: 100%; 
  overflow: auto; /* Enable scroll if needed */
  background-color: #fbfbfbbd;
  transition: 0.3s;
}

.modal-slider-image{
  height: 800px;
  img{
      height: 100%;
      width: 100%;
      object-fit:contain;
  }
}

.isVisiableModal{
    top: 0;
    transition: 0.3s;
}

/* Modal Content */
.modal-content {
  margin: auto;
  max-width: 1260px;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.modal-content  .swiper-button-prev {
  background-image: url("../assets/img/prev.png") !important;
  height: 30px !important;
  width: 30px !important;
}

.modal-content  .swiper-button-prev::after{
  display: none;
}

.modal-content .swiper-button-next {
  background-image: url("../assets/img/next.png") !important;
  height: 30px;
  width: 30px;
  right: 0;
}

.modal-content  .swiper-button-next::after{
  display: none;
}

.modal-content .swiper-button-next {
    background-size: cover;
    right: 2%;
    height: 26px;
    width: 15px;
}

.modal-content .swiper-button-prev {
    background-size: cover;
    left: 2% !important;
    height: 26px !important;
    width: 21px !important;
}

.modal-content .swiper-button-prev, .swiper-button-next {
    position: absolute;
    top: 50%;
    width: calc(var(--swiper-navigation-size) / 44 * 27);
    height: var(--swiper-navigation-size);
    margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--swiper-navigation-color, var(--swiper-theme-color));
}

.modal-content .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    left: 10px;
    right: auto;
}

.modal-content .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
    opacity: 0;
    cursor: auto;
    pointer-events: none;
}

 .modal-content .swiper-button-prev:after, .swiper-button-next:after {
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    text-transform: none !important;
    letter-spacing: 0;
    text-transform: none;
    font-variant: initial;
    line-height: 1;
}

.modal-content .swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after {
    content: "prev";
}



@media(max-width:1600px){
   .modal-content {
  transform: translate(-50%, 0%);
} 

.modal-content .swiper-button-next {
    background-size: cover;
    right: 18%;
    height: 26px;
    width: 15px;
}

.modal-slider-image{
  height: 800px;
  display: flex;
  justify-content: center;
  img{
      height: 100%;
      width: 100%;
      max-width: 850px;
      object-fit: cover;
  }
}

.modal-content .swiper-button-prev {
    background-size: cover;
    left: 18% !important;
    height: 26px !important;
    width: 21px !important;
}
.close-modal--btn {
    right: 204px;
    top: -22px;
}

.modal-slider-image{
  height: 500px;
}

}


@media(max-width:768px){
  .modal-content {
  max-width: 580px;
}

.modal-slider-image{
  height: 200px;
}

.close-modal--btn {
    top: -19px;
}


.close-modal--btn {
    right: 0;
}
}


@media(max-width:576px){


  .modal-content {
  max-width: 338px;
}


.modal-content .swiper-button-next{
     background-size: cover;
    right: 3px;
    height: 13px;
    width: 14px;
}

.modal-content .swiper-button-prev{
    background-size: cover;
    left: 1%!important;
    height: 13px !important;
    width: 14px !important;
}
}

</style>
