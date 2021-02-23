<template>
  <div class="nav-for-mob">
    <div
      class="nav-for-mob__inner"
      :class="{ 'fixed-header--mob':mobHeaderIsVisiable}"
    >
      <div class="navbar-top-flex">
        <div class="nav-bars--mob" @click="showSideNav()">
          <img
            :src="require(`@/assets/img/nav.png`)"
            class="img-fluid"
            :class="{ 'd-none':mobHeaderIsVisiable}"
          />
          <img
            :src="require(`@/assets/img/burger.svg`)"
            class="img-fluid hiiden-nav"
            :class="{ 'd-block':mobHeaderIsVisiable}"
          />
        </div>
        <div class="company-logo--mob">
          <p :class="{ 'change-logo-color':mobHeaderIsVisiable}">
            <router-link to="/">Hilltop Bakuriani</router-link>
          </p>
        </div>
        <div class="contact-logo--mob">
          <a :href="`tel:${contactInfo.phone}`"
            ><img
              :src="require(`@/assets/img/whatsapp.svg`)"
              class="img-fluid"
              :class="{ 'd-none':mobHeaderIsVisiable}"
          /></a>
          <a :href="`tel:${contactInfo.phone}`"
            ><img
              :src="require(`@/assets/img/iconcontact.svg`)"
              class="img-fluid static-d-none"
              :class="{ 'd-block':mobHeaderIsVisiable}"
          /></a>
        </div>
      </div>
    </div>
  </div>

  <!-- navigation left sidenav -->
  <div
    class="sidenav-left--mob"
    id="mainSidenavMob"
    :class="{ slideLeft: sideNavIsVisiable }"
  >
    <div class="sidenav--left__inner">
      <div class="sidenav-header--flex">
        <div class="header--nav">
          <p>Hilltop Bakuriani</p>
        </div>
        <div class="close-nav-btn--mob" @click="closeNav">
          <img :src="require(`@/assets/img/x-btn.svg`)" class="img-fluid" />
        </div>
      </div>
      <div class="material-icons--row">
        <div class="change-language--drop">
          <drop-select
            :options="['eng', 'geo', 'rus']"
            :default="'ENG'"
            class="select"
            @input="selectValue"
          ></drop-select>
        </div>
      </div>
      <div class="navigation-lists-direction--column">
        <div class="navigation-lists--inner">
          <li>
            <span class="nav-link">
              <router-link id="home" :class="setDynamicFontToHome" to="/">
                  {{t("home", {}, { locale: translateLanguage })}}
              </router-link>
            </span>
          </li>
          <li>
            <span class="nav-link">
                <a class="page-link" href="#roomTypes">
                    {{ t("room-types", {}, { locale: translateLanguage }) }}
                </a>
            </span>
          </li>
          <li>
            <span class="nav-link">
                <a class="page-link" href="#services" >
                    {{ t("services", {}, { locale: translateLanguage }) }}
                </a>
            </span>
          </li>
          <li>
            <span class="nav-link">
                <a class="page-link" href="#aboutUs">
                    {{ t("about", {}, { locale: translateLanguage }) }}
                </a>
            </span>
          </li>
          <li>
            <span class="nav-link">
                <a class="page-link" href="#blog">
                    {{t("blog", {}, { locale: translateLanguage })}}
                </a>
            </span>
          </li>
          <li>
            <span class="nav-link">
                <a class="page-link" href="#contact">
                    {{ t("contact", {}, { locale: translateLanguage }) }}
                </a>
            </span>
          </li>
        </div>
      </div>
    </div>
    <div class="contact-material-icons--right">
      <a href="https://www.facebook.com/bakurianihilltop">
          <img :src="require(`@/assets/img/facebookmob.png`)" class="img-fluid"/>
      </a>
    </div>
  </div>
</template>

