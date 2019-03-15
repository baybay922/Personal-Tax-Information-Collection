<template>
    <div class="child-container">
        <div class="add-wrapper">
            <div class="addInfo">
                <p>子女信息</p>
                <button class="child-explain" @click="checkExplainInfo"></button>
            </div>
            <div class="addBtn" @click="$router.push({path:'/childInfo',query: {repId: repId,companyId:companyId,collectionId:collectionId,type:type}})" v-if="childList.length < 20">
                <img src="../assets/img/add.png" alt="">
            </div>
        </div>
        <div class="child-list" v-if="isChildList">
            <div class="child-name" v-for="(item, ind) in childList" :key="ind" @click="$router.push({path:'/childInfo',query: { id: item.id, repId: repId,companyId:companyId,collectionId:collectionId,type:type}})"> 
                {{item.name}}
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="submit-btn" @click="$router.push({path:'/submitInfo',query: {repId: repId,companyId:companyId,collectionId:collectionId,type:type}})">完成</button>
        </div>
        <mt-popup
            v-model="explainVisible"
            position="bottom">
            <div class="popup-header">
                <p>适用条件</p>
                <button class="close-popup" @click="closeExplainInfo"></button>
            </div>
            <div class="conditions-wrapper">
                <div class="conditions-title">1.有子女符合以下两个条件之一：</div>
                <ul class="conditions-list">
                    <li>
                        <p>（1）扣除年度有子女满3岁且处于小学入学前阶段；</p>
                        <p>（2）扣除年度有子女正接受全日制学历教育。</p>
                    </li>
                </ul>
                <div class="conditions-title">2.同一子女的父亲和母亲扣除比例合计不超过100%。</div>
                <ul class="conditions-list">
                    <li>
                        <p>不符合上述条件者请勿填写本页，否则可能导致政策适用错误，影响个人纳税信用甚至违反税收法律。</p>
                    </li>
                </ul>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup, Toast, MessageBox } from 'mint-ui';
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            isChildList: false,
            explainVisible: false,
            childList: []
        }
    },
    methods: {
        getData(){
            var params = {
                repId: this.repId
            }
            Service.queryChildList(params).then((res)=>{
                if(res.code == 0){
                    if(res.data){
                        this.isChildList = true;
                        this.childList = res.data
                    }else{
                         this.isChildList = false;
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        checkExplainInfo(){//显示子女说明
            this.explainVisible = true
        },
        closeExplainInfo(){//隐藏子女说明
            this.explainVisible = false
        }
    },
    mounted(){
        if(this.repId){
             this.getData()
        }
       
    }
}
</script>
<style lang="less" scoped>
.child-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    overflow: hidden;
}
.add-wrapper{
    width: 690px;
    padding: 30px;
    background: #fff;
    margin-top: 20px;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    .addInfo{
        display: -webkit-flex;
        align-items: center;
        p{
            color: #1B1B4E;
            font-size: 32px;
            font-weight: 1000;
        }
        .child-explain{
            width: 24px;
            height: 24px;
            display: block;
            background: url('../assets/img/explain.png') no-repeat center;
            background-size: cover;
            margin-left: 20px;
        }
    }
    .addBtn{
        width: 50px;
        height: 50px;
        img{
            width: 100%;
            height: auto;
        }
    }
}
.child-list{
    width: 100%;
    background: #fff;
    margin-top: 2px;
    .child-name{
        width: 720px;
        margin-left: 30px;
        padding: 30px 0;
        border-bottom: 1px solid #F6F6FF;
        font-size: 28px;
        color: #1B1B4E;
        font-weight: 800;
        background: url('../assets/img/right-arrow.png') no-repeat 676px center;
        background-size: 14px 24px;
    }
    .child-name:last-child{
        border-bottom: none;
    }
}
.mint-popup{
    width: 100%;
}
.popup-header{
    width: 100%;
    padding: 30px 0;
    border-bottom: 1px solid #F6F6FF;
    position: relative;
    p{
        width: 100%;
        text-align: center;
        font-size: 32px;
        color: #1B1B4E;
    }
    button{
        width: 30px;
        height:100%;
        background: url('../assets/img/closePopup.png') no-repeat center center;
        background-size: 30px;
        position: absolute;
        right: 30px;
        top: 0;
    }
}
.conditions-wrapper{
    width: 670px;
    padding: 40px;
    font-size: 28px;
    .conditions-title{
        color: #3B4664;
        
    }
    .conditions-list{
        color: #9DA3B4;
        padding-bottom:50px; 
        line-height: 40px;
    }
}

.btn-wrapper{
    width: 100%;
    background: #FAFAFF;
    padding: 30px 0;
    position: absolute;
    bottom: 30px;
    .submit-btn{
        width: 690px;
        padding: 22px 0;
        background: #3063AD;
        text-align: center;
        font-size: 28px;
        color: #fff;
        letter-spacing: 5px;
        margin: 0 auto;
        display: block;
        border-radius: 8px;
    }
}
</style>


