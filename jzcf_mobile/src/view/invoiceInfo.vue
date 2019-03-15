<template>
    <div class="invoice-container">
        <div class="invoice-wrapper" :model="companyInfo">
            <div class="company-name">{{companyInfo.companyName}}</div>
            <ul class="company-info">
                <li>
                    <p>税<span>九州</span>号</p>
                    <p class="number">{{companyInfo.dutyParagraph}}</p>
                </li>
                <li>
                    <p>单位地址</p>
                    <p style="width: 75%;">{{companyInfo.address}}</p>
                </li>
                <li>
                    <p>电话号码</p>
                    <p>{{companyInfo.telephone}}</p>
                </li>
                <li>
                    <p>开户银行</p>
                    <p>{{companyInfo.bankName}}</p>
                </li>
                <li>
                    <p>银行账户</p>
                    <p>{{companyInfo.bankNum}}</p>
                </li>
            </ul>
            <div class="qrcode-wrapper">
                <div class="qrcode-img">
                    <img :src="companyInfo.qrcodePath" alt="">
                </div>
                <div class="propmt">点击右上角可分享开票信息给同事</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            companyId: this.$route.query.companyId,
            companyInfo:[]
        }
    },
    methods:{
        getData(){
             var params = {
                    companyId: this.companyId
                };
                Service.invoice(params).then((res)=>{
                    if(res.code == 0){
                        console.log(res)
                        this.companyInfo = res.data
                    }else{
                        Toast(res.msg)
                    }
                })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.invoice-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background:linear-gradient(316deg,rgba(23,42,146,1) 0%,rgba(31,68,162,1) 25%,rgba(31,69,163,1) 25%,rgba(31,70,163,1) 26%,rgba(31,70,163,1) 26%,rgba(54,149,212,1) 100%);
    overflow: hidden;
}
.invoice-wrapper{
    width: 690px;
    height: auto;
    background: url('../assets/img/qrcodeBg.png') no-repeat;
    background-size: cover;
    border-radius: 16px;
    margin: 50px auto;
    position: relative;
    overflow: hidden;
}

.company-name{
    width: 630px;
    margin: 40px auto 0;
    color: #1B1B4E;
    font-size: 32px;
}
.company-info{
    width: 630px;
    margin: 0 auto;
    li{
        margin: 30px auto 0;
        display: -webkit-box;
        font-size: 28px;
        font-weight: 1000;
        .number{
            color: #3B4664!important;
            font-weight: normal!important;
        }
        p:first-child{
            color: #9DA3B4;
            margin-right: 60px;
            span{
                visibility: hidden;
            }
        }
        p:last-child{
            color: #1B1B4E;
        }
    }
}
.qrcode-wrapper{
    width: 460px;
    height: auto;
    margin: 80px auto 0;
    .qrcode-img{
        width: 460px;
        height: auto;
        overflow: hidden;
        margin-bottom: 30px;
        img{
            width: 100%;
            height: auto;
        }
    }
    .propmt{
        text-align: center;
        font-size: 28px;
        color: #9DA3B4;
        padding-bottom: 62px;
    }
}
</style>


