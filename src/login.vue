<template>
<div>
    <ul v-if="!ifLog" class="nav navbar-nav navbar-right"> 
        <li><a @click="regModal()"><span class="glyphicon glyphicon-user"></span> 注册</a></li> 
        <li><a @click="loginModal()"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li> 
    </ul> 
    <ul v-else class="nav navbar-nav navbar-right"> 
        <li><a href="#/profile"><span class="glyphicon glyphicon-user"></span> {{user["username"]}}</a></li> 
        <li><a @click="logout()"><span class="glyphicon glyphicon-log-out"></span> 退出</a></li> 
    </ul> 

        <modal :show.sync="showLoginModal" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>登录</h4></div>
            <div slot="modal-body" class="modal-body">
                <form id="login" class="bs-example bs-example-form" role="form">
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-user"></span>
                        <input v-model="loginBuf.username" placeholder="username" class="form-control"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-lock"></span>
                        <input type="password" v-model="loginBuf.password" placeholder="password" class="form-control" @keyup.enter="login()"></input>
                    </div>
                </form>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showLoginModal=false">取消</button>
                <button class="btn btn-success" @click="login()">登录</button>
            </div>
        </modal>
        <modal :show.sync="showRegModal" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>注册</h4></div>
            <div slot="modal-body" class="modal-body">
                <form id="reg" class="bs-example bs-example-form" role="form">
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-user"></span>
                        <input v-model="regBuf.name" placeholder="username" class="form-control"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-lock"></span>
                        <input type="password" v-model="regBuf.password1" placeholder="password" class="form-control"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-lock"></span>
                        <input type="password" v-model="regBuf.password2" placeholder="password repeat" class="form-control"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-envelope"></span>
                        <input v-model="regBuf.email" placeholder="email" class="form-control" @keyup.enter="register()"></input>
                    </div>
                </form>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showRegModal=false">取消</button>
                <button class="btn btn-success" @click="register()">注册</button>
            </div>
        </modal>

        <alert :show.sync="msgShow" placement="top-right" :duration="3000" :type="msgType" width="300px">
            <span class="glyphicon glyphicon-info-sign" ></span>
            <strong>{{msg}}</strong>
        </alert>

</div>
</template>

<script>
    import {modal, alert} from "vue-strap"

    export default{
        name:"login",
        components:{modal, alert},
        data(){return {
            ifLog: false,
            user:{},
            loginBuf:{username:"", password:""},
            regBuf:{name:"", password:"", email:""},
            showLoginModal:false,
            showRegModal: false,
            msgShow: false,
            msgType: "warning",
            msg: ""
        }},
        methods:{
            showMsg(msgType, msgContent){
                this.msgType = msgType;
                this.msg = msgContent;
                this.msgShow = true;
                setTimeout(()=>{this.msgShow = false}, 2000);
            },
            loginModal(){
                this.loginBuf = {};
                this.showLoginModal = true;
            },
            regModal(){
                this.regBuf = {};
                this.showRegModal = true;
            },
            login(){
                var self = this;
                $.post("/login", self.loginBuf, (data)=>{
                    if(data >= 1){
                        self.user.role = data;
                        self.user.username = self.loginBuf.username;
                        localStorage.user = JSON.stringify(self.user);
                        self.ifLog = true;
                        self.showLoginModal = false;
                        self.showMsg("success", "登录成功");
                        self.$emit("login");
                    }else{
                        self.showMsg("danger", "登录失败: 请检查你的用户名和密码");
                    }
                }).fail(()=>{
                    self.showMsg("danger", "登录失败: 网络异常");
                })

            },
            logout(){
                this.ifLog = false;
                $.get("/logout");
                localStorage.removeItem("user");
                this.$router.push({path:"/index"});
                this.$emit("logout");
                this.showMsg("info", "您已登出");
            },
            register(){
                var self = this;
                if(this.regBuf.name == "" || this.regBuf.password1 == "" || this.regBuf.password1 != this.regBuf.password2 || this.regBuf.email == ""){
                    this.showMsg("warning", "请检查您的输入");
                    return ;
                }
                var postBody = {};
                postBody.name = this.regBuf.name;
                postBody.password = this.regBuf.password1;
                postBody.email = this.regBuf.email;
                $.post("/register", postBody, (data)=>{
                    if(data >= 1){
                        self.user.role = 1;
                        self.user.username = self.regBuf.name;
                        localStorage.user = JSON.stringify(self.user);
                        self.ifLog = true;
                        self.showRegModal = false;
                        self.$emit("login");
                        self.showMsg("success", "注册成功");
                    }else{
                        self.showMsg("danger", "注册失败: 用户名重复");
                    }
                }).fail(()=>{
                    this.showMsg("danger", "注册失败: 网络异常");
                })
            }
        },
        created(){
            if(localStorage.user){
                this.user = JSON.parse(localStorage.user);
                this.ifLog = true;
                this.$emit("login");
            }
        }
    }    
</script>

<style>
    form#login .input-group, form#reg .input-group{margin:20px;}
</style>
