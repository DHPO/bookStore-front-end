<template>
<div id="cart">
    <table class="table table-striped table-condensed table-bordered">
        <tbody>
            <tr>
                <th>书名</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价</th>
                <th>操作</th>
            </tr>
            <tr v-for="book in books">
                <td>{{book.name}}</td>
                <td>{{book.price | currency('￥')}}</td>
                <td>
                    <button class="btn" @click="book.num -= 1">-</button>
                    <input v-model="book.num" class="input" />
                    <button class="btn" @click="book.num += 1">+</button>
                </td>
                <td>{{(book.price*book.num) | currency('￥')}}</td>
                <td>
                    <button class="btn btn-success" :disabled="book.num==numBuf[book.id]" @click="submit(book.id, book.num)">提交</button>
                    <button class="btn btn-warning" v-show="book.num!=numBuf[book.id]" @click="book.num=numBuf[book.id]">取消</button>
                    <button class="btn btn-danger" v-show="book.num==numBuf[book.id]" @click="del(book.id)">删除</button>
                </td>
            </tr>
            <tr>
                <td></td><td></td><td></td>
                <td>{{total | currency('￥')}}</td>
                <td>
                    <button class="btn btn-success" @click="submitCart()">提交订单</button>
                </td>
            </tr>
        </tbody>
    </table>

    <alert :show.sync="msgShow" placement="top-right" :duration="3000" :type="msgType" width="300px">
        <span class="glyphicon glyphicon-info-sign" ></span>
        <strong>{{msg}}</strong>
    </alert>

    <modal :show.sync="showConfirm" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>确认删除</h4></div>
            <div slot="modal-body" class="modal-body">
                <p>你确定要删除吗</p>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showConfirm=false">取消</button>
                <button class="btn btn-danger" @click="submit(idBuf, 0)">确认删除</button>
            </div>
        </modal>

</div>
</template>

<script>
    import Vue from "vue"
    import filters from "vue2-filters"
    Vue.use(filters)

    import {alert, modal} from "vue-strap"

    export default{
        name:"cart",
        components:{alert, modal},
        data(){return {
            books:{},
            numBuf:{},
            msg:"",
            msgType:"warning",
            msgShow:false,
            showConfirm:false,
            idBuf:-1
        };},
        methods:{
            del(id){
                this.idBuf = id;
                this.showConfirm = true;
            },
            submit(id, num){
                var self = this;
                $.post("/updateBookNumInCart",{id, num}, (data)=>{
                    if(data == -1){
                        self.showMsg("danger", "登录超时，请重新登录");
                    }else if(data == 1){
                        self.refresh();
                        self.showMsg("success", "操作成功");
                        self.showConfirm = false;
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
            },
            refresh(){
                var self = this;
                $.get("/getCart",(data)=>{
                    self.books = data;
                    for(var i in data){
                        self.numBuf[data[i].id] = data[i].num;
                    }
                })
            },
            submitCart(){
                var self = this;
                $.get("/submitCart",(data)=>{
                    if(data == 1){
                        self.showMsg("success", "提交成功");
                        self.refresh();
                    }else if(data == -1){
                        self.showMsg("danger", "登录超时，请重新登录");
                    }
                }).fail(()=>{
                    self.showMsg("warning", "网络异常");
                })
            }
        },
        computed:{
            total(){
                var total = 0;
                for(var i in this.books){
                    total += this.books[i].num * this.books[i].price;
                }
                return total;
            }
        },
        created(){
            this.refresh();
        }
    }
</script>

<style>

</style>
