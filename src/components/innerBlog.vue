<template>
<div id="blog-in">
    <section class="inner-blog-section" v-for="blog in singleBlogRessult" :key="blog.id"  >
        <div class="blog-container">
            <div class="blog-section--flex">
                <div class="blog-left-side">
                  <img :src="blog.picture.full_size" :title="blog.title">
                </div>
                <div class="blog-right-side">
                   <div class="arrow-back" @click="back"><img :src="require(`@/assets/img/arrow-left.svg`)"></div>
                   <div class="blog-main-title">
                       <h2 :class="addLanguageFontToTitle">{{blog.title}}</h2>
                   </div>
                   <div class="blog-main-description">
                       <div class="sub-header--flex">
                           <div class="blog-publication-date">
                            <p :class="addDynamicFontToTags">{{t('published_at',{},{locale:translateLanguage})}}: <span>{{blog.date}}</span></p>
                           </div>
                           <div class="blog-requaired-tags">
                               <div class="tags-wrapper">
                                   <p><span v-for="tag in blog.tags" :key="tag.id">{{tag.title}}</span></p>
                               </div>
                           </div>
                       </div>
                       <div class="blog-main-description__inner">
                           <p :class="addDynamicFontToDescription" v-html="blog.description"></p>
                       </div>
                        <div class="sub-header--flex--mob">
                           <div class="wrapper-mob">
                            <div class="blog-publication-date">
                              <p :class="addDynamicFontToTags">{{t('published_at',{},{locale:translateLanguage})}}: <span>{{blog.date}}</span></p>
                            </div>
                           <div class="blog-requaired-tags">
                              <div class="tags--mob" >
                                   <span  v-for="tagmob in blog.tags" :key="tagmob.id">{{tagmob.title}}</span>
                              </div>
                           </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>


<script>
import {mapGetters} from "vuex"
import {useI18n} from 'vue-i18n'
export default {
setup(){
   const {t,locale} = useI18n();
   return {t,locale}
  },

    data(){
        return{
           singleBlogRessult:[],
        }
    },
    methods:{
      RecieveSingleBlog(){
            var blogSlug = this.$route.params.slug
            var url = `https://www.hilltop.ge/api/blog/${blogSlug}/`
            fetch(url,{
                method:"GET",
                headers:{
                    "Accept-Language":this.translateLanguage
                }
            })
            .then((res) => res.json())
            .then((_singleBlog) => this.singleBlogRessult.push(_singleBlog))
        },

        back(){
           this.$router.push({name:"home"});
        },
       
       //@desc change navbar position if route name contains blogdetails 
       route(){
          if(this.$route.name === "blogdetail"){
            this.$store.commit("textCallback", true);
          }else{
               this.$store.commit("textCallback", false);
          }
      },

     navColor() {
        const Links = document.querySelectorAll(".nav-link > a");
        for (let i = 0; i < Links.length; i++) {
                 Links[i].classList.add("dynamiccolor")
           }
    },
    },

    computed:{
        ...mapGetters(["translateLanguage"]),
        
     addLanguageFontToTitle(){
       return{
         'bpg-rioni-regular': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'calson-medium':this.translateLanguage === "en",
       }
     },

     addDynamicFontToDescription(){
      return{
         'bpg-nateli-reg': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'eng-font-larrseit-thin':this.translateLanguage === "en",
       }
     },

     
     addDynamicFontToTags(){
      return{
         'bpg-nateli-reg': this.translateLanguage === "ka" || this.translateLanguage === "ru",
         'larseit-thinLight-italic':this.translateLanguage === "en",
       }
     },
    },

     created(){
      this.RecieveSingleBlog();
      this.route();
      this.navColor();
      this.$store.commit("mobHeaderVisibility", true);
    },

   


}
</script>


