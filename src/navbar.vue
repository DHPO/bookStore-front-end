<template>
    
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-book"></span> 在线书店</a>
    </div>
    <div>
        <ul class="nav navbar-nav" style="width:90%;">
            <li :class="{active:$route.path=='/index'}"><a href="#">首页</a></li>
            <li :class="{active:$route.path=='/book'}"><a href="#/book">书籍</a></li>
            <li v-if="role >= 1" :class="{active:$route.path=='/cart'}"><a href="#/cart">购物车</a></li>
            <li v-if="$route.name=='search'" :class="{active:$route.name=='search'}"><a>搜索</a></li>
            <li v-if="role >= 2" :class="{active:$route.path=='/manage'}"><a href="#/manage">管理</a></li>

            <login @login="updateRole()" @logout="role = 0"></login>
            <form class="navbar-form navbar-right" role="search">
                <div class="form-group">
                    <input v-model="searchContent" type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default" @click="$router.push({name:'search', params:{name: searchContent}})">搜索</button>
            </form>
        </ul>
    </div>
    </div>
</nav>

</template>

<script>
    import login from "./login.vue"

    export default{
        name:"navbar",
        data(){return {
            searchContent:"",
            role:0
        };},
        methods:{
            updateRole(){
                if(localStorage.user != undefined){
                    this.role = JSON.parse(localStorage.user)["role"];
                }
            }
        },
        components:{login}
    }
</script>
    
<style>

</style>
