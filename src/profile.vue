<template>
    <div id="profile">
        <div>用户名：<input v-model="profile.name" disabled></input></div>
        <div>密码：<input v-model="profile.password" type="password"></input></div>
        <div>邮箱：<input v-model="profile.email"></input></div>
        <div><button @click="submit()">提交</button></div>
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    data(){return {
        profile:{},
        message:""
    }},
    methods:{
        loadProfile(){
            let self = this;
            $.get("/getUserBySession", data=>{
                self.profile = data;
            }, "json").fail(()=>{
                self.message = "登录超时";
                setTimeout(()=>{self.message = ""}, 2000);
            })
        },
        submit(){
            let self = this;
            $.post("/updateProfile", this.profile, data=>{
                if(data == 1){
                    self.message = "修改成功";
                    setTimeout(()=>{self.message = ""}, 2000);
                    this.loadProfile();
                }
                else if(data == -1){
                    self.message = "登录超时";
                    setTimeout(()=>{self.message = ""}, 2000);
                }
            })
        }
    },
    created(){
        this.loadProfile();
    }
}
</script>

<style>
    #profile>div{margin:20px;}
</style>


