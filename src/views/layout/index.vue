<template>
    <div class="layout">
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 导航上部logo -->
                <div class="logo" :class="{ minLogo: isCollapse }"></div>
                <!-- 导航菜单 -->
                <div>
                    <el-menu
                        router
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :default-active="$route.path"
                        background-color="#002033"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="/s">
                            <i class="el-icon-s-home"></i>
                            <span>首页</span>
                        </el-menu-item>
                        <el-menu-item index="/articles">
                            <i class="el-icon-document"></i>
                            <span>内容管理</span>
                        </el-menu-item>
                        <el-menu-item index="/pictures">
                            <i class="el-icon-picture"></i>
                            <span>素材管理</span>
                        </el-menu-item>
                        <el-menu-item index="/add-article">
                            <i class="el-icon-s-promotion"></i>
                            <span>发布文章</span>
                        </el-menu-item>
                        <el-menu-item index="/comment">
                            <i class="el-icon-chat-dot-round"></i>
                            <span>评论管理</span>
                        </el-menu-item>
                        <el-menu-item index="/fans">
                            <i class="el-icon-user-solid"></i>
                            <span>粉丝管理</span>
                        </el-menu-item>
                        <el-menu-item index="/settings">
                            <i class="el-icon-setting"></i>
                            <span>个人设置</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-header>
                    <!-- 头部左侧标题 -->
                    <div class="left" @click="foldmenu">
                        <i :class="isCollapse ? 'el-icon-s-fold': 'el-icon-s-unfold'"></i>
                        <span>江苏传智播客科技教育有限公司</span>
                    </div>
                    <!-- 头部右侧用户信息 -->
                    <div class="right">
                        <el-dropdown>
                            <div class="avatar-wrap">
                                <img src="@/assets/icon.jpg" alt="用户头像">
                                <!-- <img src="user.photo" alt="用户头像"> -->
                              <span>{{user.name}}</span>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>设置</el-dropdown-item>
                              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
          </el-container>
    </div>
</template>

<script>
import {reqGetUserProfile} from '@/api/user'
export default {
    // name:'Layout',
    data () {
        return {
            isCollapse: false,
            user:{
                name:'知七',
                // photo:'@/assets/icon.jpg'
            }
        }
    },
    methods:{
        foldmenu(){
            this.isCollapse = !this.isCollapse
        },
        logout(){
            this.$confirm('你确定要退出吗','温馨提示',{
                type:'warning'
            }).then(() => {
                this.$router.push('/login')
            }).catch(()=>{
                console.log('已取消')
            })
            
        }
    },
    created(){
        reqGetUserProfile().then(res=>{
            this.user=res.data.data
            console.log(res)
        })
    }
    
}
</script>

<style lang="less" scoped>
.layout{
    position: fixed;
    width: 100%;
    height: 100%;
    .el-container{
        width: 100%;
        height: 100%;
    }
    .el-aside {
        background-color: #002033;
            .logo{
                height: 60px;
                background: #002244 url(../../assets/logo_admin.png) no-repeat center;
                background-size: 140px auto;
            }
            .minLogo{
                background-image: url(../../assets/logo_admin_01.png);
                background-size: 36px auto;
              }
            .el-menu{
                border-right: none;
            }
        }
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .avatar-wrap{
            display: flex;
            align-items: center;
            cursor: pointer;
            img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
      
    
    
    .el-main {
    background-color: #E9EEF3;
    color: #333;
    }
}

</style>