<template>
  <div class="articles">
    <!-- 上半部分 -->
    <el-card>
        <!-- 头部面包屑 -->
        <div slot="header">
            <my-breadcrumb>内容管理</my-breadcrumb>
        </div>
         <!-- 表单部分 -->
        <el-form label-width="80px">
            <el-form-item label="状态">
                <el-radio-group v-model="form.status" >
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                    <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="频道">
                <el-select clearable v-model="form.channel_id" placeholder="请选择频道">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
        </el-form>
    </el-card>
<!-- 下半部分 -->
    <el-card>
        <p class="sum">根据筛选条件共查询到 {{sum}} 条结果：</p>
        <el-table
            :data="articles"
            v-loading="loading"
            style="width: 100%">
            <el-table-column label="封面">
                <template v-slot:default="obj">
                    <el-image
                        style="width:150px;height:100px"
                        :src="obj.row.cover.images"
                        fit="cover">
                        <div slot="error">
                            <img src="@/assets/error.gif" style="width:150px;height:100px" >
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template v-slot:default="obj">
                    <el-tag v-if="obj.row.status===0">草稿</el-tag>
                    <el-tag v-if="obj.row.status===1" type="info">待审核</el-tag>
                    <el-tag v-if="obj.row.status===2" type="success">审核通过</el-tag>
                    <el-tag v-if="obj.row.status===3" type="warning">审核失败</el-tag>
                    <el-tag v-if="obj.row.status===4" type="danger">已删除</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="pubdate" label="发布时间">
                
            </el-table-column>
            <el-table-column label="操作">
                 <!-- 默认插槽 -->
                <template v-slot:default="obj">
                    <!-- {{ obj.row }} -->
                    <el-button @click="edit(obj.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="del(obj.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="10"
            :total="total_count">
        </el-pagination>
    </el-card>

    
    
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqGetArticles , reqGetChannels} from '@/api/articles'
export default {
    // name: 'Articles',
    data(){
        return{
            form:{
                status: null,
                channel_id: null,
                date: [],     
            },
            loading: false,
            sum:0,
            articles: [],
            total_count:0,
            currentPage:1,  //当前页码
            channels:[],
            // 筛选条件
            query:{
                begin_pubdate: null, // 开始日期
                end_pubdate: null, // 结束日期
                status: null, // 状态
                channel_id: null // 频道的 id
            }     
        }
    },
    components:{
        MyBreadcrumb
    },
    methods:{
        //获取文章列表，created中调用
        loadArticles () {
            this.loading = true
            // const [beginPubdate, endPubdate] = this.form.date || []
            reqGetArticles({
                ...this.query,
                page: this.currentPage,
                // begin_pubdate: beginPubdate,
                // end_pubdate: endPubdate,
                // status:this. form.status,
                // channel_id: this.form.channel_id || null
            }).then(res => {
                console.log('获取到的文章列表', res.data.data)
                this.articles = res.data.data.articles
                this.total_count = res.data.data.total_count
                this.sum=this.articles.length
                this.loading = false
            })
        },
        // 获取频道
        loadChannels(){
            reqGetChannels().then(res => {
                this.channels = res.data.data.channels
                console.log('频道',res.data.data.channels)
            })
        },
        // 页面改变时触发函数
        handleCurrentChange(index){
            this.currentPage = index
            this.loadArticles()
            console.log('页面触发函数',index)
        },
        search(){
            // 查询结束，重置页码
            this.currentPage = 1
            // 更新筛选条件
            const [beginPubdate, endPubdate] = this.form.date || []
            this.query = {
                begin_pubdate: beginPubdate, // 开始日期
                end_pubdate: endPubdate, // 结束日期
                status: this.form.status, // 状态
                channel_id: this.form.channel_id || null // 频道的 id
            }
            // 重新渲染
            this.loadArticles()
        },
        edit(id){
            console.log(id.toString())
            console.log(this)
            const articleId = id.toString()
            this.$router.push(`/edit-article/${articleId}`)
        },
        del(id){
            console.log(id.toString())
            // const articleId = id.toString()
            // this.$confirm('你确认要删除么?', '温馨提示', {
            //     type: 'warning'
            // }).then(() => {
            //     console.log(articleId)
            //     reqDeleteArticle(articleId).then(res => {
            //     console.log(res)
            //     // 删除成功
            //     this.$message.success('删除成功')
            //     // 重新加载当前页数据
            //     this.loadArticles()
            //     }).catch((err) => {
            //     this.$message.error('数据暂时无法删除哦')
            //     return errr
            //     })
            // }).catch(() => {
            //     console.log('取消删除')
            // })
        }
    },
    created(){
        this.loadArticles(),
        this.loadChannels()
    },
    mounted(){
        
    }
}

</script>

<style lang="less" scoped>
    .articles .el-card{
        margin-bottom: 20px;
        .sum{
            padding-bottom: 20px;
            border-bottom: 1px solid #EBEEF5;
        }
    }
</style>