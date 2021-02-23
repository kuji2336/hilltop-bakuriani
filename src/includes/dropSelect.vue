<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false; rotation = false;" >
    <div
      class="selected"
      :class="{ open: open }"
      @click="
        open = !open;
        rotation = true;
      "
    >
      <div class="checked-wrapper">
        <p :class="{ dynamiccolor: headerIsVisiable }">{{ selected }}</p>
        <img
          :src="require(`@/assets/img/down1.svg`)"
          class="costum-position"
          :class="{ 'change-color': headerIsVisiable, rotate: rotation }"
        />
      </div>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          rotation = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false,
      rotation: false,
    };
  },
  methods: {
    giveResult() {
      this.$emit("input", this.selected);
    },

    removeRotation(){
      this.rotation = false
    },

     setSelectedLanguageAfterLoad(){
      const storedLanguage = localStorage.getItem('storedLang')
      if(storedLanguage === "ka"){
        this.selected = "geo"
      }
      else if(storedLanguage === "en"){
        this.selected = "eng"
      }
      else if(storedLanguage === "ru"){
        this.selected = "rus"
      }
      else{
        this.selected
      }
    } 
  },
  created(){
    this.setSelectedLanguageAfterLoad()
  },
  computed: {
    ...mapGetters(["headerIsVisiable"]),
  },


  


};
</script>


<style  lang="scss" scoped>
.custom-select {
  width: 100%;
  max-width: 63px;
  outline: none;
  line-height: 28px;
  position: relative;
}

.checked-wrapper {
  display: flex;
  align-items: center;
  text-transform: uppercase;
}

.dynamiccolor {
  color: #4a4a4a !important;
}

.selected {
  color: #ffffff;
  font-family: "larsseit-light";
}

.costum-position {
  position: relative;
  top: 3px;
}

.items {
  overflow: hidden;
  position: absolute;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #20797633;
  right: 3px;
  width: 50px;
  text-align: center;
  width: 63px;
}

.item {
  color: #4A4A4A;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  user-select: none;
  font-size: 22px;
  font-family: "larsseit-light";
  max-width: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  margin: 0 auto;
  widows: 100%;
  transition: 0.5s;
  text-transform: lowercase !important;
}


.item:hover {
 border-bottom: 1px solid #56D9D4;
  transition: 0.5s;
}

.selectHide {
  display: none;
}

.change-color {
  filter: invert(100%) sepia(95%) saturate(2%) hue-rotate(7deg) brightness(107%)
    contrast(101%);
}

.rotate {
  top: -5px;
  transform: rotate(180deg);
  transition: 0.3s;
}
.checked-wrapper{
  img{
    transition: .3s;
  }
}

@media(max-width:1600px){
  .items {
  right: 2px;
  width: 50px;
}

.item {
  padding-top: unset;
   padding-bottom: unset;
  font-size: 16px;
}
}

@media(max-width:768px){
  .selected {
  color: #4A4A4A;
  font-family: "larsseit-light";
}





.checked-wrapper img{
  filter: invert(100%) sepia(95%) saturate(2%) hue-rotate(7deg) brightness(107%) contrast(101%);
}

.items {
  position: relative;
  .item{
    text-transform: lowercase !important;
  }
}
}
</style>