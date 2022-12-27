<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-head">
                <div class="login-logo"></div>
            </div>
            <el-form class="login-el-form" :model="form" :rules="rules" ref="form">
                <el-form-item prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item prop="agree">
                    <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
                  </el-form-item>
                <el-form-item>
                  <el-button class="login-btn" @click="login" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {reqUserLogin} from '@/api/user.js'
export default {
    // name:'Login',

    data(){
        return{
            form:{
                mobile:'13911111111',
                code:'246810',
                agree:false
            },
            //表单校验规则
            rules:{
                mobile: [
                    { required: true, message: '请输入手机号', trigger: ['blur'] },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur'] }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: ['blur'] },
                    { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: ['blur'] }
                ],
                agree: [
                    //配置校验函数
                    { validator: function(rule,value,callback){
                        if(value === false){
                            callback(new Error('请同意用户协议！'))
                        }else{
                            callback()
                        }
                    }, trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.form.validate((flag)=>{
            if(flag){
                //这里的url代表什么
                this.$router.push('/s')
                reqUserLogin(this.form.mobile,this.form.code).then(res =>{
                    this.$message.success('恭喜您登录成功')
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data))
                    console.log('登录成功',res)
                }).catch(err=>{
                    this.$message.error('登录失败，手机号或验证码错误')
                    console.log('登录失败',err)
                })
            }else{
                console.log('出错了')
                // this.$message({
                // message: '请同意用户许可协议',
                // type: 'warning',
                // showClose: true,
                // });
                return
            }
            })
           
        }
    }
    
}
</script>

<style lang="less">
.login-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/login_bg.jpg");
    background-size: cover;
    .login-form{
        min-width: 300px;
        padding: 30px 50px 10px;
        background-color: #fff;
        .login-head{
            display: flex;
            justify-content: center;
            .login-logo{
                width: 200px;
                height: 57px;
                background-image: url(../../assets/logo_index.png);
                background-repeat: no-repeat;
                background-size: contain;
     
            }
        }
        .login-el-form{
            .login-btn{
                width: 100%;
            }
        }

    }
} 

</style>