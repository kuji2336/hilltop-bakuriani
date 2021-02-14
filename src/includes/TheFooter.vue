<template>
     <section class="footer-navigation" id="contact">
         <footer>
             <div class="footer-section costum-flex"  v-show="this.$route.name !=='blogdetail'">
                 <div class="addres-side">
                     <div class="addres-header--main"><h1 :class="addLanguageFontFooter">{{t('contact', {}, {locale:translateLanguage})}}</h1></div>
                     <div class="addres-side__inner">
                        <div class="addres-list">
                            <div class="phone-num">
                                <p class="left-side" :class="addLanguageFontFooter">{{t('section-headers.phone', {}, {locale:translateLanguage})}}:</p>
                                <p class="right-side"><a :href="`tel:${contactInfo.phone}`">{{contactInfo.phone}}</a></p>
                            </div>
                            <div class="email">
                                <p class="left-side" :class="addLanguageFontFooter">{{t('section-headers.email', {}, {locale:translateLanguage})}}:</p>
                                <p class="right-side"><a :href="`mailto:${contactInfo.email}`">{{contactInfo.email}}</a></p>
                            </div>
                            <div class="address">
                                <p class="left-side" :class="addLanguageFontFooter">{{t('section-headers.address', {}, {locale:translateLanguage})}}:</p>
                                <p class="right-side">{{contactInfo.address}}</p>
                            </div>
                        </div>
                     </div>
                 </div>
                 <div class="map-side">
                     <div class="map-side__inner">
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.873748505368!2d43.5277645154367!3d41.744815981723505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d276e3d7e93%3A0xf8903b47b3b8245a!2sHilltop%20Bakuriani!5e0!3m2!1sen!2sge!4v1611684911288!5m2!1sen!2sge" width="600" height="780" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                     </div>
                 </div>
             </div>
         </footer>
     </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {useI18n} from 'vue-i18n'
export default {
    computed:{
        ...mapGetters("contact",['contactInfo']),
        ...mapGetters(["translateLanguage"]),
    addLanguageFontFooter() {
      return {
        "geofont-arial-regular": this.translateLanguage === "ka" || this.translateLanguage === "ru",
        "eng-font-larrseit-light": this.translateLanguage === "en",
      };
    },
    },

 /* setup language internationalization to RU,EN,GE */
   setup(){
     const {t,locale} = useI18n();
      return {t,locale}
   },
    methods:{
        ...mapActions("contact",["RecieveContactAPI"]),
        getContactInfo(){
              this.RecieveContactAPI()
        },
    },

    created(){
       this.getContactInfo()
    }
    
}
</script>

<style lang="scss">
 .phone-num, .email, .address{
     display: flex;
     align-items: center;
     margin: 10px 0 16px 15px;
 }

 .footer-section{
     display: flex;
     align-items: center;
 }

 .addres-header--main {
    h1{
    color: #464646;
    font-size: 25px;
    }
}

 .map-side{
    flex: 0 0 77%;
    max-width: 77%;
    position: relative;
    left: -98px;
    z-index: -1;
 }

 .right-side{
     margin-left: 3px;
     a{
         text-decoration: none;
     }
 }

 .map-side__inner{
     iframe{
         width: 100%;
     }
 }

 .addres-side{
     flex: 0 0 28%;
     max-width: 28%;
     position: relative;
     left: 25px;
 }

 .addres-list{
     border-left: 1px solid #B4B4B4;
 }

 .addres-side__inner{
     display: flex;
     justify-content: center;
     padding: 90px 120px 100px 0px;
 }

 .footer-navigation{
     padding-top: 210px;
 }



 .addres-side__inner {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-left: 1px solid #56D9D4;
}

.left-side{
    text-transform: uppercase;
    font-size: 22px;
}

.right-side{
    font-size: 22px;
     font-family: "larsseit-medium";
}

.addres-header--main{
    margin-bottom: 32px;
}

@media(max-width:1600px){
     .map-side__inner{
     iframe{
         height: 500px;
     }
 }

  .addres-header--main {
    h1{
    color: #464646;
    font-size: 20px;
    }
}
  .addres-side{
     flex: 0 0 35%;
     max-width: 35%;
 }

  .map-side{
    flex: 0 0 74%;
    max-width: 74%;
    left: -124px;
 }

 .left-side{
    font-size: 16px;
}

.right-side{
    font-size: 16px;
}
.addres-side__inner {
    padding: 78px 115px 75px 0px;
}
}

@media(max-width:768px){
    .footer-section {
    flex-wrap: wrap;
}

 .footer-navigation{
     padding-top: 80px;
 }

.addres-side {
    flex: 0 0 100%;
    max-width: 100%;
    left: unset;
}

.map-side {
    flex: 0 0 100%;
    max-width: 100%;
    position: unset;
}

.addres-side__inner {
   padding: 0px 3px 0px 3px;
}

.addres-list {
    border-left: unset;
    position: relative;
    left: -20px;
}

.addres-side__inner {
    background: #FFFFFF 0% 0% no-repeat padding-box;
     box-shadow: unset;
    border-left: 1px solid #56D9D4;
    max-width: 335px;
    display: flex;
    justify-content: flex-start;
    margin-left: 13px;
    margin-bottom: 30px;
}

.phone-num, .email, .address {
    margin: 10px 0 13px 9px;
}

.map-side__inner iframe {
    height: 260px;
    margin-bottom: 70px;
}

.addres-header--main {
    margin-bottom: 30px;
    h1{
    text-align: center;
    color: #464646;
    font-size: 20px; 
    }
}

.left-side {
    font-size: 13px;
}
.right-side {
    font-size: 13px;
}

.phone-num, .email, .address {
    margin: 10px 0 13px 30px;
}

}

 
</style>