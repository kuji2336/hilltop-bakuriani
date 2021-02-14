import {createRouter, createWebHistory} from "vue-router";
import mainSlider from '../components/mainSlider';
import innerBlog from "../components/innerBlog"
const routes = [
 {path: '/', name:'home',  component:mainSlider,
children:[
    {path: '/roomtype/:roomtypeslug', name:'roomtype',   query:{roomprice:''}, component:()=>import(/* webpackChunkName: "galerySlider" */ '../includes/galerySliderModal')},
]
},

{path:"/blogdetail/:slug", name:'blogdetail', component:innerBlog},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from) {
        if (to.name === "blogdetail") {
          return {
            el: "#blog-in", top:"100%",  behavior: 'smooth',};
        }

        if (from.hash === "#blog-in") {
          return {
            el: "#blog"};
        }

      },
    });

export default router