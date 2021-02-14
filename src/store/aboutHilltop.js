export default {
    namespaced: true,
    state() {
        return {
            aboutHillTop: [],
        }
    },

    getters: {
        aboutHilltop(state) {
            return state.aboutHillTop
        },
    },

    mutations: {
        /* recieve about information */
        getAboutInfo(state, response) {
            state.aboutHillTop = response
        },
    },

    actions: {
        /* get about company info */
        RecieveAboutAPI({commit,rootState}) {
            var url = "https://www.hilltop.ge/api/about/";
            fetch(url,{
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
                .then((res) => res.json())
                .then((_about) => commit("getAboutInfo", _about))
        },

    },

}