<script>
import dropSelect from "../includes/dropSelect";
import { useI18n } from "vue-i18n";
import { mapGetters, mapActions } from "vuex";
export default {
  //@desc inject all function from dekstop header
  inject: ["selectValue"],
  data() {
    return {
      isReady:false,
    };
  },
  components: {
    dropSelect,
  },

  //@desc setup language internationalization to RU,EN,GE
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  methods: {
    /* show side nav */
    showSideNav() {
      this.$store.commit("ChecksideNavVisibility", true);
      /*  disable vertical scroll */
      document.getElementsByTagName("html")[0].classList.add("disable-scroll");
      this.contorlSections();
    },

    setHeaderFixed() {
      if (window.pageYOffset > 50) {
        this.$store.commit("mobHeaderVisibility", true)
      } else {
       this.$store.commit("mobHeaderVisibility", false)
      }
    },



    closeNav() {
      this.$store.commit("ChecksideNavVisibility", false);
      document
        .getElementsByTagName("html")[0]
        .classList.remove("disable-scroll");
    },

    /* commit  selected language  */
    selectLang(value) {
      this.$store.commit("setTranslateLang", value);
    },

    ...mapActions("contact", ["RecieveContactAPI"]),
    getContactInfo() {
      this.RecieveContactAPI();
    },

   //@desc control sidenav and give active class depend on hash value
    contorlSections() {
      if (this.$route.hash !== "#blog-in") {
        this.isReady = false;
        let mainNavLinks = document.querySelectorAll(".page-link");
        let fromTop = window.scrollY + 50;
        mainNavLinks.forEach((link) => {
          let section = document.querySelector(link.hash);
          if (
            section.offsetTop <= fromTop + 55 &&
            section.offsetTop + section.offsetHeight > fromTop + 55
          ) {
            link.classList.add("emphazisedMob");
          } else {
            link.classList.remove("emphazisedMob");
          }
        });
      } else {
        return;
      }
    },
  },

  computed: {
    ...mapGetters(["sideNavIsVisiable", "translateLanguage","mobHeaderIsVisiable"]),
    ...mapGetters("contact", ["contactInfo"]),
    setDynamicFontToHome(){
      return{
         'geofont-arial-caps': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'eng-font-larrseit-light': this.translateLanguage === "en"
       }
    }
  },

  watch:{
      $route(to){
          if(to.hash === "#blog-in"){
            window.removeEventListener("scroll", this.setHeaderFixed);
          }else{
               window.addEventListener("scroll", this.setHeaderFixed);
          }
      }
  },




  created() {
    window.addEventListener("scroll", this.setHeaderFixed);
    document.addEventListener("click", this.giveactiveClass);
    this.getContactInfo();
  },

  mounted() {
    //@desc hide sidenav when nav links will be clicked, and then remove disabled scroll
    var navigationLinks = document.querySelectorAll(".nav-link");
    for (var i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener("click", () => {
        this.$store.commit("ChecksideNavVisibility", false);
        document
          .getElementsByTagName("html")[0]
          .classList.remove("disable-scroll");
      });
    }

    //@desc hide navbar on clik outside
    var mainPanelDiv = document.getElementById("mainPanel");
    mainPanelDiv.addEventListener("click", () => {
      this.$store.commit("ChecksideNavVisibility", false);
      document
        .getElementsByTagName("html")[0]
        .classList.remove("disable-scroll");
    });


  },

  unmounted() {
    document.removeEventListener("click", this.giveactiveClass);
  },
};
</script>

<style lang="scss">
.d-none {
  display: none !important;
}

.hiiden-nav {
  display: none;
  height: 24px;
}

.test {
  background-color: red;
}

.contact-logo--mob {
  display: flex;
  align-items: center;
}

.geofont-arial-caps {
  font-family: "bpg-arial-caps" !important;
}

.eng-font-larrseit-light {
  font-family: "larsseit-light";
}

.emphazised {
  border-bottom: 2px solid #56d9d4 !important;
  transition: 0.3s;
}
.homeLinkActive{
  border-bottom: 2px solid #56d9d4 !important;
  font-family: "larsseit-medium" !important;  
}
.disable-scroll {
  overflow: hidden;
}

.d-block {
  display: block !important;
}
.nav-for-mob {
  display: none;
}

.change-logo-color {
  color: #4a4a4a !important;
  text-shadow: unset !important;
}

.contact-material-icons--right {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 12px;
  img {
    height: 20px;
    width: 20px !important;
  }
}

.contact-material-icons--right a:first-child {
  margin-right: 20px;
}

.contact-material-icons--right a:nth-child(2) {
  margin-right: 9px;
}

.static-d-none {
  display: none;
}

.filtered-img {
  filter: invert(20%) sepia(80%) saturate(0%) hue-rotate(157deg) brightness(99%)
    contrast(79%);
}

.sidenav-left--mob {
  max-width: 254px;
  width: 100%;
  background-color: #ffffff;
  z-index: 11111111;
  position: fixed;
  padding: 7px 10px 153px 20px;
  left: -100%;
  transition: 0.4s;
  height: 100%;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
}

.slideLeft {
  left: 0px;
  transition: 0.4s;
}

.sidenav-header--flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material-icons--row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 31px;
}

.navigation-lists--inner {
  li {
    color: #4a4a4a;
    list-style: none;
    margin-top: 31px;
    margin-bottom: 25px;
    text-transform: uppercase;
    a {
      text-decoration: none;
      font-family: "larsseit-light";
    }
  }
}

.header--nav {
  p {
    font-family: "caslon-medium";
    color: #464646;
    font-size: 20px;
  }
}
@media (max-width: 768px) {
  .nav-for-mob {
    display: block;
  }
}

.nav-for-mob__inner {
  position: absolute;
  z-index: 11111;
  width: 100%;
}

.navbar-top-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
}

.nav-bars--mob {
  width: 27px;
  cursor: pointer;
}

.company-logo--mob {
  p {
    font-family: "caslon-medium";
    color: #ffffff;
    text-shadow: 0px 3px 6px #0000004d;
    font-size: 20px;
    position: relative;
    top: -2px;
    a{
        text-decoration: unset;
    }
  }
}

.fixed-header--mob {
  position: fixed;
  width: 100%;
  box-shadow: 0px 3px 6px #20797633;
  background: #fefefe;
}
.rm-shadow {
  text-shadow: unset;
}

.change-nav-color {
  filter: invert(29%) sepia(0%) saturate(0%) hue-rotate(56deg) brightness(96%)
    contrast(95%);
  color: #4a4a4a;
}


.emphazisedMob {
  border-bottom: 2px solid #56d9d4 !important;
  font-family: "larsseit-medium" !important;
}

.geofont-arial-caps {
  font-family: "bpg-arial-caps" !important;
}
</style>
