import Vue from "vue";
import VueRouter from "vue-router"
Vue.use(VueRouter)

import App from "./app.vue"
import manage from "./manage/manage.vue"
import navbar from "./navbar.vue"
import bookview from "./book/bookview.vue"
import searchResult from "./book/searchResult.vue"
import bookDetail from "./book/bookDetail.vue"
import cart from "./cart&&order/cart.vue"
import orders from "./cart&&order/orders.vue"

const routes = [
    {path:'/index',component:App},
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