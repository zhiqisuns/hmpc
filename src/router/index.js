import Vue from 'vue';
import VueRouter from 'vue-router'

// @指代src目录
// import Login from '../views/login'
// import Layout from '@/views/layout'
// import Home from '@/views/home'
// import Pictures from '@/views/pictures'
// import Articles from '@/views/articles'
// import AddArticle from '@/views/articles/add.vue'
// import EditArticle from '@/views/articles/edit.vue'
// import Page404 from '@/views/page404'
// import Comment from '@/views/comment';
// import Fans from '@/views/fans'
// import Settings from '@/views/settings'
// 路由懒加载
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Articles = () => import('@/views/articles')
const Comment = () => import('@/views/comment')
const Fans = () => import('@/views/fans')
const EditArticle = () => import('@/views/articles/edit.vue')
const AddArticle = () => import('@/views/articles/add.vue')
const Pictures = () => import('@/views/pictures')
const Settings = () => import('@/views/settings')
const Home = () => import('@/views/home')
const Page404 = () => import('@/views/page404')

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        { path:'/', redirect:'/login'
        },
        { path:'/login', component:Login
        },
        {
            path:'/s', 
            component: Layout,
            children:[
                {path:'', component: Home},
                {path:'/articles', component: Articles},
                {path:'/add-article', component: AddArticle},
                {path:'/edit-article/:id', component: EditArticle},
                {path:'/comment', component: Comment},
                {path:'/pictures', component: Pictures},
                {path:'/fans', component: Fans},
                {path:'/settings', component: Settings}
            ]
        },
        { path: '*', component:Page404}
    ]
})

export default router

//全局路由守卫
// to 要到哪里去
// from 从哪来
// next 是否放行, next() 放行, next(路径地址) 拦截到指定的地址
// router.beforeEach((to, from, next) => {
//   const userInfo = getUser()
//   if (to.path === '/login' || userInfo.token) {
//     next()
//   } else {
//     next('/login')
//   }
// })