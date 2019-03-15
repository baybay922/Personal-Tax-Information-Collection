<template>
    <div class="search-container">
        <div class="search-content">
            <div class="search-wrapper">
                <div class="search-icon"></div>
                <input type="text" v-model="searchVal" placeholder="输入企业名称" autofocus @input="getSearchRes">
                <span class="clearVal" v-if="searchVal" @click="clearSearchVal"></span>
            </div>
            <ul class="company-list">
                <li v-for="(item, index) in companyInfo" :key="index"  @click="goInformation(item.id)">
                    <p class="company-logo">
                        <img :src="item.logoPath" alt="">
                    </p>
                    <p class="company-name">
                        {{item.companyName}}
                    </p>
                    <p class="bindStatus useing" v-if="item.bindStatus == 1">使用中</p>
                    <p class="bindStatus apply" v-if="item.bindStatus == 2">申请中</p>
                </li>
            </ul>
            <transition name="fade">
                <ul class="searchRes" v-if="searchRes">
                    <li v-for="(item, ind) in searchRes" :key="ind" @click="changeCompany(item.id, item.companyName)" ref="menuItem">{{item.companyName}}</li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            searchVal:"",
            searchRes:[],
            companyInfo: []
        }
    },
    methods: {
        clearSearchVal(){
            this.searchVal = "";
            this.searchRes = [];
        },
        getSearchRes(){
            var params = {
                    busName: this.searchVal
            }
            Service.searchBus(params).then((res)=>{
                if(res.code == 0){//进入登录页面
                    this.searchRes = res.data
                }else{
                   Toast(res.msg)
                }
            })
        },
        changeCompany(companyId, companyName){//选择当前选中企业并申请加入
            this.searchRes = ""
            this.searchVal = companyName;
            this.$messagebox({
                  title: '温馨提示',
                  message: '是否申请加入'+companyName+'',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        companyId: companyId
                    };
                    Service.applyBus(params).then((res)=>{
                        if(res.code == 0){
                           Toast("申请成功")
                            setTimeout(()=>{
                                var params = {
                                        companyId: companyId
                                    };
                                Service.changeCompany(params).then((res)=>{
                                        if(res.code == 4){//进入填报页
                                        var path = { path: '/submitInfo', query: {companyId: companyId }}
                                        this.$router.push(path)
                                    }else if(res.code == 5){//进入首页
                                        var path = {path: "/homepage",query:{companyId: companyId, code: res.code}};
                                        this.$router.push(path)
                                    }else{
                                        Toast(res.msg)
                                    }
                                })
                            },1500)
                        }else{
                            Toast(res.msg)
                        }
                    })
              }
          })
        },
        getData(){//获取企业信息
            var params = {};
            Service.queryCompany(params).then((res)=>{
                if(res.code == 0){
                    this.companyInfo = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        goInformation(id){
            var params = {
                    companyId: id
                };
                Service.changeCompany(params).then((res)=>{
                    if(res.code == 4){//进入填报页
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
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.search-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    position: relative;
    overflow: hidden;
}
.search-content{
    width: 100%;
    height: auto;
    background: #fff;
    overflow: hidden;
}
.search-wrapper{
    width: 690px;
    margin: 20px auto;
    height: 64px;
    background: #F8F8F9;
    border-radius: 200px;
    display: -webkit-flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    .search-icon{
        width: 32px;
        height: 32px;
        background: url('../assets/img/search.png') no-repeat center;
        background-size: contain;
        margin:0 20px;
    }
    input{
        width: 100%;
        font-size: 28px;
        color: #1B1B4E;
    }
}
.clearVal{
    width: 32px;
    height: 32px;
    background: url('../assets/img/close.png') no-repeat center;
    background-size: contain;
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -16px;
}
.searchRes{
    width: 100%;
    height: auto;
    position: absolute;
    top: 104px;
    background: #fff;
    li{
        width: 720px;
        margin-left: 30px;
        border-bottom: 1px solid #F6F6FF;
        padding: 30px 0;
        font-size: 28px;
        color: #1B1B4E;
    }
    li:last-child{
        border: none;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mint-msgbox-message{
    text-align: center;
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
.bindStatus{
    position: absolute;
    right: 30px;
    font-size: 28px;
}
.useing{
    color: #16bc70;
}
.apply{
    color: #d7d943;
}
</style>


