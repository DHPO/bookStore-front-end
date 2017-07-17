<template>
<div>
    <div id="wrapper">
        <div id="left">
            <img v-if="book.img!=undefined" :src="'/img/'+book.img" id="cover"></img>
        </div>
        <div id="right">
            <p id="name"><b>{{book.name}}</b></p>
            <p id="author">作者: {{book.author}}</p>
            <p id="publisher">出版社: {{book.publisher}}</p>
            <p id="comment">评分: {{book.comment | currency('', 1)}}/5.0</p>
            <p id="price"><b>价格: {{book.price | currency('￥', 2)}}</b></p>
            <div>
                加入购物车：
                <button class="btn btn-default" :disabled="amount<=0" @click="minus()">-</button>
                <input id="amount" class="input" v-model="amount"/>
                <button class="btn btn-default" @click="plus()">+</button>
                <button class="btn btn-success" :disabled="amount==amountOrigin" @click="submit()">确定</button>
                <button class="btn btn-warning" v-show="amount!=amountOrigin" @click="cancel()">取消</button>
            </div>
        </div>
    </div>

    <alert :show.sync="msgShow" placement="top-right" :duration="3000" :type="msgType" width="300px">
        <span class="glyphicon glyphicon-info-sign" ></span>
        <strong>{{msg}}</strong>
    </alert>
</div>
</template>

<script>
    import filter from "vue2-filters"
    import Vue from "vue"
    Vue.use(filter)
    import {alert} from "vue-strap"

    export default{
        name: "bookDetail",
        components:{alert},
        data(){return {
            book:{},
            amount: 0,
            amountOrigin: 0,
            dirty: false,
            msg:"",
            msgType:"warning",
            msgShow:false
        }},
        created(){
            var self = this;
            $.post("/getBookById", {id: this.$route.params.id}, (data)=>{
                self.book = data.book;
                if(data.num == -1)
                    data.num = 0;
                self.amountOrigin = data.num;
                self.amount = data.num;
            })
        },
        methods:{
            minus(){this.amount -= 1;},
            plus(){this.amount += 1;},
            cancel(){this.amount = this.amountOrigin; this.dirty = false;},
            submit(){
                var self = this;
                $.post("/updateBookNumInCart",{id: this.book.id, num: this.amount}, (data)=>{
                    if(data == -1){
                        self.showMsg("danger", "请先登录");
                    }else if(data == 1){
                        self.amountOrigin = self.amount;
                        self.showMsg("success", "操作成功");
                    }
                }).fail(()=>{
                    self.showMsg("warning","网络异常");
                })
            },
            showMsg(msgType, msgContent){
                this.msgType = msgType;
                this.msg = msgContent;
                this.msgShow = true;
                setTimeout(()=>{this.msgShow = false}, 2000);
            }
        }
    }    
</script>

<style>
    #wrapper{width: 90%;margin-left:auto;}
    #left{width:30%; float:left;}
    #right{width:90%;}
    p{font-size: 20px;}
    img#cover{width:60%; margin-left:auto;}
    #name{font-size: 30px;}
    #price{color:red; font-size: 22px;}
    #amount{width:150px;}
</style>
