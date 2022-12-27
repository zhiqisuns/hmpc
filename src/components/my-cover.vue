<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog">
        <img src="../assets/default.png"/>
    </div>
    <!-- 对话框部分 -->
    <el-dialog
        title="选择封面"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="720px">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="image">
                <!-- 素材库内容 -->
                <div class="top-box">
                    <el-radio-group @change="changeCollect" size="medium" v-model="collect">
                      <el-radio-button :label="false">全部</el-radio-button>
                      <el-radio-button :label="true">收藏</el-radio-button>
                    </el-radio-group>
                </div>
                <!-- 图片素材 -->
                <el-row :gutter="10" class="img_list">
                    <el-col 
                        v-for="item in images"
                        :key="item.id"
                        class="img_item" 
                        :class="{selected:selectedImageUrl === item.url}"
                        :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                        <el-image @click.native="imageClick(item)" style="height: 100px; width: 100%;" :src="item.url" fit="cover"></el-image>
                    </el-col>
                </el-row>
                <!-- 翻页 -->
                <el-pagination
                    layout="prev, pager, next"
                    background
                    :page-size="per_page"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                    :total="total_count">
                </el-pagination>
            </el-tab-pane>
            <!-- 上传图片部分 -->
            <el-tab-pane label="上传图片" name="upload">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL  + '/pictures'"
                    :show-file-list="false"
                    :headers="headers"
                    name="image"
                    :on-success="handleSuccess">
                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm" >确 定</el-button>
        </span>
    </el-dialog>
    <img :src="coverImgUrl" />
  </div>
</template>

<script>
import { reqGetImages } from '@/api/pictures';
import { getUser } from '@/utils/storage';
export default {
    data() {
        return {
            dialogVisible:false,
            activeName:'image',
            images:[],
            collect:false,
            per_page:6,
            currentPage:1,
            total_count:0,
            selectedImageUrl:null,
            imageUrl: '', // 预览的图片路径
            headers: {
            Authorization: `Bearer ${getUser().token}`
            },
            coverImgUrl:'../assets/default.png'
        }
    },
    methods:{
        openDialog(){
            this.dialogVisible = true
            this.loadImages()
        },
        async loadImages () {
            console.log('开始获取图片')
            try {
                const res = await reqGetImages({
                collect: this.collect, // 是否收藏
                per_page: this.per_page, // 每页几条
                page: this.currentPage // 请求的页码
                })
                this.images = res.data.data.images
                this.total_count = res.data.data.total_count
            } catch (err) {
                console.log(err)
            }
        },
        changeCollect(){
            this.currentPage = 1
            this.loadImages()
        },
        handleCurrentChange (index) {
            this.currentPage = index
            this.loadImages()
        },
        imageClick (image) {
            this.selectedImageUrl = image.url
            console.log(image.url)
        },
        handleSuccess (res, file) {
            console.log('文件上传完成了', res,file)
            this.imageUrl = res.data.url
            this.$message.success('上传成功')
        },
        handleConfirm(){
            if(this.activeName === 'image' ){
                if (!this.selectedImageUrl) {
                this.$message.error('请先选中一张图片')
                return
                }
                // 预览图片
                this.coverImgUrl = this.selectedImageUrl
            }else if(this.activeName === 'upload'){
                if (!this.imageUrl) {
                this.$message.error('请先上传一张图片')
                return
                }
                // 预览图片
                this.coverImgUrl = this.imageUrl
            }
            // 关闭对话框
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="less" scoped>
.btn_img{
    border: 1px dashed #ddd;
    width: 150px;
    height: 150px;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
// 素材列表
.img_list{
  margin-top: 15px;
  .img_item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.selected::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
}
.img_item{
    position: relative;
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
</style>