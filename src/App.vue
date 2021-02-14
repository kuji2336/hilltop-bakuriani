<template>
<the-header></the-header>
<div id="mainPanel">
     <router-view></router-view>
     <the-footer></the-footer>
</div>
</template>

<script>
import TheHeader from "@/includes/TheHeader";
import TheFooter from "@/includes/TheFooter";
import {mapActions} from "vuex"

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,

  },



  methods:{
     ...mapActions("blogs", ["RecieveBlogs"]),
     getBlogs(){
        this.RecieveBlogs()
     },

     recieveStoredLanguage(){
         this.$store.state.translateLang = localStorage.getItem('storedLang');
     }
  },

  created() {
    this.recieveStoredLanguage();
    this.getBlogs();
  },
};
</script>
 
<style>
/* GLOBAL STYLES */

html{
  overflow-x: hidden;
  height: 100%;
}

body{
  overflow-x: hidden;
}
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

input,
input:before,
input:after {
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
}

input:focus {
  outline: none;
}

button:focus {
  outline: none !important;
}
a {
  color: inherit;
}

a:hover {
  color: inherit;
  text-decoration: none;
}

ul li {
  list-style-type: none;
  text-decoration: none;
}
ul {
  padding: 0px;
  margin: 0px;
}
p {
  margin-bottom: 0px;
}

img {
  border-style: none;
}

@font-face {
  font-family: "caslon-medium";
  src: url(assets/fonts/BigCaslonMedium.ttf);
}

@font-face {
  font-family: "larsseit-light";
  src: url(assets/fonts/Larsseit-Light.otf);
}

@font-face {
  font-family: "larsseit-thinitalic";
  src: url(assets/fonts/Larsseit-ThinItalic.otf);
}

@font-face {
  font-family: "larsseit-medium";
  src: url(assets/fonts/Larsseit-Medium.otf);
}



@font-face {
  font-family: "larsseit-thin";
  src: url(assets/fonts/Larsseit-Thin.otf);
}


@font-face {
  font-family: "mishafi-gold";
  src: url(assets/fonts/Mishafi-Gold.ttf);
}

/* geo fonts */

@font-face {
  font-family: "bpg-arial-caps";
  src: url(assets/fonts/bpg-arial-caps-webfont.ttf);
}

@font-face {
  font-family: "bpg-nateli-mtavruli";
  src: url(assets/fonts/bpg-nateli-mtavruli-webfont.ttf);
}

@font-face {
  font-family: "bpg-nateli-regular";
  src: url(assets/fonts/bpg-nateli-webfont.ttf);
}


@font-face {
  font-family: "bpg-arial-regular";
  src: url(assets/fonts/bpg-arial-webfont.ttf);
}

@font-face {
  font-family: "bpg-rioni-regular";
  src: url(assets/fonts/bpg-rioni-contrast-webfont.ttf);
}

@font-face {
  font-family: "larseit-thinLight-italic";
  src: url(assets/fonts/Larsseit-LightItalic.otf);
}

/* dynamic fonts */
@import './assets/css/dynamicFonts.css';





body{
  position: relative;
}


.img-fluid{
  width: 100%;
  max-width: 100%;
}

.overlay{
     position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    opacity: 0.0;
    z-index : 111111111111111;
    background-color: #000000;
    display: block;
}

.slide-out-left {
	-webkit-animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}

.slide-in-left {
	-webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
