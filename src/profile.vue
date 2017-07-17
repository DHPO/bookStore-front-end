<template>
    <div id="profile">
        <div>用户名：
            <input v-model="profile.name" disabled></input>
        </div>
        <div>头像:
            <el-upload class="avatar-uploader" action="file" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="profile.photoId!=undefined&&profile.photoId!=''" :src="'/file/'+profile.photoId" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div>密码：
            <input v-model="profile.password" type="password"></input>
        </div>
        <div>邮箱：
            <input v-model="profile.email"></input>
        </div>
        <div>
            <button @click="submit()">提交</button>
        </div>
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profile: {},
            message: "",
            imageId:""
        }
    },
    methods: {
        loadProfile() {
            let self = this;
            $.get("/getUserBySession", data => {
                self.profile = data;
            }, "json").fail(() => {
                self.message = "登录超时";
                setTimeout(() => { self.message = "" }, 2000);
            })
        },
        submit() {
            let self = this;
            $.post("/updateProfile", this.profile, data => {
                if (data == 1) {
                    self.message = "修改成功";
                    setTimeout(() => { self.message = "" }, 2000);
                    this.loadProfile();
                }
                else if (data == -1) {
                    self.message = "登录超时";
                    setTimeout(() => { self.message = "" }, 2000);
                }
            })
        },

        handleAvatarSuccess(res, file) {
            this.profile.photoId = res;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        this.loadProfile();
    }
}
</script>

<style>
#profile>div {
    margin: 20px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
input.el-upload__input{display:none!important;}
</style>


