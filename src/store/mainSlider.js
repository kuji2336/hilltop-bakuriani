export default {
    namespaced: true,
    state() {
        return {
            mainSlider: [],
        }
    },

    getters: {
        mainSliderDetails(state) {
            return state.mainSlider
        },
    },

    mutations: {
        /* recieve main slider data */
        mainSliderInfo(state, response) {
            state.mainSlider = response
        },
    },

    actions: {
        /* get about contact info */
        RecieveMainSliderAPI({commit,rootState}) {
            var url = "https://www.hilltop.ge/api/slider/"
            fetch(url,{
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
                .then((res) => res.json())
                .then((_sliderInfo) => commit("mainSliderInfo", _sliderInfo))
        },

    },

}