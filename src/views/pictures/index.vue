<template>
    <div class="picture">
        <el-card>
            <template v-slot:header>
                <my-breadcrumb>素材管理</my-breadcrumb>
            </template>
            <!-- 内容部分 -->
            <div>
                <!-- 选择部分 -->
                <div class="top">
                    <el-radio-group v-model="collect" @change="changeCollect" size="medium">
                        <el-radio-button :label="false" >全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                    </el-radio-group>
                    <!-- 上传图片素材部分 -->
                    <el-button @click="showUpload" style="float:right;" type="success">上传图片素材</el-button> 
                    <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        :append-to-body="true"
                        width="30%"
                        :before-close="handleClose">
                        <span>上传文件</span>
                        <el-upload
                            :headers="headers"
                            name="image"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <el-image @load="handleLoad" v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>   
                    </el-dialog>
                </div>
                <!-- 具体图片部分 -->
                <div class="bottom">
                    <el-row :gutter="10">
                        <el-col v-for="item in images" :key="item.id" class="img_item" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                            <el-image
                                :src="item.url"
                                fit="cover">
                            </el-image>
                        </el-col>
                        <div class="option">
                            <span class="el-icon-star-off"></span>
                            <span class="el-icon-delete"></span>
                            <!-- <span :class="{ star: item.is_collected }" @click="switchCollect(item.id, item.is_collected)" class="el-icon-star-off"></span>
                            <span  @click="deleteImage(item.id)" class="el-icon-delete"></span> -->
                        </div>
                    </el-row>
                    <el-pagination
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        background
                        :page-size="per_page"
                        :current-page="currentPage"
                        :total="total_count">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue';
import { reqGetImages } from '@/api/pictures.js'
import {getUser} from '@/utils/storage.js'
export default {
    // name:'pictures',
    data(){
        return{
            choose:'',
            images:[],
            currentPage:1,
            per_page:12,
            total_count:0,
            collect:false,
            dialogVisible: false,
            imageUrl: '',
            headers: {
                Authorization: `Bearer ${getUser().token}`
            },
        }
    },
    components:{
        MyBreadcrumb
    },
    created(){
        this.loadImages()
    },
    methods:{
        // 在后面的分页，删除等操作中，加载图片会多次使用, 封装成方法
        async loadImages(){
            try{
                const res = await reqGetImages({
                    per_page : this.per_page,
                    page: this.currentPage,
                    collect: this.collect
                })
                this.images = res.data.data.images
                this.total_count = res.data.data.total_count
                console.log(this.images)
            }catch(err){
                console.log(err)
            }
        },
        handleCurrentChange (index) {
            this.currentPage = index
            this.loadImages()
            console.log(index)
        },
        // 改变当前页面函数
        changeCollect () {
            this.currentPage = 1
            this.loadImages()
        },
        // 显示上传函数
        showUpload(){
            this.dialogVisible = true
        },
        // 上传文件成功函数
        handleAvatarSuccess(res,file){
            // this.imageUrl = URL.createObjectURL(file.raw)
            // 预览图片
            console.log('图片',res.data.url)
            this.imageUrl = res.data.url
            this.$message.success('上传成功')
            // 重新渲染
            this.loadImages()
        },
        // 规定上传类型函数
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        // 在load回调中, 开两秒定时器, 关闭对话框, 重置预览地址
        handleLoad () {
            setTimeout(() => {
                this.dialogVisible = false
                this.imageUrl = null
            }, 2000)
        }
        // 收藏部分
        // async collectImage (id, collect) {
        //     try {
        //         // 发送收藏/取消收藏请求
        //         await reqCollectImage(id, !collect)
        //         this.$message.success('操作成功')
        //         this.loadImages()
        //     } catch (err) {
        //         this.$message.success('操作失败')
        //         console.log(err)
        //     }
        // },
        // 删除部分
        // async deleteImage (id) {
        //     try {
        //         await reqDeleteImages(id)
        //         this.$message.success('操作成功')
        //         this.loadImages()
        //     } catch (err) {
        //         this.$message.success('操作失败')
        //         console.log(err)
        //     }
        // }
    }
}
</script>

<style lang="less" scoped>
.bottom{
    margin-top: 15px;
}
.img_item {
    position: relative;
    box-sizing: border-box;
}
.option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
}
.avatar-uploader {
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
.el-pagination {
  margin-top: 20px;
}
.star {
    color: yellow;
}
</style>