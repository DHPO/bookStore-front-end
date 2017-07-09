<template>
    <div id="sales">
        <div class="btn-group">
            <button @click="$router.push({name:'sales', params:{type: 'user'}})" :class="{active: $route.params.type=='user'}" class="btn btn-default">用户</button>
            <button @click="$router.push({name:'sales', params:{type: 'book'}})" :class="{active: $route.params.type=='book'}" href="#/sales/book" class="btn btn-default">书籍</button>
            <button @click="$router.push({name:'sales', params:{type: 'category'}})" :class="{active: $route.params.type=='category'}" href="#/sales/category" class="btn btn-default">类别</button>
        </div>
        <table class="table table-striped table-condensed table-bordered">
            <tbody>
            <tr>
                <th>{{titles[$route.params.type]}}</th>
                <th>总量</th>
                <th>总金额</th>
            </tr>
            <tr v-for="data in datas" :key="data">
                <td v-for="i in data" :key="i">{{i}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        data(){return {
            datas:[],
            urls:{"user": "/salesByUser", "book": "/salesByBook", "category": "/salesByCategory"},
            titles:{"user": "用户名", "book": "书名", "category": "类别"}
        }},
        methods:{
            loadData(){
                let self = this;
                $.get(this.urls[this.$route.params.type], data=>{
                    self.datas = data;
                })
            }
        },
        watch:{
            '$route'(to, from){
                this.loadData();
            }
        },
        created(){
            this.loadData();
        }
    }
</script>

<style>
    .btn-group, table, th{text-align: center!important; margin-top: 25px;}
    .btn-group{margin-left: 35%;}
</style>

