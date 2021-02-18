<template>
  <section class="container container--section" id="roomTypes">
    <div class="section-main-header">
      <p :class="addLanguageFontTitle">{{t('section-headers.room-types', {}, {locale:translateLanguage})}}</p>
    </div>
    <div class="room-types-row">
      <div class="content-box-main" v-for="roomtype in roomTypesMainDetails" :key="roomtype.id">
        <div class="room-types-content">
          <div class="room-types-img">
            <img :src="roomtype.primary_image.crop" />
          </div>
          <div class="room-types-box">
            <div class="room-types__inner">
              <div class="card-header"><p :class="addDynamicFontToBoxHeader">{{roomtype.title}}</p></div>
              <div class="room-types__details">
                <div class="divider"></div>
                <div class="detail-wrapper">
                  <div class="price">
                    <p><span :class="addLanguageFontToRoomTypes">{{t('section-headers.room-price',{},{locale:translateLanguage})}}</span>: <span>${{roomtype.price}}</span></p>
                  </div>
                  <div class="person-quantity">
                    <p><span :class="addLanguageFontToRoomTypes">{{t('section-headers.room-capacity',{},{locale:translateLanguage})}}</span>:<span>{{roomtype.human_capacity}}</span></p>
                  </div>
                </div>
              </div>
              <div class="room-type-description">
                <p class="description-article " :class="addDynamicFontToDescription" v-html="roomtype.description"></p>
                <div class="view-galery-btn">
                  <p  @click="showGaleryModal(roomtype.images)"><router-link :class="addLanguageFontToseeBtn" :to="{name:'roomtype', params:{roomtypeslug:roomtype.slug},  query: { roomprice:roomtype.price}}">{{t('section-headers.view-galery',{},{locale:translateLanguage})}}</router-link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  <teleport to="body">
    <galery-slider-modal  :images="modalData"></galery-slider-modal>
   </teleport>
    </div>
  </section>
</template>


<script>
import {useI18n} from 'vue-i18n'
import galerySliderModal from "../includes/galerySliderModal";
import {mapGetters, mapActions} from  "vuex"
export default {
  components:{
    galerySliderModal

  },
  
  setup(){
   const {t,locale} = useI18n();
   return {t,locale}
  },

  data(){
    return{
      modalData:null,
    }
  },
  methods:{
    ...mapActions("room",["RecieveRoomTypesAPI"]),
      showGaleryModal(modalSlides){
      this.modalData = modalSlides
      this.$store.commit("CheckgaleryModalVisibility", true)
    },

    getdata(){
      this.RecieveRoomTypesAPI()
    }

    },


  computed:{
    ...mapGetters("room",["roomTypesMainDetails"]),
     ...mapGetters(["translateLanguage"]),

     //@desc change font family depend on select dropdown value
     addLanguageFontTitle(){
       return{
         'geofont-arial-caps': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'eng-font-larrseit-light': this.translateLanguage === "en",

       }
     },

     addLanguageFontToRoomTypes(){
        return {
          'geofont-mtavruli': this.translateLanguage === "ka" || this.translateLanguage === "ru",
          'eng-larsseit-thin':this.translateLanguage === 'en'
        }
     },


     addLanguageFontToseeBtn(){
       return{
         'geofont-arial-regular': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'eng-font-larrseit-light':this.translateLanguage === "en",
       }
     },

     addDynamicFontToDescription(){
      return{
         'bpg-nateli-reg': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'larrseit-thin-italic':this.translateLanguage === "en",
       }
     },


     addDynamicFontToBoxHeader(){
        return{
         'bpg-rioni-regular': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'calson-medium':this.translateLanguage === "en",
       }
     }
  },

  created(){
    this.getdata()
  }
}

</script>


<style lang="scss" scoped>
.section-main-header {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  p {
    font-size: 30px;
    color: #464646;
    text-transform: uppercase;
  }
}
.room-types-row {
  display: flex;
  margin-top: 160px;
  flex-wrap: wrap;
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
 
}

