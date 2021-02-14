<template >
  <section class="blogs" id="blog" :key="translateLanguage">
    <div class="container-blogs">
      <div class="section-header--blogs">
        <h1 :class="addLanguageFontTitle">
          {{ t("section-headers.blog", {}, { locale: translateLanguage }) }}
        </h1>
      </div>
      <div class="blogs-content-row" id="scrollHere">
        <blog-box></blog-box>
      </div>
    </div>
    <div class="load--more">
      <div class="wrap" v-if="state === 'loading'">
        <the-spinner></the-spinner>
      </div>
      <div class="load-more-btn" v-if="BlogUrl !== null">
        <p @click="loadMore" :class="addLanguageFontToButton">
          <span>{{t("section-headers.load-more", {}, { locale: translateLanguage })}}</span>
        </p>
      </div>
    </div>
  </section>
</template>





<script>
import { useI18n } from "vue-i18n";
import { mapGetters } from "vuex";
import blogBox from "@/components/blogBox";
import TheSpinner from "../includes/TheSpinner";
export default {
  data() {
    return {
      state: "idle",
    };
  },

  components: {
    blogBox,
    TheSpinner,
  },

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  computed: {
    ...mapGetters("blogs", ["BlogInfo", "BlogUrl"]),
    ...mapGetters(["translateLanguage"]),

    addLanguageFontTitle() {
      return {
        "geofont-arial-caps":
        this.translateLanguage === "ka" || this.translateLanguage === "ru",
        "eng-font-larrseit-light": this.translateLanguage === "en",
      };
    },

    addLanguageFontToButton() {
      return {
        "geofont-arial-regular":
          this.translateLanguage === "ka" || this.translateLanguage === "ru",
        "eng-font-larrseit-light": this.translateLanguage === "en",
      };
    },
  },

  methods: {
    async loadMore() {
      this.state = "loading";
      this.error = undefined;
      try {
        setTimeout(async () => {
          const url = this.BlogUrl;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Accept-Language": this.translateLanguage,
            },
          });
          const data = await response.json();
          this.state = "loaded";
          this.$store.commit("blogs/getBlogInfo", data);
          return response;
        }, 500);
      } catch (error) {
        this.state = "failed";
        this.error = error;
        return error;
      }
    },
  },
};
</script>



<style lang="scss">
.load--more {
  margin: 0 auto;
}
.load-more-btn {
  display: flex;
  justify-content: center;
  padding-top: 67px;
  p {
    span {
      font-size: 25px;
      color: #464646;
      border-bottom: 2px solid #ffffff00;
      max-width: 150px;
      width: 100%;
      cursor: pointer;
      text-align: center;
    }
  }
}

.load-more-btn p span:hover {
  border-bottom: 2px solid #56d9d4;
  transition: 0.3s;
}

.blogs-content-row {
  display: flex;
  flex-wrap: wrap;
}

.blogs {
  margin-top: 140px;
}

.container-blogs {
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
}

.section-header--blogs {
  margin-bottom: 50px;
  h1 {
    display: flex;
    justify-content: center;
    font-size: 30px;
    color: #464646;
    text-transform: uppercase;
  }
}

@media (max-width: 1768px) {
  .container-blogs {
    max-width: 1700px;
  }
}

@media (max-width: 1600px) {
  .container-blogs {
    max-width: 1344px;
  }

  .section-header--blogs h1 {
    font-size: 25px;
  }

  .load-more-btn p span {
    font-size: 20px;
  }
}

@media (max-width: 1300px) {
  .container-blogs {
    max-width: 1144px;
  }
}

@media (max-width: 1180px) {
  .container-blogs {
    max-width: 1050px;
  }
}

@media (max-width: 991px) {
  .container-blogs {
    max-width: 650px;
  }

  .blogs {
    margin-top: 100px;
  }
}

@media (max-width: 576px) {
  .section-header--blogs {
    margin-bottom: unset;
  }

  .section-header--blogs h1 {
    font-size: 20px;
  }

  .load-more-btn p span {
    font-size: 16px;
    max-width: 104px;
  }

  .load-more-btn {
    padding-top: unset;
    position: relative;
    top: 45px;
  }
}
</style>