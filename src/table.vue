<template>
    <div id="tb">
        <table class="table table-striped table-condensed table-bordered">
            <tbody>
            <tr>
                <th v-for="attr in attrs">{{attr}}</th>
                <th>
                    <button class="btn btn-success" @click="create()">创建</button>
                    <button class="btn btn-primary" @click="refresh()">刷新</button>
                </th>
            </tr>
            <tr v-for="data in datas">
                <td v-for="attr in attrs">{{data[attr]}}</td>
                <td>
                    <button class="btn btn-success" @click="edit(data)">编辑</button>
                    <button class="btn btn-danger" @click="delConfirm(data)">删除</button>
                </td>
            </tr>
            <tr v-show="status!=0">
                <td v-for="attr in attrs"><input v-model="editData[attr]"></input></td>
                <td>
                    <button class="btn btn-success" @click="submit(editData)">提交</button>
                    <button class="btn btn-warning" @click="cancel()">取消</button>
                </td>
            </tr>
            </tbody>
        </table>

       <!-- <b-alert variant="success" dismissible :show="msgSucc" @dismiss-count-down="msgSucc-=1">
            <h4>信息</h4>
            <p>操作成功</p>
        </b-alert>

        <b-alert variant="danger" dismissible :show="msgFail" @dismiss-count-down="msgFail-=1"> 
            <h4>信息</h4>
            <p>操作失败</p>
        </b-alert>

        <b-modal id="modal1" title="确认删除" @ok="del()" v-model="showConfirm">
            <p>你确定要删除吗?</p>
        </b-modal> -->

        <modal :show.sync="showConfirm" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>确认删除</h4></div>
            <div slot="modal-body" class="modal-body">
                <p>你确定要删除吗</p>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showConfirm=false">取消</button>
                <button class="btn btn-success" @click="del()">确认</button>
            </div>
        </modal>

    </div>
</template>

<script>
    //import Vue from "vue";
    //import BootStrapVue from "bootstrap-vue";
    //Vue.use(BootStrapVue);

    //import {bAlert, bModal} from 'bootstrap-vue/lib/components'
    import {modal} from "vue-strap"

    export default {
        name:"tb",
        components:{/*bAlert, bModal,*/ modal},
        props:{attrs:{required:true}, tableURL:{required: true}},
        data(){return {
            status:0,
            datas:[],
            editData:{},
            ajaxStatus: 0,
            delBuf: -1,
            msgSucc: 0,
            msgFail: 0,
            showConfirm: false
        };},
        methods:{
            edit(data){
                for (var attr in data){
                    this.editData[attr] = data[attr];
                }
                this.status = 1;
            },
            create(){this.editData = {}; this.status = 2;},
            cancel(){this.status = 0;},
            delConfirm(data){
                this.delBuf = {"id": data["id"]};
                this.showConfirm = true; 
            },
            del(){
                this.showConfirm = false;
                this.ajax("delete", this.delBuf);
            },
            submit(data){
                if(this.status == 1){ // edit
                    this.ajax("update", data);
                }else{ // create
                    this.ajax("insert", data);
                }
                if(this.ajaxStatus == 1){
                    this.ajaxStatus = 0;
                }
            },
            refresh(){
                var self = this;
                $.get("/get"+this.tableURL, function(data, status){
                    self.datas = data; 
                })
             },
             ajax(movement, data){
                 var self = this;
                 $.post('/'+movement+this.tableURL, data, (data)=>{
                     if(data == 1){
                         self.ajaxStatus = 1;
                         self.status = 0;
                         self.msgSucc = 10;
                         self.refresh();
                     }else{
                         self.ajaxStatus = -1;
                         self.msgFail = 10;
                     }
                 }).fail(function(){
                     self.ajaxStatus = -1;
                     self.msgFail = 10;
                 })
             }
        },
        created(){
            this.refresh();
        }
    }
</script>

<style>
    table{width:80% !important;}
    th, td, input{width:150px !important;}
</style>
