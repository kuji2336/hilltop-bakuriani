
import {createStore} from 'vuex';
import roomType from "@/store/roomTypes"
import aboutHilltop from '@/store/aboutHilltop';
import contact from '@/store/contact';
import mainSlider from '@/store/mainSlider';
import blogs from './blogs';
import services from "./services"
const store = createStore({
    modules:{
      room: roomType,
      about:aboutHilltop,
      contact:contact,
      mainSlider:mainSlider,
      blogs:blogs,
      services:services,
    },
    state() {
        return {
            isVisiable:false,
            videoVisibility:false,
            sideNavVisibility:false,
            galerySliderModal:false,
            translateLang: 'en',
            testx:false,
            MobheaderIsVisiable: false,
        }
    },

    mutations: {
    /* check navbar visibility */
    textCallback(state,payload){
       state.isVisiable  = payload
    },

    /* check videobar visibility */
       CheckvideoVisibility(state,payload){
        state.videoVisibility  = payload
    },

    mobHeaderVisibility(state, payload){
       state.MobheaderIsVisiable = payload
    },

     /* check sidebar mob visibility */
    ChecksideNavVisibility(state,payload){
        state.sideNavVisibility  = payload
    },

     /* galery modal visibility */
    CheckgaleryModalVisibility(state,payload){
        state.galerySliderModal = payload
    },

    setTranslateLang(state, fallback){
        state.translateLang = fallback

    }


    },
    getters: {

        headerIsVisiable(state){
          return state.isVisiable
        },

        mobHeaderIsVisiable(state){
            return state.MobheaderIsVisiable
        },

        VideoIsVisiable(state){
            return state.videoVisibility
        },

        sideNavIsVisiable(state){
            return state.sideNavVisibility
        },

        galeryModalIsVisible(state){
          return state.galerySliderModal
        },

        translateLanguage(state){
            return state.translateLang
        }
    },

    actions: {
    

    },


})



export default store;