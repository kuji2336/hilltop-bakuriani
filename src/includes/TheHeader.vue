<template>
  <div class="navigation" :class="{'fixed-header':headerIsVisiable}">
    <nav>
      <div class="navigation-wrapper">
        <div class="logo-side">
          <div class="logo-side__inner">
              <p :class="{'dynamiccolor':headerIsVisiable}"><router-link to="/">Hilltop Bakuriani</router-link></p>
          </div>
        </div>
        <div class="main-nav-links">
          <div class="main-nav-links__inner" id="navbar">
              <li class="nav-link"> 
                 <a href="#" class="home-btn" :class="{'emphazised':activeClass}" @click="toHome" id="home">
                   <span :class="setDynamicFontToHome">{{t('home', {}, {locale:translateLanguage})}}</span>
                 </a>
              </li>
              <li class="nav-link">
                 <a class="page-link" href="#roomTypes">{{t('room-types', {}, {locale:translateLanguage})}}</a>
              </li>
              <li class="nav-link">
                  <a class="page-link" href="#services" ><span>{{t('services', {}, {locale:translateLanguage})}}</span></a>
              </li>
              <li class="nav-link">
                 <a class="page-link" href="#aboutUs">{{t('about', {}, {locale:translateLanguage})}}</a>
              </li>
              <li class="nav-link">
                 <a class="page-link" href="#blog" ref="myblog">{{t('blog', {}, {locale:translateLanguage})}}</a>
             </li>
              <li  class="nav-link">
                <a class="page-link" href="#contact">{{t('contact', {}, {locale:translateLanguage})}}</a>
             </li>
              <li class="costum-flex-icongrafy nav-link" >
                  <span><img :src="require(`@/assets/img/phone.svg`)" ></span><a :href="`tel:${contactInfo.phone}`">{{contactInfo.phone}}</a>
              </li>
              <li>
                <a href="https://www.facebook.com/bakurianihilltop"><img :src="require(`@/assets/img/facebook.svg`)" class="img-fluid img-costum-width" :class="{'d-none': headerIsVisiable}"></a>
                <a href="https://www.facebook.com/bakurianihilltop"><img :src="require(`@/assets/img/facebookmob.png`)" :class="{'d-block': headerIsVisiable}" class="img-fluid img-costum-width class-none"></a>
              </li>
              <li class="language-dropdown">
                  <drop-select :options="['eng', 'geo', 'rus', ]" :default="'eng'"  class="select" @input="onClickChild"></drop-select>
              </li>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <!-- mobile header menu -->
  <header-mob></header-mob>
  
</template>



<script>
import {useI18n} from 'vue-i18n'
import headerMob from "../includes/headerMob"
import dropSelect from "../includes/dropSelect"
import {mapGetters, mapActions} from "vuex"
export default {
    components:{
     headerMob,
     dropSelect
    },

  data(){
      return{
        activeClass:false,
        blogIsVisable:false,
        lang:null
      }
  },

/* setup language internationalization to RU,EN,GE */
 setup(){
   const {t,locale} = useI18n();
   return {t,locale}
  },

 computed:{
    ...mapGetters(['headerIsVisiable', 'translateLanguage']),
    ...mapGetters("contact",['contactInfo']),
    setDynamicFontToHome(){
      return{
         'geofont-arial-caps': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'eng-font-larrseit-light': this.translateLanguage === "en",
       }
    },
  },


//@desc provide functions to navbar mobile
  provide(){
     return{
       giveactiveClass: this.giveActiveClass,
       selectValue: this.onClickChild,
       contorlsections:this.contorlSections,
     }
  },


  methods:{
    ...mapActions("room",["RecieveRoomTypesAPI"]),
    ...mapActions("blogs",["RecieveBlogs"]),
    ...mapActions("mainSlider",["RecieveMainSliderAPI"]),
    ...mapActions("services", ["RecieveServicesAPI"]),
    ...mapActions("about", ["RecieveAboutAPI"]),


    setActiveClassOnScroll(){
      var homeLink = document.getElementById("home")
      if(window.pageYOffset === 0){
        homeLink.classList.add("emphazised")
      }else{
        homeLink.classList.remove("emphazised")
      }
    },


    setActiveClassOnLoad(){
      this.activeClass = true
    },


      //@desc give underline border to nav links
       giveActiveClass(event){
        document.querySelectorAll('.emphazised').forEach(link => link.classList.remove('emphazised'))
         if(event.target.classList.contains("page-link")){
             event.target.classList.add('emphazised')
             this.$router.push({name:"home"});
              document.getElementsByTagName("html")[0].classList.remove("disable-scroll"); 
         }
      }, 

    //@desc change header font-family depend on select dropdown value and then commit to store
    onClickChild(value){
        if(value === 'eng'){
          this.lang = 'en'
        }
        else if(value === "geo"){
           this.lang  = "ka"
        }
        else{
           this.lang = 'ru'
        }
         
        this.$store.commit('setTranslateLang', this.lang)

        localStorage.setItem('storedLang', this.translateLanguage)

        this.updatePageLanguage()
     },

      //@desc set header language font styles after load
      setHeaderStyles(){
        var navLinks = document.querySelectorAll(".nav-link > a");
        for (var i = 0; i < navLinks.length; i++) {
            if( this.translateLanguage === "ka" ||  this.translateLanguage === "ru"){
                 navLinks[i].classList.add("geofont-arial-caps")
            }
            if( this.translateLanguage === "en"){
                 navLinks[i].classList.remove("geofont-arial-caps")
                 navLinks[i].classList.add("eng-font-larrseit-light");
            }
         }
    }, 



    //@desc control section on scroll and give it underline color & change router hash value 
     contorlSections(){
      let mainNavLinks = document.querySelectorAll(".page-link");
      let fromTop = window.scrollY + 50;
      mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if ( section.offsetTop <= fromTop + 55 && section.offsetTop + section.offsetHeight > fromTop + 55){
          link.classList.add("emphazised");
          this.$router.push({hash:link.hash})
          } else {
           link.classList.remove("emphazised");
         } 
       });
    
     },


  updatePageLanguage(){
    this.$store.state.blogs.blogs= []
    this.RecieveBlogs();
    this.RecieveRoomTypesAPI();
    this.RecieveMainSliderAPI();
    this.RecieveServicesAPI();
    this.RecieveAboutAPI();
    this.setHeaderStyles();
  },


    toHome(){
    this.$router.push("/")
   }

  },


