<template>
  <div class="fans">
    <el-card>
        <div slot="header">
          <my-breadcrumb>粉丝管理</my-breadcrumb>
        </div>
        <div>
          <el-tabs @tab-click="handleTabClick" v-model="activeName" type="card">
            <el-tab-pane label="粉丝列表" name="list">
              <div class="fans_list">
                <div class="fans_item" v-for="item in list" :key="item.id">
                  <el-avatar :size="80" :src="item.photo"></el-avatar>
                  <p>{{item.name}}</p>
                  <el-button type="primary" plain size="small">+关注</el-button>
                </div>
              </div>
              <!-- 分页 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="per_page"
                :current-page="page"
                @current-change="changePage"
                :total="total">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="img">
              <div ref="main" style="width: 600px; height:400px;"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue';
import { reqGetFans , reqGetFansStatistics } from '@/api/fans';
import echarts from 'echarts'
export default {
  data() {
    return {
      activeName:'list',
      page:1,
      per_page:10,
      total:0,
      list:[],
      circleUrl:' '
    }
  },
  components:{
      MyBreadcrumb
  },
  created(){
    this.getFans()
  },
  methods:{
    changePage(index){
      console.log(index)
    },
    async getFans(){
      try{
        const res = await reqGetFans(this.page,this.per_page)
        this.list = res.data.data.results
        this.total = res.data.data.total_count
        console.log(res.data.data.results)
      }catch(err){
        console.log(err)
      }
    },
    async handleTabClick(tab){
      if(tab.name === 'img'){
        console.log('画图')
        const res = await reqGetFansStatistics()
        // 得到的是一个对象 { gt50: 80, le18: 93 } le 小于 gt 大于
        // echarts需要的是两个数组(x, y), 后台传过来的数据, 需要进行加工
        const ages = res.data.data.ages
        const ageY = [] 
        const ageX = []
        for(const key in ages){
          ageY.push(ages[key])
          ageX.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
        }
        // 使用echarts画图
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(this.$refs.main)
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '粉丝人数柱状图'
          },
          tooltip: {},
          legend: {
            data: ['粉丝人数']
          },
          xAxis: {
            data: ageX
          },
          yAxis: {},
          series: [{
            name: '人数',
            type: 'bar',
            data: ageY
          }]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      
      }
    }
  }

}
</script>

<style lang="less" scoped>
.fans_list{
  .fans_item{
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    padding-top: 10px;
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    p{
      margin: 10px 0;
    }
  }
}
</style>