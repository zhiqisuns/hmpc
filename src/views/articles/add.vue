<template>
  <div class="add-article">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>发布文章</my-breadcrumb>
      </template>
      <!-- 内容表单部分 -->
      <div class="form">
        <el-form :rules="rules" ref="myform" :model="form" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <quill-editor @blur="quillFn" @change="quillFn" v-model="form.content" :options="editorOption"></quill-editor>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group @change="changeCoverType" v-model="form.cover.type" >
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div class="cover-box" v-if="form.cover.type > 0 " >
              <my-cover
                v-for="(item, index) in form.cover.type"
                :key="index"
                v-model="form.cover.images[index]">
              </my-cover>
            </div>
            
            <!-- 处理自动, type === -1 -->
            <div class="cover-box" v-if="form.cover.type === -1">
              <my-cover
                v-for="(item, index) in (form.cover.images.length + 1)"
                :key="index"
                v-model="form.cover.images[index]">
              </my-cover>
            </div>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <my-channels v-model="form.channel_id"></my-channels>
            <!-- <my-channels @selectChange="handleChange"></my-channels> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addArticle(false)">发表</el-button>
            <el-button @click="addArticle(ture)" >存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue';
import MyChannels from '@/components/my-channels.vue';
import { reqAddArticle} from '@/api/articles';
import MyCover from '@/components/my-cover.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name:'add-article',
  components:{
    MyBreadcrumb,
    MyChannels,
    quillEditor,
    MyCover
  },
  data(){
    return{
      form:{
        title:'',
        content:'',
        image:'',
        channel_id:'',
        cover:{
          type:0,
          images:[]
        }
      },
      // 富文本配置对象
      editorOption: {
        // 占位配置
        placeholder: '',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      rules:{
        title: [
          { required: true, message: '请输入标题', trigger: ['blur', 'change'] },
          { min: 5, max: 30, message: '标题必须是5-30位', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: ['blur', 'change'] }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created(){
    this.loadChannels()
  },
  methods:{
    addArticle(isDraft){
      // console.log('频道ID',this.form.channel_id)
      this.$refs.myform.validate(async flag =>{
        if(flag){
          try{
            await reqAddArticle(isDraft, this.form)
            this.$message.success('发布成功')
            this.$router.push('/articles')
          }catch(err){
            console.log(err)
            this.$message.error('发布失败')
          }
        }
      })
    },
    quillFn(){
      console.log('失去焦点了, 或者值改变了')
      // 在失去焦点, 或者值改变时, 校验当前这个字段
      this.$refs.myform.validateField('content')
    },
    changeCoverType () {
      this.form.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
.add-article /deep/ .ql-editor {
  min-height: 300px;
}
.add-article /deep/ .ql-toolbar {
  padding: 0 8px;
}
</style>