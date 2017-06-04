<template>
    
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="#">在线书店</a>
    </div>
    <div>
        <ul class="nav navbar-nav" style="width:90%;">
            <li :class="{active:$route.path=='/index'}"><a href="#">首页</a></li>
            <li :class="{active:$route.path=='/book'}"><a href="#">书籍</a></li>
            <li :class="{active:$route.path=='/cart'}"><a href="#">购物车</a></li>
            <li v-if="$route.name=='modal'" :class="{active:$route.name=='modal'}"><a href="#">搜索</a></li>
            <li v-if="role >= 2" :class="{active:$route.path=='/manage'}"><a href="#/manage">管理</a></li>

            <login @login="updateRole()" @logout="role = 0"></login>
            <form class="navbar-form navbar-right" role="search">
                <div class="form-group">
                    <input v-model="searchContent" type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">提交</button>
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
