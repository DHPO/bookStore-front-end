<template>
    <div id="bookView">
        <bookcard v-for="book in books" :book="book" :key="book"></bookcard>
    </div>
</template>

<script>
    import bookcard from "./bookcard.vue"

    export default{
        name: "bookview",
        components:{bookcard},
        data(){return {
            books:{}
        }},
        created(){
            var self = this;
            $.get("/getBookSimple", (data)=>{
                self.books = data;
            }).fail(()=>{
                self.$emit("fail");
            })
        }
    }
</script>

<style>
    #bookView{width:90%; margin-left:auto;}
</style>
