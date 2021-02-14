<template>
  <section class="about-us" id="aboutUs">
    <div class="container-about">
      <div class="about-us-box">
        <div class="about-header">
          <h1 :class="addLanguageFontTitle">
            {{
              t("section-headers.about-sect", {}, { locale: translateLanguage })
            }}
          </h1>
        </div>
        <div class="about-us__inner" :id="aboutHilltop.id">
          <p :class="addDynamicFontToDescription" v-html="aboutHilltop.description"></p>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import { useI18n } from "vue-i18n";
import { mapGetters, mapActions } from "vuex";
export default {
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  computed: {
    ...mapGetters("about", ["aboutHilltop"]),
    ...mapGetters(["translateLanguage"]),

    addLanguageFontTitle() {
      return {
        "geofont-arial-caps": this.translateLanguage === "ka" ||  this.translateLanguage === "ru",
        "eng-font-larrseit-light": this.translateLanguage === "en",
      };
    },

    addDynamicFontToDescription(){
      return {
        "bpg-nateli-reg": this.translateLanguage === "ka" ||  this.translateLanguage === "ru",
        "larrseit-thin-italic": this.translateLanguage === "en",
      };
    }
  },

  methods: {
    ...mapActions("about", ["RecieveAboutAPI"]),

    getAboutInfo() {
      this.RecieveAboutAPI();
    },
    
  },

  created() {
    this.getAboutInfo();
  },
};
</script>





<style lang="scss">

/* dynamic fonts */
@import '../assets/css/dynamicFonts.css';


.about-header {
  display: flex;
  justify-content: center;
  padding-bottom: 78px;
  h1 {
    font-size: 30px;
    color: #464646;
    text-transform: uppercase;
  }
}

.container-about {
  max-width: 1644px;
  width: 100%;
  margin: 0 auto;
}

.about-us {
  margin-top: 130px;
}

.about-us__inner {
  p {
    font-size: 22px;
    color: #464646;
    line-height: 24px;
  }
}

@media (max-width: 1600px) {
  .container-about {
    max-width: 1344px;
  }

    .about-header h1 {
    font-size: 25px;
  }
}

@media (max-width: 1400px) {
  .container-about {
    max-width: 1144px;
  }
  .about-us__inner p {
    font-size: 22px 
  }
  .about-us {
    margin-top: 135px;
  }
}

@media (max-width: 1300px) {
  .container-about {
    max-width: 1044px;
  }
}


@media (max-width: 768px) {
  .container-about {
    max-width: 600px;
  }
  

  .about-us__inner p {
    font-size: 16px;
  }
  .about-header {
    padding-bottom: 43px;
  }

  .about-header h1 {
    font-size: 29px;
  }
}

@media (max-width: 576px) {
  .left-side-text{
    position: relative;
    top: -44px;
    z-index: 1111;
    max-width: 332px;
    left: 20px;
  }
  .container-about {
    max-width: 300px;
  }
  .about-us__inner p {
    font-size: 14px;
  }

   .about-us {
   margin-top: unset;
   }
  
  .about-header h1 {
    font-size: 20px;
  }

  .about-header {
    padding-bottom: 13px;
  }
}
</style>