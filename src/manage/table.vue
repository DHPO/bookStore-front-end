<template>
    <div id="tb">
        <table class="table table-striped table-condensed table-bordered">
            <tbody>
            <tr>
                <th v-for="attr in Object.keys(attrs)" :key="attr">{{attr}}</th>
                <th>
                    <button class="btn btn-success" @click="create()">创建</button>
                    <button class="btn btn-primary" @click="refresh()">刷新</button>
                </th>
            </tr>
            <tr v-for="data in datas" :key="data">
                <td v-for="attr in Object.keys(attrs)" :key="attr">{{data[attr]}}</td>
                <td>
                    <button class="btn btn-success" @click="edit(data)">编辑</button>
                    <button class="btn btn-danger" @click="delConfirm(data)">删除</button>
                </td>
            </tr>
            <tr v-show="status!=0">
                <td v-for="attr in Object.keys(attrs)" :key="attr"><input v-model="editData[attr]" :disabled="attrs[attr] != 0 && !(status==2 && attrs[attr] == 3)"></input></td>
                <td>
                    <button class="btn btn-success" @click="submit(editData)">提交</button>
                    <button class="btn btn-warning" @click="cancel()">取消</button>
                </td>
            </tr>
            </tbody>
        </table>

        <alert :show.sync="msgSucc" placement="top-right" :duration="3000" type="success" width="300px">
            <span class="glyphicon glyphicon-ok-sign" ></span>
            <strong>操作成功</strong>
        </alert>

        <alert :show.sync="msgFail" placement="top-right" :duration="3000" type="danger" width="300px">
            <span class="glyphicon glyphicon-remove-sign"></span>
            <strong>操作失败</strong>
        </alert>


        <modal :show.sync="showConfirm" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>确认删除</h4></div>
            <div slot="modal-body" class="modal-body">
                <p>你确定要删除吗</p>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showConfirm=false">取消</button>
                <button class="btn btn-danger" @click="del()">确认删除</button>
            </div>
        </modal>

    </div>
</template>

<script>
    //import Vue from "vue";
    //import BootStrapVue from "bootstrap-vue";
    //Vue.use(BootStrapVue);

    //import {bAlert, bModal} from 'bootstrap-vue/lib/components'
    import {modal, alert} from "vue-strap"

    export default {
        name:"tb",
        components:{/*bAlert, bModal,*/ modal, alert},
        props:{attrs:{required:true}, tableURL:{required: true}},
        data(){return {
            status:0,
            datas:[],
            editData:{},
            ajaxStatus: 0,
            delBuf: -1,
            msgSucc: false,
            msgFail: false,
            showConfirm: false
        };},
        methods:{
            edit(data){
                for (var attr in this.attrs){
                    this.editData[attr] = data[attr];
                    console.log(attr+":"+data[attr]);
                }
                console.log(JSON.stringify(this.editData));
                this.status = 1;
            },
            create(){
                this.editData = {}; 
                for(var attr in this.attrs){
                    if(this.attrs[attr] == 2)
                        this.editData[attr] = "auto";
                }
                this.status = 2;
            },
            cancel(){this.status = 0;},
            delConfirm(data){
                this.delBuf = {};
                for(var attr in this.attrs){
                    if(this.attrs[attr] >= 2)
                        this.delBuf[attr] = data[attr];
                }
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
                    var postBody = {};
                    for(var attr in this.attrs){
                        if(this.attrs[attr] != 2){
                            postBody[attr] = data[attr];
                        }
                    }
                    this.ajax("insert", postBody);
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
                         self.msgSucc = true;
                         setTimeout(()=>{self.msgSucc=false}, 2000);
                         self.refresh();
                     }else{
                         self.ajaxStatus = -1;
                         self.msgFail = true;
                         setTimeout(()=>{self.msgFail=false}, 2000);
                     }
                 }).fail(function(){
                     self.ajaxStatus = -1;
                     self.msgFail = true;
                     setTimeout(()=>{self.msgFail=false}, 2000);
                 })
             }
        },
        created(){
            this.refresh();
        }
    }
</script>

<style>
    table{width:80% !important; margin-left:10%;}
    th, td, td>input{text-align: center; width:150px !important;}
</style>
