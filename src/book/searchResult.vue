<template>
<div>
    <div id="msg">{{msg}}</div>
    <div id="bookView">
        <bookcard v-for="book in books" :book="book" :key="book"></bookcard>
    </div>
</div>
</template>

<script>
    import bookcard from "./bookcard.vue"

    export default{
        name: "searchResult",
        components:{bookcard},
        data(){return {
            books:{},
            msg:""
        }},
        watch:{
            $route(){
                this.update();
            }
        },
        methods:{
            update(){
                var self = this;
                $.post("/search", {name: this.$route.params.name}, (data)=>{
                    self.books = data;
                    if(self.books.length == 0){
                        self.msg = "没有找到";
                    }else{
                        self.msg = "";
                    }
                }).fail(()=>{
                    self.$emit("fail");
                })
            }
        },
        created(){
            this.update();
        }
    }
</script>

<style>
    #bookView{width:90%; margin-left:auto;}
    #msg{font-size: 20px; text-align: center;}
</style>
