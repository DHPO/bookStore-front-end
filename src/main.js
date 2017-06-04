import Vue from "vue";
import VueRouter from "vue-router"
Vue.use(VueRouter)

import tb from "./table.vue"
import App from "./app.vue"
import manage from "./manage.vue"
import modalTest from "./modalTest.vue"
import navbar from "./navbar.vue"

const routes = [
    {path:'/index',component:App},
    {path:"/modal/:id", name:"modal", component: modalTest},
    {path:"/table", component: tb},
    {path:"/", redirect:"/index"},
    {path:"/manage", component: manage}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: "#app",
    router,
    components:{navbar}
})