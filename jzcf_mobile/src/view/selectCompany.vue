<template>
    <div class="company-wrapper">
        <ul class="company-list">
            <li v-for="(item, index) in companyInfo" :key="index"  @click="goInformation(item.id)">
                <p class="company-logo">
                    <img :src="item.logoPath" alt="">
                </p>
                <p class="company-name">
                    {{item.companyName}}
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            companyInfo: []
        }
    },
    methods: {
        getData(){//获取企业信息
            var params = {};
            Service.queryCompany(params).then((res)=>{
                if(res.code == 0){
                    console.log(res)
                    this.companyInfo = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        goInformation(id){
            let path = {path:'/submitInfo', query:{id: id}}
                this.$router.push(path)
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.company-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #FAFAFF;
}
.company-list{
    width: 100%;
    height: auto;
    background: #fff;
    li{
        width: 720px;
        padding: 30px 0;
        margin-left: 30px;
        border-bottom: 1px solid #F6F6FF;
        display: -webkit-flex;
        align-items: center;
        .company-logo{
            width: 80px;
            min-height: 80px;
            border-radius: 100%;
            overflow: hidden;
            background: #F6F6FF;
            margin-right: 20px;
            img{
                width: 100%;
                height: auto;
            }
        }
        .company-name{
            font-size: 28px;
            color: #1B1B4E;
        }
    }
    li:last-child{
        border-bottom: none;
    }
}
</style>


