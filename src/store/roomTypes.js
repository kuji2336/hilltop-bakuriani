
export default {
    namespaced:true,
    state() {
        return {
            roomTypesDetails: [],
        }
    },

    getters: {
        roomTypesMainDetails(state) {
            return state.roomTypesDetails
        }
    },

    mutations: {
        /*recieve room types */
        getRoomtypes(state, response) {
            state.roomTypesDetails = response
        },
    },

    actions: {
        /* get room types info */
        RecieveRoomTypesAPI({commit,rootState}) {
            var url = "https://www.hilltop.ge/api/room-types";
            fetch(url, {
                method:"GET",
                headers:{
                    "Accept-Language":rootState.translateLang
                }
            })
                .then((res) => res.json())
                .then((_roomtypes) => commit("getRoomtypes", _roomtypes))
        },

    },

}