
export default {
    namespaced:true,
    state() {
        return {
           services: [],
        }
    },

    getters: {
        servicesDetails(state) {
            return state.services
        }
    },

    mutations: {
        /*recieve room types */
        getServices(state, response) {
            state.services = response
        },
    },

    actions: {
        /* get room types info */
        RecieveServicesAPI({commit,rootState}) {
            var url = "https://www.hilltop.ge/api/service/";
            fetch(url, {
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
                .then((res) => res.json())
                .then((_services) => commit("getServices", _services))
        },

    },

}