export default {
    namespaced: true,
    state() {
        return {
            contact:[],
        }
    },

    getters: {
        contactInfo(state){
            return state.contact
           },
    },

    mutations: {
     /* recieve contact info */
     getContactInfo(state, response){
        state.contact = response
      },
    },

    actions: {
        /* get about contact info */
        RecieveContactAPI({commit,rootState}){
            var url = "https://www.hilltop.ge/api/contact/";
            fetch(url,{
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
            .then((res)=> res.json())
            .then((_contact) => commit("getContactInfo", _contact))
        },

    },

}