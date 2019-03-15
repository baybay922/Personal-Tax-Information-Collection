<template>
    <div class="userInfo">
        <div class="logo-container">
            <img src="../assets/img/logo.png" alt="">
        </div>
        <div class="login-container">
            <div class="login-wrapper">
                <input type="text" name="userName" id="userName" placeholder="请输入您的姓名" v-model="formInfo.userName" maxlength="17">
                <span class="clearVal" v-if=" formInfo.userName " @click="formInfo.userName = ''"></span>
            </div>
            <div class="login-wrapper">
                <input :type="isOPen?'text':'password'" name="userId" id="userId" placeholder="请输入您的身份证号" v-model="formInfo.userId" maxlength="18">
                <span :class="isOPen?'close-eye':'open-eye'" @click="changeInputType"></span>
                <span class="clearVal closeUserId" v-if=" formInfo.userId " @click="formInfo.userId = ''"></span>
            </div>
            <div class="login-wrapper">
                <input type="tel" name="userPhone" id="userPhone" placeholder="请输入您的手机号" v-model="formInfo.userPhone" maxlength="11">
                <span class="clearVal" v-if="formInfo.userPhone" @click="formInfo.userPhone = ''"></span>
            </div>
            <div class="login-wrapper">                
                <input type="tel" name="verification" id="verification" placeholder="请输入验证码" v-model="formInfo.verification" maxlength="4">
                <span class="clearVal clearVer" v-if="formInfo.verification" @click="formInfo.verification = ''"></span>
                <button v-bind:disabled="this.msgdisabled" @click="getSmsCode" class="verifBtn">{{ msgtitle }}</button>
            </div>
            <button class="submitBtn" @click="checkUserInfo">登录</button>
        </div>
    </div>
    
</template>
<script>
import {Toast} from 'mint-ui'
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            formInfo: {
                userName: "",
                userId: "",
                userPhone: "",
                verification: ""
            },
            msgdisabled: false,
            msgtitle:"获取验证码",
            isOPen: false
        }
    },
    methods: {
        changeInputType(){//是否显示用户身份证号
            if(this.isOPen){
                this.isOPen = false
            }else{
                this.isOPen = true
            }
        },
        getSmsCode(){//获取验证码
        	if(this.formInfo.userPhone == ""){
                Toast("请输入您的手机号")
                return
            }
        	let paramObj = {
                phone: this.formInfo.userPhone
            }
        	
        	Service.sendLoginSms(paramObj).then((res)=>{
        		Toast(res.msg);
                if(res.code == 0){//进入搜索页面
                    this.makenum();
                }
           })
        },
        makenum() {//倒计时
            let num = 60
            let self = this
            let interval = window.setInterval(function() {
                num--
                self.msgdisabled = true
                self.msgtitle = '重新获取(' + num + ')'
                if (num == 0) {
                    self.msgtitle = '获取短信验证码'
                    self.msgdisabled = false
                    window.clearInterval(interval)
                }
                }, 1000)
        },
        checkUserInfo(){//校验登录信息

            if(this.formInfo.userName == ""){
                Toast("请输入您的姓名")
                return
            }
            if(this.formInfo.userId == ""){
                Toast("请输入您的身份证号")
                return
            }
            if(this.formInfo.userPhone == ""){
                Toast("请输入您的手机号")
                return
            }

            if(this.formInfo.verification == ""){
                Toast("验证码错误，请重新输入")
                return
            }
            let paramObj = {
                    realName: this.formInfo.userName,
                    idCard: this.formInfo.userId,
                    phone: this.formInfo.userPhone,
                    validCode: this.formInfo.verification
                }
            Service.login(paramObj).then((res)=>{
                if(res.code == 2){//进入搜索页面
                    var path = {path:'/searchCompany',query:{}};
                        this.$router.push(path)
                }else if(res.code == 4){//进入填报页
                    var path = {path:'/submitInfo',query: {
                            collectionId: res.data.collectionId,
                            companyId: res.data.companyId
                        }};
                        this.$router.push(path)
                }else if(res.code == 5){//进入首页
                    var path = {path:'/homepage',query:{ companyId: res.data.companyId}};
                        this.$router.push(path)
                }else{
                    Toast(res.msg)
                }
            })
            
        }
    }
}
</script>
<style lang="less" scoped>
.userInfo{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
}
.logo-container{
    width: 550px;
    height: auto;
    margin: 80px auto; 
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: auto;
    }
}
.login-container{
    width: 100%;
    height: 920px;
    overflow-y: auto;
    background: #fff;
}
.login-wrapper{
    width: 590px;
    margin: 20px auto 0;
    height: 90px;
    line-height: 90px;
    display: -webkit-flex;
    border-bottom: 1px solid #F6F6FF;
    position: relative;
    label{
        width: 52px;
        height: auto;
        display: block;
        margin-right: 30px;
        img{
            width: 100%;
            height: auto;
        } 
    }
    input{
        width: 100%;
        outline: none;
        border: none;
        color: #1B1B4E;
        background: transparent;
        font-size: 28px;
    }
    button{
        width: auto;
        height: 100%;
        outline: none;
        border: none;
        font-size: 28px;
        color: #3063AD;
        position: absolute;
        right: 0;
    }
    .clearVal{
        width: 40px;
        height: 40px;
        background: url("../assets/img/close.png") no-repeat center;
        background-size: cover;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -21px;
    }
    .closeUserId{
        right:50px; 
    }
    .clearVer{
        right: 180px;
    }
    .close-eye{
        width: 40px;
        height: 40px;
        background: url("../assets/img/eye-close.png") no-repeat center;
        background-size: cover;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -21px;
    }
    .open-eye{
        width: 40px;
        height: 40px;
        background: url("../assets/img/eye-open.png") no-repeat center;
        background-size: cover;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -21px;
    }
}
.submitBtn{
    width: 590px;
    height: 90px;
    line-height: 90px;
    background: #3063AD;
    border-radius: 8px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    display: block;
    margin: 80px auto 0;
    letter-spacing: 5px;
}
</style>