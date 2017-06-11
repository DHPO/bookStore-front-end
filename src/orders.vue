<template>
<div>
    <order v-for="order in orders" :books="order" key="order"></order>
</div>
</template>

<script>
    import order from "./order.vue"

    export default{
        name:"orders",
        components:{order},
        data(){
            return {
                orders:[]
            };
        },
        created(){
            var self = this;
            $.get("/getUserOrders",(data)=>{
                self.orders = data;
            })
        }
    } 
</script>

<style>

</style>
