export default {
    namespaced: true,
    state() {
        return {
            blogs:[],
        }
    },


    mutations: {
    /* recieve all blogs */
    getBlogInfo(state, response){
        state.blogs.push(response)
     },
    },

        getters: {
        BlogUrl(state){
           let data = null
             state.blogs.forEach(element => {
                data = element.next
            });
            return data

        }, 
        
        BlogInfo(state){
            return state.blogs
        }
    },

    actions: {
        /* recieve first 4 blog */
            RecieveBlogs({commit, rootState}){
            var url = "https://www.hilltop.ge/api/blog/"
            fetch(url,{
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
            .then((res) => res.json())
            .then((_blogs) => commit("getBlogInfo", _blogs))
        },

    },

}