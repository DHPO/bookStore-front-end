<template>
<div>
    
    <div class="btn-group">
        <button v-for="table in Object.keys(tables)" type="button" class="btn btn-default" :class="{active: table == showTable}" @click="showTable = table">{{table}}</button>
    </div>
   
    <div id="tables">
        <tb v-for="table in Object.keys(tables)" v-if="showTable == table" :attrs="tables[table]" :tableURL="table" :key="table"></tb>
    </div>
</div>
</template>

<script>
    import tb from "./table.vue"
    import {buttonGroup, checkbox} from "vue-strap" 

    export default{
        name:"manage",
        data(){return {
            tables:{
                Book:{id:2, name:0, price:0},
                User:{id:2, name:0, password:0, email:0},
                Order:{orderid:2, userid:0},
                OrderItem:{orderid:3, bookid:3, price:0, amount:0}
            },
            showTable:"Book"
        }},
        methods:{
            switchTable(table){this.showTable = table; console.log(table);}
        },
        components:{tb, buttonGroup, checkbox}
    }    
</script>

<style>
    .btn-group, table, th{text-align: center!important; margin-top: 25px;}
    input{text-align: center!important;}
    .btn-group{margin-left: 35%;}
</style>
