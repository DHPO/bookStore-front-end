<template>
    <div id="comp">
        <p>{{msg}}</p>
        <p>{{pram}}</p>
    </div>
</template>

<script>
    export default{
        name:"comp",
        props:["pram"],
        data(){
            return {msg:"Foo"};
        }
    }
</script>

<style>

</style>