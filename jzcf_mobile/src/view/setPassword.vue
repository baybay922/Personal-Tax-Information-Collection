<template>
    <div class="set-container">
        <div class="prompt">{{errMsg}}</div>
        <div class="pawd-wrapper">
            <label for="pwd">
                <ul class="pwdList">
                    <li><i v-if="pwdVal.length > 0"></i></li>
                    <li><i v-if="pwdVal.length > 1"></i></li>
                    <li><i v-if="pwdVal.length > 2"></i></li>
                    <li><i v-if="pwdVal.length > 3"></i></li>
                    <li><i v-if="pwdVal.length > 4"></i></li>
                    <li><i v-if="pwdVal.length > 5"></i></li>
                </ul>
            </label>
            <input type="tel" maxlength="6" id="pwd" class="pwd" v-model="pwdVal" autofocus @input="getpwdVal" ref="pwdVal">
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            pwdVal: '',
            havaSure: false,
            errMsg: "输入6位数字安全码",
            companyId: this.$route.query.companyId,
            pwdStatus: this.$route.query.pwdStatus,//第一次设置为0，修改为1，使用为2
        }
    },
    methods: {
        getpwdVal(){
            if(this.pwdStatus == 0){//判断是不是第一次设置密码
                if(this.pwdVal.length == 6){
                    var params = {
                        wagesPassword: this.pwdVal
                    }
                    Service.setPassword(params).then((res)=>{
                        if(res.code == 0){
                            Toast("设置成功")
                            setTimeout(()=>{
                                if(this.pwdStatus){///跳转工资详情
                                   let path = { path: '/checkWage', query:{companyId: this.companyId}};
                                    this.$router.push(path)
                                }else{
                                    let path = { path: '/homepage', query:{companyId: this.companyId}};
                                    this.$router.push(path)
                                }
                            },1500)
                        }else{
                            Toast(res.msg)
                        }
                    })
                }
            }else if(this.pwdStatus == 1){//判断修改密码
               if(this.pwdVal.length == 6){
                    if(!this.havaSure){//校验是第几次输入
                        var params = {
                            wagesPassword: this.pwdVal
                        }
                        Service.checkPassword(params).then((res)=>{
                            if(res.code == 0){
                                this.pwdVal = ""
                                this.errMsg = "请输入新密码"
                                this.havaSure = true
                            }else{
                                this.pwdVal = ""
                                Toast(res.msg)
                            }
                        })
                        
                    }else{
                        var params = {
                            wagesPassword: this.pwdVal
                        }
                        Service.setPassword(params).then((res)=>{
                            if(res.code == 0){
                                Toast("设置成功")
                                let path = { path: '/homepage', query:{companyId: this.companyId}};
                                this.$router.push(path)
                            }else{
                                Toast(res.msg)
                            }
                        })
                    }
                }
            }else if(this.pwdStatus == 2){//判断使用密码,进去指定页面：查看工资
                 if(this.pwdVal.length == 6){
                    var params = {
                        wagesPassword: this.pwdVal
                    }
                    Service.checkPassword(params).then((res)=>{
                        if(res.code == 0){  
                            let path = { path: '/checkWage', query:{companyId: this.companyId}};
                                this.$router.push(path)
                        }else{
                            Toast(res.msg)
                        }
                    })
                 }
            }
            
        },
        getData(){//获取当前用户，校验是否为第一次设置
            var params = {}
            Service.queryUserInfo(params).then((res)=>{
                if(res.code == 0){
                    if(res.data.wagesPassword == null){
                        this.errMsg = "输入6位数字安全码"
                        this.pwdStatus = 0
                    }else{
                        this.errMsg = "请输入原始密码"
                        this.pwdStatus = 1
                    }
                }else{
                    Toast(res.msg)
                }
            })
        }
    },
    mounted(){
        this.$refs.pwdVal.focus();
        if(!this.pwdStatus){
            this.getData()
        }
    }
}
</script>
<style lang="less" scoped>
.set-container{
    width: 100%;
    height: 100%;
    position: relative;
    background: #FBFBFF;
}
.prompt{
    width: 100%;
    padding: 60px 0 0;
    font-size: 32px;
    font-weight: 1000;
    color: #3B4664;
    text-align: center;
}
.pawd-wrapper{
    width: 610px;
    padding: 80px 70px;
    label{
        width: 610px;
        height: auto;
        display: block;
    }
    input{
        position: fixed;
        top: -999999999px;
    }
    .pwdList{
        display: -webkit-flex;
        li{
            width:88px;
            height:88px;
            border-radius:10px;
            border:2px solid #F6F6FF;
            margin-right: 16px;
            position: relative;
               box-shadow:2px 2px 2px 2px rgba(27, 27, 78, .1);
            i{
                width: 30px;
                height: 30px;
                background: #1B1B4E;
                border-radius: 100%;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -15px;
            }
        }
        li:last-child{
            margin: 0;
        }
    }
}
</style>


