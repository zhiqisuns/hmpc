<template>
  <div>
    <el-button @click="saveArticle(false)" type="primary">提交发布</el-button>
    <el-button @click="saveArticle(true)">存入草稿</el-button>
  </div>
</template>

<script>
import { reqGetArticleById , reqEditArticle} from '@/api/articles';
export default {
  // name:'edit-article'
  data(){
    return{
      form:{

      }
    }
  },
  created(){
    
  },
  methods:{
    async loadArticle (id){
      const res = await reqGetArticleById(id)
      this.form = res.data.data
    },
    saveArticle (draft) {
  // 在发送ajax前, 先校验表单, 通过了, 才请求
  this.$refs.myform.validate(async flag => {
    if (flag) {
      try {
        const id = this.$route.params.id
        await reqEditArticle(id, draft, this.form)
        this.$message.success('操作成功')
        this.$router.push('/articles')
      } catch (e) {
        console.log(e)
        this.$message.error('操作失败')
      }
    }
  })
},
  }
}
</script>

<style>

</style>