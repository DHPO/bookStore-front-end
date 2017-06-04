<template>
    <div>
        <tb :attrs="['id', 'name', 'price']" :tableURL="'Book'"></tb>
    </div>
</template>

<script>
    import tb from "./table.vue"

    export default{
        name:"manage",
        data(){return {
            tables:["Book"]
        }},
        components:{tb}
    }    
</script>

<style>

</style>