<style lang="scss">

 .inner-blog-section{
    position: relative;
    top: 100px;
 }

 .tags-wrapper{
     display: flex;
     justify-content: flex-end;
     align-items: center;
     p{
         span{
             margin-right: 10px;
         }
     }
 }

   .larrseit-light-italic-thin{
    font-family: "larsseit-light-italic-thin";
  }
 

  .dynamiccolor{
   color: #4A4A4A !important;
}

 .emphazised{
    border-bottom: 2px solid #56D9D4;
    font-family: "larsseit-medium";
}

 .wrapper-mob{
     display: flex;
     justify-content: space-between;
     margin: 0 20px;
 }

 .sub-header--flex{
     display: flex;
     justify-content: space-between;
     align-items: center;
 }

 .blog-left-side{
     height: 100%;
     img{
         height: 100%;
         width: 100%;
         object-fit: cover;
     }
 }

 .tags--mob{
     display: flex;
     justify-content: flex-end;
     span{
         margin-left: 5px;
     }
 }

 .sub-header--flex--mob{
     display: none;
 }

 .blog-left-side{
     flex: 0 0 70%;
     max-width: 70%;
 }

 .blog-right-side{
     flex: 0 0 30%;
     max-width: 30%;
 }


 .blog-section--flex{
     display: flex;
     justify-content: space-between;
 }

 .blog-main-description__inner{
    padding: 70px 57px;
    box-shadow: 0px 3px 6px #00000029; 
    background-color: #FFFFFF;
    position: relative;
    max-width: 755px;
    width: 100%;
    right: 70px;
    max-height: 400px;
    overflow: auto;
    scroll-behavior: smooth;
    p{
        color: #464646;
        line-height: 24px;
    }
 }

 .blog-main-description__inner::-webkit-scrollbar {
    width: 3px;
}

 .blog-main-description__inner::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(255, 255, 255); 
    border-radius: 10px;
}

.blog-main-description__inner::-webkit-scrollbar-thumb {
    border-radius: 9px;
    -webkit-box-shadow: inset 0 0 5px #56D9D4; 
}

 .arrow-back{
     margin:20px 0 96px 22px;
     cursor: pointer;

 }

 .blog-main-title{
     margin-bottom: 32px;
     margin-left: 22px;
     h2{
         font-size: 30px;
         color: #464646;
     }
 }

 .blog-publication-date{
     p{
         font-size: 13px;
         color: #8B8686;
     }
 }

 .blog-requaired-tags{
     span{
         font-family: "larsseit-thinitalic";
         font-size: 13px;
         color: #8B8686;  
     }
 }

 .blog-main-description__inner{
     p{
       font-size: 20px;
       color: #464646;
     }
 }

 .sub-header--flex{
     margin-bottom: 20px;
     margin-left: 20px;
     max-width: 600px;
     width: 100%;
 }

 @media(max-width:1900px){
      .blog-left-side{
     height: 888px;
 }

  .blog-left-side{
     flex: 0 0 60%;
     max-width: 60%;
 }

 .blog-right-side{
     flex: 0 0 40%;
     max-width: 40%;
 }
 }


 @media(max-width:1600px){
     .blog-left-side{
     height: 600px;
 }

.arrow-back {
    margin: 20px 0 29px 22px;
}

.blog-main-title {
    margin-bottom: 15px;
}
.blog-main-title h2 {
    font-size: 22px;
}

.blog-main-description__inner {
    padding: 39px 49px;
    max-width: 550px;
    right: 42px;
}

.blog-main-description__inner p {
    font-size: 17px;
}

.sub-header--flex {
    max-width: 490px;
}

 .inner-blog-section{
    top: 80px;
 }

 }


 @media(max-width:768px){
     .blog-section--flex{
         flex-wrap: wrap;
     }

     .sub-header--flex--mob{
         display: block;
     }

    .blog-left-side {
    flex: 0 0 100%;
    max-width: 100%;
    }

    .blog-main-description__inner{
    max-height: unset;
    overflow: unset;
 }

    .blog-right-side {
    flex: 0 0 100%;
    max-width: 100%;
   } 

   .blog-main-description__inner{
       position: unset;
       max-width: unset;
       box-shadow: unset;
   }

   .blog-main-title{
    margin-left: 20px;
    margin-right: 20px;
   }
   
   .blog-main-description__inner{
       padding: 30px 20px;
   }
   .sub-header--flex{
      display: none;
   }

   .arrow-back {
    margin: 20px 0 20px 20px;
  }

  .blog-main-title h2 {
    font-size: 20px;
}

.blog-publication-date p {
    font-size: 12px;
}

.blog-requaired-tags span {
    font-size: 12px;
}


 }


@media(max-width:576px){
    .blog-left-side {
    height: 251px;
}

 .inner-blog-section{
    top: 55px;
 }
 .blog-main-description__inner {
    padding: 20px 20px;
}
}
</style>