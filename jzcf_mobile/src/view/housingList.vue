<template>
    <div class="house-container">
         <div class="add-wrapper">
            <div class="addInfo">
                <p>住房租金支出</p>
                <button class="child-explain" @click="checkExplainInfo(0)"></button>
            </div>
            <div class="addBtn" @click="checkRentHouse(1)" v-if="houseRent.length < 8">
                <img src="../assets/img/add.png" alt="">
            </div>
        </div>
        <div class="child-list" v-if="loanLen">
            <div class="child-name" v-for="(item, ind) in houseRent" :key="ind" @click="checkRentHouse(item.id, 0)">
                {{item.lessorName?item.lessorName:"住房租金支出"+(ind+1)}}
            </div>
        </div>
        <div class="add-wrapper">
            <div class="addInfo">
                <p>房屋贷款利息支出</p>
                <button class="child-explain" @click="checkExplainInfo(1)"></button>
            </div>
        </div>
        <div class="child-list">
            <div class="child-name" :v-model="houseList" @click="checkAddLoan(1)">
                商业贷款
            </div>
             <div class="child-name" :v-model="houseList" @click="checkAddLoan(2)">
                公积金贷款
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
                <button class="close-popup" @click="closeExplainInfo()"></button>
            </div>
            <div class="conditions-wrapper" v-if="houseType == 0">
                <ul class="conditions-list">
                    <li>
                        <p>1.本人及配偶在主要工作城市无自有住房；</p>
                        <p>2.本人及配偶扣除年度未扣除住房贷款利息支出；</p>
                        <p>3.本人及配偶主要工作城市相同的，该扣除年度配偶未享受过住房租金支出扣除。</p>
                    </li>
                </ul>
                <ul class="conditions-list">
                    <li>
                        <p>不符合上述条件者请勿填写本页，否则可能导致政策适用错误，影响个人纳税信用甚至违反税收法律。</p>
                    </li>
                </ul>
            </div>
            <div class="conditions-wrapper" v-else>
                <ul class="conditions-list">
                    <li>
                        <p>1.本人或者配偶购买的中国境内住房；</p>
                        <p>2.属于首套住房贷款（可咨询贷款银行），且扣除年度仍在还贷；</p>
                        <p>3.住房租金支出和住房贷款利息支出未同时扣除；</p>
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
            id:"",
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            houseType: 0,
            explainVisible: false,
            loanLen: false,
            houseList: [],
            houseRent: [],
            house: []
        }
    },
    methods: {
        checkRentHouse(id,status){//判断是否有贷款项
            if(status == 0){
                var path = {path:'/tenement',query: { id: id,repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type: this.type}}
                this.$router.push(path)
            }else{
                var path = {path:'/tenement',query: {repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type: this.type}}
                this.$router.push(path)
                
            }
            
        },
        checkAddLoan(status){//判断是否有住房租金
            var path = {path:'/mortgage',query: {repId: this.repId,companyId:this.companyId,collectionId:this.collectionId, status:status, id: this.id,type: this.type}}
            this.$router.push(path)
        },
        checkExplainInfo(showType){//显示房屋贷款说明
            this.houseType = showType;
            this.explainVisible = true
        },
        closeExplainInfo(){//隐藏房屋贷款说明
            this.explainVisible = false
        },
        getData(){//获取租房贷房列表
            var params = {
                repId: this.repId
            }
            Service.queryHouseList(params).then((res)=>{
                if(res.code == 0){
                    this.house = res.data.house
                    if(res.data.houseRent){
                        console.log(res)
                        this.loanLen = true;
                        this.houseRent = res.data.houseRent
                    }else{
                         this.loanLen = false;
                    }
                    if(res.data.house){
                        this.id = res.data.house.id
                    }
                }else{
                    Toast(res.msg)
                }
            })
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
.house-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    position: relative;
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
        color: #3B4664;
        padding-bottom:50px; 
        line-height: 40px;
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


