<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>