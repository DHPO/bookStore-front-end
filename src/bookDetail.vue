<template>
    <div>
        <img :src="'/img/'+book.img"></img>
    </div>
</template>

<script>
    export default{
        name: "bookDetail",
        data(){return {
            book:{}
        }},
        created(){
            var self = this;
            $.post("/getBookById", {id: this.$route.params.id}, (data)=>{
                self.book = data;
            })
        }
    }    
</script>

<style>

</style>
