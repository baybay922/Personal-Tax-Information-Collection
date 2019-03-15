<template>
    <div class="child-container">
        <div class="add-wrapper">
            <div class="addInfo">
                <p>学历（学位）继续教育</p>
                <button class="child-explain" @click="checkExplainInfo(0)"></button>
            </div>
            <div class="addBtn" @click="$router.push({path:'/degreeInfo',query: {repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">
                <img src="../assets/img/add.png" alt="">
            </div>
        </div>
        <div class="child-list" v-if="qualificationList">
            <div class="child-name" v-for="(item, ind) in qualificationList" :key="ind" @click="$router.push({path:'/degreeInfo',query: { id: item.id, repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">
                {{item.distEducationLevel}}
            </div>
        </div>
        <div class="add-wrapper">
            <div class="addInfo">
                <p>职业资格继续教育信息</p>
                <button class="child-explain" @click="checkExplainInfo"></button>
            </div>
            <div class="addBtn" @click="$router.push({path:'/professional',query: {repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">
                <img src="../assets/img/add.png" alt="">
            </div>
        </div>
        <div class="child-list" v-if="occupationList">
            <div class="child-name" v-for="(item, ind) in occupationList" :key="ind" @click="$router.push({path:'/professional',query: { id: item.id, repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">
                {{item.occCardId}}
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="submit-btn" @click="$router.push({path:'/submitInfo',query: {repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">完成</button>
        </div>
        <mt-popup
            v-model="explainVisible"
            position="bottom">
            <div class="popup-header">
                <p>适用条件</p>
                <button class="close-popup" @click="closeExplainInfo"></button>
            </div>
            <div class="conditions-wrapper">
                <ul class="conditions-list" v-if="educationType == 0">
                    <li>
                        <p>1.扣除年度内在中国境内接受学历（学位）继续教育。</p>
                    </li>
                </ul>
                <ul class="conditions-list" v-else>
                    <li>
                        <p>1.扣除年度取得职业资格或者专业技术人员职业资格相关证书。</p>
                    </li>
                </ul>
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
            educationType: 0,
            explainVisible: false,
            qualificationList:[],
            occupationList: []
        }
    },
    methods: {
        checkExplainInfo(){//显示子女说明
            this.explainVisible = true
        },
        closeExplainInfo(){//隐藏子女说明
            this.explainVisible = false
        },
        getData(){
            var params = {
                repId: this.repId
            }
            Service.queryEducationList(params).then((res)=>{
                if(res.code == 0){
                    this.qualificationList = res.data.educationqualificationlist;
                    this.occupationList = res.data.educationoccupationlist
                }else{
                    Toast(res.msg)
                }
            })
        },
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


