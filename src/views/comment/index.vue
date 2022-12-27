<template>
  <div class="commment">
    <el-card>
      <div slot="header">
        <my-breadcrumb>评论管理</my-breadcrumb>
      </div>
      <div>
        <el-table
          :data="comments"
          style="width: 100%">
          <el-table-column prop="title" label="文章标题" ></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数" ></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数" ></el-table-column>
          <el-table-column label="评论状态" >
            <template v-slot:default="obj">
              {{ obj.row.comment_status ? '关闭' : '开启' }}
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot:default="obj">
              <el-button @click="toggleComment(obj.row)" v-if="obj.row.comment_status" type="success">打开评论</el-button>
              <el-button @click="toggleComment(obj.row)" v-else type="danger">关闭评论</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        background
        :page-size="per_page"
        :current-page="page"
        :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue';
import { reqGetComments , reqModCommentStatus} from '@/api/commen.js'
export default {
    // name:'Comment',
    data() {
      return {
        page:1,
        per_page:10,
        total_count:0,
        comments:[]
      }
    },
    components:{
      MyBreadcrumb
    },
    created(){
      this.loadComments()
    },
    methods:{
      async loadComments(){
        try{
          const res = await reqGetComments(this.page,this.per_page)
          this.comments = res.data.data.articles
          console.log('评论',this.comments)
          this.total_count = res.data.data.total_count
        }catch(err){
          console.log('出错啦',err)
        }
      },
      handleCurrentChange(index){
        this.page = index
        this.loadComments()
      },
      async toggleComment (row) {
        try {
          await reqModCommentStatus(row.id.toString(), !row.comment_status)
          this.$message.success('操作成功')
          this.loadComments()
        } catch (err) {
          this.$message.error('操作失败')
          console.log(err)
        }
      }
    }
}
</script>

<style>

</style>