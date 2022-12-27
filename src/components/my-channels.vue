<template>
  <div class="my-channels">
    <!-- <el-select @change="selectChange" clearable v-model="channel_id" placeholder="请选择频道"> -->
    <el-select @change="selectChange" :value="value" placeholder="请选择频道">
        <el-option 
            v-for="item in channels" 
            :key="item.id" 
            :label="item.name" 
            :value="item.id">
        </el-option>
    </el-select>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/articles';
export default {
    name: 'MyChannels',
    data() {
        return {
            channel_id: '',
            channels:[]
        }
    },
    props:['value'],
    async created() {
        try{
            const res = await reqGetChannels()
            this.channels = res.data.data.channels
            console.log(this.channels)
        }catch(err){
            console.log(err)
        }
    },
     methods:{
        selectChange(value){
            // 子传父--组件自定义事件
            // this.$emit('selectChange',value)
            // 子传父--input事件
            this.$emit('input',value)
        }
     }
}
</script>

<style>

</style>