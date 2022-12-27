<template>
  <div class="setting">
    <el-card>
        <div slot="header">
          <my-breadcrumb>个人设置</my-breadcrumb>
        </div>
        <el-row>
            <el-col :span="12">
                <el-form label-width="120px">
                    <el-form-item label="编号：">100</el-form-item>
                    <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
                    <el-form-item label="媒体名称：">
                      <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体简介：">
                      <el-input type="textarea" v-model="userInfo.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="联系邮箱：">
                        <el-input v-model="userInfo.email"></el-input>
                      </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="save">保存设置</el-button>
                    </el-form-item>
                  </el-form>
            </el-col>
            <el-col :span="12">
                <!-- 上传组件 action必须属性-->
                <el-upload
                class="avatar-uploader"
                action=""
                :http-request="uploadPhoto"
                :show-file-list="false">
                <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="edit-photo">修改头像</p>
            </el-col>
        </el-row>
    </el-card>    
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue';
import { reqGetUserInfo , reqModUserProfile , reqModUserImage} from '@/api/user';
export default {
    // name:"Settings",
    data(){
        return{
            userInfo:{
                name:'',
                intro:'',
                email:'',
                mobile:'',
                photo:''
            },
            imageUrl:null
        }
    },
    components:{
        MyBreadcrumb
    },
    created(){
        this.loadUserInfo()
    },
    methods:{
        async loadUserInfo(){
            try{
                const res = await reqGetUserInfo()
                this.userInfo = res.data.data
            }catch(e){
                console.log(e)
            }
        },
        // 保存修改 
        async save () {
            try {
                const { name, intro, email } = this.userInfo
                await reqModUserProfile({ name, intro, email })
                this.$message.success('修改成功')
            } catch (e) {
                console.log(e)
                this.$message.error('修改失败')
            }
        },
        // 修改头像
        async uploadPhoto (obj) {
            try {
                // 1. 取出要上传的文件
                const { file } = obj
                // 2. 调用接口, 进行上传
                const formData = new FormData()
                formData.append('photo', file)
                const res = await reqModUserImage(formData)
                this.$message.success('上传头像成功')
                // 3. 更新数据
                this.userInfo.photo = res.data.data.photo
                this.$eventBus.$emit('update_user_photo',this.userInfo.photo)
            } catch (e) {
                console.log(e)
                this.$message.error('头像上传失败')
            }
        }
    }
}
</script>

<style lang="less">
.avatar{
    width: 178px;
    height: 178px;
    line-height:178px
}
.avatar-uploader{
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.edit-photo{
  font-size: 12px;
  text-align: center;
}
</style>