.room-types-box {
  max-width: 627px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  min-height: 300px;
}


.room-types-content {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 60px;
  justify-content: flex-end;
}
.room-types__inner {
  padding: 31px 30px 29px 134px;
}

.price {
  padding-bottom: 11px;
  text-transform: uppercase;
  p{
    span:not(:first-child){
      font-family: "larsseit-medium";
      margin-left: 5px;
    }
  }
}

.person-quantity{
  text-transform: uppercase;
  p{
    span:not(:first-child){
      font-family: "larsseit-medium";
      margin-left: 5px;
    }
  }
}

.room-types__details {
  display: flex;
  align-items: center;
}

.card-header,
.room-types__details {
  padding-bottom: 36px;
}

.card-header {
  p {
    display: -webkit-box;
    line-height: 30px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    color: #464646;
    padding-left: 26px;
    max-height: 56px;

  }
}

.divider {
  height: 91px;
  width: 1px;
  margin-left: 65px;
  margin-right: 15px;
  background-color: #56d9d4;
}

.view-galery-btn {
  p {
    font-size: 15px !important;
    max-width: 120px;
    a{
      text-decoration: none;
      text-transform: capitalize;
      border-bottom: 2px solid rgba(245, 222, 179, 0);
      transition: .3;
      color: #464646;
      font-family: 'larsseit-light';
    }
  }
}

.view-galery-btn p a:hover{
  border-bottom: 2px solid #56d9d4;
   transition: .3;
}

.room-type-description {
  padding-left: 28px;
  .description-article{
    font-size: 18px;
    text-align: left;
    display: -webkit-box;
    line-height: 24px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 72px;
    text-overflow: ellipsis;
    color: #464646;
  }
}

.view-galery-btn {
  padding: 30px 0 34px 0;
  p {
    font-family: "larsseit-light";
    color: #464646;
    cursor: pointer;
  }
}

.router-link-active{
  border-bottom: 2px solid #56D9D4;
}

.content-box-main {
  flex: 0 0 50%;
  max-width: 50%;
}

