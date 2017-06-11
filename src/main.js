import Vue from "vue";
import VueRouter from "vue-router"
Vue.use(VueRouter)

import tb from "./table.vue"
import App from "./app.vue"
import manage from "./manage.vue"
import modalTest from "./modalTest.vue"
import navbar from "./navbar.vue"
import bookview from "./bookview.vue"
import searchResult from "./searchResult.vue"
import bookDetail from "./bookDetail.vue"
import cart from "./cart.vue"
import orders from "./orders.vue"

const routes = [
    {path:'/index',component:App},
    {path:"/modal/:id", name:"modal", component: modalTest},
    {path:"/table", component: tb},
    {path:"/", redirect:"/index"},
    {path:"/manage", component: manage},
    {path:"/book", component: bookview},
    {path:"/book/:id", name:"book", component: bookDetail},
    {path:"/search/:name", name:"search", component: searchResult},
    {path:"/cart", component:cart},
    {path:"/order", component:orders}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    el: "#app",
    router,
    components:{navbar}
})