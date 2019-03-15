<template>
    <div class="mine-container">
        <div class="header-wrapper">
            <div class="header-info">
                <div class="header-img">
                	<img style="border-radius: 100%;width:100%;height: auto;" src="http://47.92.240.34/file/c/def.jpg" />
                </div>

                <div class="header-content">
                    <p class="header-name">{{name}}</p>
                    <p class="header-job">{{position}}</p>
                </div>
                <div class="switch" @click="$router.push({path:'/searchCompany'})">
                    切换
                </div>
            </div>
        </div>
        <ul class="seting-wrapper">
            <li class="prefill" @click="$router.push({path:'/submitInfo', query:{companyId: companyId, type:'p'}})">
                预填信息
            </li>
            <li class="invoice" @click="$router.push({path:'/invoiceInfo', query:{companyId: companyId}})">
                开票信息
            </li>
            <li class="setSafe" @click="$router.push({path:'/setPassword',query: {companyId: companyId}})">
                设置安全码
            </li>
        </ul>
        <ul class="seting-wrapper">
            <li class="feedback" @click="$router.push({path: '/feedback',query:{name: name, position: position, companyId: companyId}})">
                意见反馈
            </li>
            <li class="aboutUs" @click="$router.push({path: '/aboutUs'})">
                关于我们
            </li>
        </ul>
        <div class="btn-wrapper" @click="exit()">
            <button>安全退出</button>
        </div>
    </div>
</template>
<script>
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            name: this.$route.query.name,
            position: this.$route.query.position,
            companyId: this.$route.query.companyId,
        }
    },
    methods: {
     exit(){
		Service.exit({}).then((res)=>{
		if(res.code == 0){
                 setTimeout(()=>{
                                var path = {path: "/",query:{}};
                                this.$router.push(path)
                            },1500)
			    }
            })
	}
        
    },
    mounted(){
       
    }
}
</script>
<style lang="less" scoped>
.mine-container{
    width: 100%;
    height: 100%;
    position: relative;
    background: #FAFAFF;
    overflow: hidden;
}
.header-wrapper{
    width: 100%;
    height: 360px;
    background: url('../assets/img/mineBg.png') no-repeat top center;
    background-size: 100% 260px;
    overflow: hidden;
    .header-info{
        width: 690px;
        height: 240px;
        position: relative;
        margin: 120px auto 0;
        background: #fff;
        box-shadow:0px 2px 8px 0px rgba(23,42,146,0.04);
        border-radius: 16px;
        .header-img{
            width: 160px;
            height: 160px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: -80px;
            background:#fff;
            margin-left:-80px; 
        }
        .header-content{
            width: 100%;
            text-align: center;
            position: absolute;
            top: 110px;
            .header-name{
                font-size: 32px;
                color: #1B1B4E;
                margin-bottom: 12px;
            }
            .header-job{
                font-size: 28px;
                color: #9DA3B4;
            }
        }
    }
}
.seting-wrapper{
    width: 690px;
    margin: 30px auto 0;
    box-shadow:0px 2px 8px 0px rgba(23,42,146,0.04);
    background: #fff;
    border-radius: 16px;
    li{
        width: 660px;
        padding: 30px 0;
        font-size: 28px;
        color: #3B4664;
        margin-left: 30px;
        border-bottom: 2px solid #F6F6FF;
    }
    .prefill{
        background: url('../assets/img/pre.png') no-repeat 600px center;
        background-size: 40px;
    }
    .invoice{
        background: url('../assets/img/contract.png') no-repeat 600px center;
        background-size: 40px;
    }
    .setSafe{
        background: url('../assets/img/safe.png') no-repeat 600px center;
        background-size: 40px;
    }
    .feedback{
        background: url('../assets/img/feedback.png') no-repeat 600px center;
        background-size: 40px;
    }
    .aboutUs{
        background: url('../assets/img/set.png') no-repeat 600px center;
        background-size: 40px;
    }
}
.switch{
    padding: 0 50px 0 0;
    position: absolute;
    top: 30px;
    right: 30px;
    background:  url('../assets/img/switch.png') no-repeat right center;
    background-size: contain;
    font-size: 28px;
    color: #9DA3B4;
}
.btn-wrapper{
    width: 100%;
    padding: 30px 0;
    position: absolute;
    bottom: 0;
    button{
        width: 690px;
        padding: 22px 0;
        background: #3063AD;
        display: block;
        border-radius: 8px;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        font-size: 32px;
    }
}
</style>