.room-types-img {
  position: absolute;
  left: 5%;
  height: 230px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

@media (max-width: 1768px) {
  .room-types-row {
    max-width: 1700px;
  }

  .room-types-img {
    left: 1%;
    height: 200px;
  }
}

@media (max-width: 1600px) {

  .view-galery-btn{
    padding: 3px 0 0px 0;
}

.card-header,
.room-types__details {
  padding-bottom: 12px;
  padding-top: 12px;
}

.room-type-description .description-article{
    font-size: 16px;
}
.section-main-header p{
  font-size: 25px;
}

.divider{
    margin-left: 53px;
    height: 67px;
}

.card-header p{
    font-size: 20px;
}
  .room-types-row {
    display: flex;
    margin-top: 160px;
    flex-wrap: wrap;
    max-width: 1344px;
    width: 100%;
    margin: 0 auto;
  }
  .room-types-box {
    max-width: 500px;
  }

  .view-galery-btn p {
    padding: 32px 0 15px 0;
  }

  .room-types__inner {
    padding: 13px 26px 13px 116px;
  }

  .card-header {
    padding-bottom: 17px;
  }

  .room-types__details {
    padding-bottom: 15px;
  }



 .room-types-box{
    max-height: 320px;
 }

  .room-types-img {
    position: absolute;
    height: 150px;
    left: -8px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .card-header,
  .room-types__details {
    padding-bottom: 11px;
    font-size: 17px;
  }

  .room-types-img {
  left: 5%;
  height: 175px;
  img {
    width: 70%;
    object-fit: cover;
  }
}
}

@media (max-width: 1400px) {
  .room-type-description p {
    font-size: 16px;
  }

  .room-type-description {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .card-header p {
    font-size: 19px;
  }

  .divider {
    height: 61px;
    width: 1px;
    background-color: #56d9d4;
  }
  .room-types-row {
    max-width: 1320px;
  }


}

@media (max-width: 1300px) {
  .room-types-row {
    max-width: 1144px;
  }

  .room-types-img {
    position: absolute;
    height: 140px;
    left: -3%;
    img{
      object-fit: contain;
      width: 100%;
    }
  }

  .room-types__inner {
    padding: 13px 26px 12px 80px;
  }

  .room-types-box {
    max-width: 375px;
  }

  .card-header p {
    font-size: 20px;
  }

  .card-header,
  .room-types__details {
    font-size: 12px;
  }

  .divider {
    height: 38px;
    width: 1px;
  }

  .room-type-description p {
    font-size: 15px;
  }
}

@media (max-width: 1180px) {
  .room-types-row {
    max-width: 1050px;
  }

  .room-types-img {
    position: absolute;
    height: 122px;
    left: -11%;
  }
}

@media (max-width: 991px) {
  .content-box-main {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .room-types-row {
    max-width: 650px;
  }

  .room-types__inner {
    padding: 13px 10px 12px 73px;
    font-size: 13px;
  }

  .room-types-box {
    max-width: 100%;
    min-height: unset;
  }

  .card-header {
    padding-bottom: 14px;
  }

  .room-types__details {
    padding-bottom: 14px;
  }

  .room-types-img {
    height: 206px;
    left: 11%;
    position: relative;
  }
}

@media (max-width: 576px) {

  .room-type-description .description-article{
    font-size: 14px;
    max-height: unset;
    min-height: unset;
    -webkit-line-clamp: 4;
    line-height: 20px;
  }
  .room-types-box {
    max-width: unset;
  }

  .room-types-content {
    justify-content: center;
  }
  .content-box-main {
    flex: 0 0 100%;
    max-width: 100%;
  }

    .room-types-row > .content-box-main:first-child > .room-types-content{
    margin-top: -20px;
    padding-top: 0;
  }

  .room-types-content {
    padding: 0 11px;
    margin-top: 66px;
    height: 220px;
    position: relative;
  }

  .container {
    margin: 0 10px;
    background-color: #ffffff;
    position: relative;
    top: -200px;
    z-index: 1111;
  }

  .room-types-row {
    margin-top: unset;
  }
  .room-types-box {
    box-shadow: unset;
  }

  .room-types-img {
    position: unset;
    height: 122px;
    left: -11%;
  }
  .room-types__inner {
    padding: unset;
  }

  .room-type-description {
    max-width: 89%;
    position: absolute;
    background-color: white;
    padding: 20px 15px 0 16px;
    left: 55px;
    top: 146px;
    box-shadow: 0px 3px 6px #00000029;
  }

  .card-header p {
    font-size: 14px;
    padding-left: 15px;
    line-height: 18px;
    -webkit-line-clamp: 2;
    max-height: 35px;
  }

  .card-header{
    padding-bottom: 20px;
    
  }

  .divider {
    margin-left: 15px;
    margin-right: 6px;
  }

  .room-types__details {
    position: relative;
    top: -24px;
    padding-top: 21px;
    padding-bottom: 23px;
  }

  .room-type-description p {
    font-size: 14px;
  }

  .view-galery-btn {
    padding-left: unset;
  }

  .view-galery-btn p {
    padding: 10px 0 1px 0;
    font-size: 12px !important;
    float: right;
    color: #464646;
  }

  .section-main-header p {
    font-size: 15px;
  }

  .section-main-header {
    margin-top: unset;
    position: relative;
    top: 14px;
  }

  .view-galery-btn {
    padding: unset;
    padding-top: 6px;
    padding-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    z-index: 9;
    position: relative;
  }
}

@media(max-width:1600px){
  .section-main-header {
  margin-top: 50px;
}
}
</style>