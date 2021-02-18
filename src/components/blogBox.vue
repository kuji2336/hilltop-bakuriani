<template>
<div>
  <div class="blog-box-wrapper" v-for="blog in BlogInfo" :key="blog.id">
    <div class="blog-box" v-for="blogDet in blog.results" :key="blogDet.id">
      <div class="blog-box__inner">
        <div class="blog-box__image">
          <img :src="blogDet.picture.crop" />
        </div>
        <div class="blog-right-side-text">
          <div class="blog-title">
            <h2 :class="addLanguageFontTitle">{{ blogDet.title }}</h2>
          </div>
          <div class="blog-right-side-text__inner">
            <p :class="addDynamicFontToDescription" v-html="blogDet.short_description"></p>
          </div>
          <div class="read-description">
            <p>
              <router-link  :class="addLanguageFontToseeBtn" :to="{ name: 'blogdetail', hash: '#blog-in',  params: { slug: blogDet.slug } }">
                {{t("section-headers.read-more",{},{ locale: translateLanguage })}}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { mapGetters } from "vuex";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  computed: {
    ...mapGetters("blogs", ["BlogInfo"]),
    ...mapGetters(["translateLanguage"]),
    addLanguageFontToseeBtn() {
      return {
        "geofont-arial-regular": this.translateLanguage === "ka" || this.translateLanguage === "ru",
        "eng-font-larrseit-light": this.translateLanguage === "en",
      };
    },

    addLanguageFontTitle() {
      return {
        "bpg-rioni-regular": this.translateLanguage === "ka" ||  this.translateLanguage === "ru",
        "calson-medium": this.translateLanguage === "en",
      };
    },

    addDynamicFontToDescription(){
      return {
        "bpg-nateli-reg": this.translateLanguage === "ka" ||  this.translateLanguage === "ru",
        "larrseit-thin-italic": this.translateLanguage === "en",
      };
    }
  },

};
</script>


<style lang="scss">

.blog-box-wrapper{
  display: flex; 
  flex-wrap: wrap; 
  width: 100%;
}
.blog-box {
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  left: 40px;
  margin-bottom: 70px;
}

.blog-box {
  img {
    filter: brightness(0.8);
  }
}

.blog-right-side-text {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  position: absolute;
  max-width: 410px;
  width: 100%;
  padding: 0 12px 0 30px;
  left: 82%;
  border-right: 1px solid #56d9d4;
}

.emphazised{
    border-bottom: 2px solid #56D9D4 ;
    font-family: "larsseit-medium";
}

.blog-box__inner {
  display: flex;
  align-items: center;
  position: relative;
}

.blog-box__image {
  height: 300px;
  img {
    height: 100%;
    object-fit: cover;
  }
}

.blog-title {
  h2 {
    padding-top: 30px;
    color: #464646;
    font-size: 30px;
    text-transform: capitalize;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.read-description {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 30px;
  padding-top: 23px;
  p {
    font-size: 18px;
    a {
      text-decoration: none;
      color: #464646;
      text-transform: capitalize;
    }
  }
}


.read-description p a:hover{
  border-bottom: 2px solid #56D9D4;
}

.blog-right-side-text__inner {
  p {
    font-size: 20px;
    color: #464646;
    display: -webkit-box;
    padding-top: 21px;
    line-height: 24px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 1600px) {
  .read-description p {
    font-size: 15px;
  }
  .blog-box__image {
    height: 250px;
    img {
      width: 100%;
    }
  }



  .blog-right-side-text {
    max-width: 340px;
    padding: 0px 11px 0 17px;
    left: 77%;
    border-right: 1px solid #56d9d4;
  }

  .blog-right-side-text__inner {
    p {
      font-size: 16px;
       padding-top: unset;
       line-height: 20px;
    }
  }

  .blog-title h2 {
    padding: 30px 0 22px 0;
    font-size: 21px;
  }

  .read-description {
    padding-bottom: 30px;
    padding-top: 16px;
  }
}

@media (max-width: 1400px) {
  .blog-right-side-text {
    left: 66%;
  }

  .blog-right-side-text__inner {
    p {
      font-size: 14px;
    }
  }

  .blog-title h2 {
    padding: 30px 0 22px 0;
    font-size: 17px;
  }
}

@media (max-width: 1300px) {
  .blog-box__image {
    height: 175px;
  }

  .blog-right-side-text {
    left: 68%;
  }

  .blog-right-side-text {
    max-width: 250px;
    padding: 0px 11px 0 14px;
    left: 65%;
  }

  .blog-right-side-text__inner {
    p {
      min-height: unset;
    }
  }

 .blog-right-side-text__inner p{
   padding-top: 15px;
  }



  .read-description {
    font-size: 12px;
    padding-bottom: 9px;
    padding-top: 10px;
  }
}

@media (max-width: 991px) {
   .blog-box {
    flex: 0 0 100%;
    max-width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .blog-box__image {
    height: 230px;
  }

  .blog-right-side-text {
    left: 74%;
  }
}

@media (max-width: 576px) {
  .blog-box{
    position: unset;
  }


  .blog-box__image img {
    object-fit: contain;
}

  .blog-right-side-text__inner p{
    padding-top: 8px;
  }


  .read-description p{
    font-size: 14px;
  }
  .blog-box {
    flex: 0 0 70%;
    max-width: 70%;
  }
  .blog-title h2 {
    font-size: 16px;
    padding: 20px 0 0 0;
  }

  .blog-right-side-text {
    left: 103px;
    top: 147px;
    border-right: unset;
    padding: 0px 16px 17px 15px;
  }
}
</style>