created(){
      document.addEventListener("click", this.giveActiveClass)
      window.addEventListener("scroll", this.contorlSections)
      window.addEventListener("scroll", this.setActiveClassOnScroll)
   },



watch:{
    //@desc whatch router change, and remove eventlistener from blog page
    $route(to){
       if(to.name === "blogdetail"){
         window.removeEventListener("scroll", this.contorlSections);
         window.removeEventListener("scroll", this.setActiveClassOnScroll);
         this.$refs.myblog.style.borderBottom = "2px solid #56D9D4";
       }
       else{
          window.addEventListener("scroll", this.contorlSections);
          this.$refs.myblog.style.borderBottom = "";
          this.setActiveClassOnLoad();
          window.addEventListener("scroll", this.setActiveClassOnScroll);
       }
    }
},


mounted(){
  this.setHeaderStyles()
},


unmounted(){
     document.removeEventListener('click', this.giveActiveClass)
},

};
</script>



<style lang="scss" scoped>

.img-costum-width{
  height: 15px;
  width: 15px;
}
.emphazised{
    border-bottom: 2px solid #56D9D4 ;
}


.page-link:hover{
   border-bottom: 2px solid #56D9D4;
   transition: 0.4s;
}

.page-link{
  border-bottom: 2px solid #56d9d500;
}



.class-none{
    display: none;
}

.logo-side__inner{
    p{
         font-family: "caslon-medium";
         font-size: 35px;
         color: #FFFFFF;
         text-shadow: 0px 3px 6px #0000004D;
         letter-spacing: 0px;
         text-align: left;
         cursor: pointer;
         a{
           text-decoration: unset;
         }
    }
}

.language-dropdown{
    display: flex;
    align-items: center;
    cursor: pointer;
}

.geofont-arial-caps{
      font-family: "bpg-arial-caps" !important;
}



.eng-font-larrseit-light{
    font-family: "larsseit-light";
}
.navigation{
    position: absolute;
    z-index: 1111;
    width: 100%;
    padding: 25px 42px;
}

.navigation-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-nav-links__inner{
    display: flex;
    li{
        list-style: none;
        margin: 0 10px 0 10px;
        color: #FFFFFF;
        font-size: 22px;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        a{
            text-decoration: none;
            text-shadow: 0px 3px 6px #0000004D;
        }  
    }
}

.main-nav-links__inner li a{
   font-family: "larsseit-light";
}

.costum-flex-icongrafy{
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        img{
            width: 18px;
            height: 18px;
            margin-right: 5px;
        }
    }
}


.fixed-header{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #20797633;
    position: fixed;
    width: 100%;
}

/* media queries */
@media(max-width:1700px){
     .main-nav-links__inner li{
    font-size: 16px;
}
.logo-side__inner p {
    font-size: 20px;
    position: relative;
    top: -2px;
}
}

@media(max-width:1600px){
    .main-nav-links__inner li{
    font-size: 15px;
}


.fixed-header{
   padding: 20px 40px;
}


}

@media(max-width:1300px){
    .main-nav-links__inner li{
    font-size: 12px;
}
.logo-side__inner p {
    font-family: "caslon-medium";
    font-size: 15px;
}
}

@media(max-width:1200px){
.navigation {
    z-index: 1111;
    width: 100%;
    padding: 24px 12px;
}
}

@media(max-width:991px){
    .navigation-wrapper{
     flex-wrap: wrap;
}

.logo-side__inner{
    display: none;
}
}


@media(max-width:768px){
  .navigation{
      display: none;
  }

  .slider-main-title__inner p{
    font-size: 20px;
}

.slider-sub-title__inner p {
    font-size: 15px;
}

}

.home-btn span:hover{
   border-bottom: 2px solid #56D9D4 ;
}


</style>