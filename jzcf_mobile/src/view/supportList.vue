<template>
    <div class="child-container">
        <div class="conditions">
            <p>赡养老人支出</p>
            <button class="child-explain" @click="checkExplainInfo"></button>
        </div>
        <div class="oldMan-info">
            <div class="support-wrapper" @click="getOnlyType">
                <label for="only">*是否独生子女</label>
                <p id="only" :class="userInfo.isSigle == '请选择'?'':'fontColor'">{{userInfo.isSigle}}</p>
            </div>
            <div class="support-wrapper" v-if="commonStatus" @click="getsShareWay">
                <label for="share">*分摊方式</label>
                <p id="share" :class="userInfo.dictShareType == '请选择'?'':'fontColor'">{{userInfo.dictShareType}}</p>
            </div>
            <div class="support-wrapper">
                <label for="money">*本年度月扣除金额（元）</label>
                <input type="tel" id="money" :disabled="!commonStatus" placeholder="请输入" maxlength="4" v-model="userInfo.deduction" @blur="checkMoney">
            </div>
        </div>
        <div class="add-wrapper" v-if="onlyStatus">
            <div class="addInfo">
                <p>被赡养人信息</p>
                <div class="addBtn" @click="checkconditions('is')" v-if="userInfo.supportBeList.length < 4">
                    <img src="../assets/img/add.png" alt="">
                </div>
            </div>
            <div class="child-list">
                <div class="child-name" v-for="(item, ind) in userInfo.supportBeList" :key="ind" @click="modifySupportIofn(item.id)">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="add-wrapper" v-if="onlyStatus && commonStatus">
            <div class="addInfo">
                <p>共同赡养人信息</p>
                <div class="addBtn" @click="checkconditions('no')" v-if="userInfo.supportToList.length < 8">
                    <img src="../assets/img/add.png" alt="">
                </div>
            </div>
            <div class="child-list">
                <div class="child-name" v-for="(item, ind) in userInfo.supportToList" :key="ind" @click="modifyBeSupportIofn(item.id)">
                    {{item.name}}
                </div>
            </div>
        </div>
         <div class="btn-wrapper">
            <button class="submit-btn" @click="$router.push({path:'/submitInfo',query: {repId: repId,companyId:companyId,collectionId:collectionId,type: type}})">保存并返回</button>
        </div>
        <mt-popup
            v-model="explainVisible"
            position="bottom">
            <div class="popup-header">
                <p>适用条件</p>
                <button class="close-popup" @click="closeExplainInfo"></button>
            </div>
            <div class="conditions-wrapper">
                <ul class="conditions-list">
                    <li>
                        <p>1.扣除年度有一位被赡养人年满60（含）岁（被赡养人包括：①父母；②子女均已去世的祖父母或外祖父母）。</p>
                        <p>2.纳税人为非独生子女，且属于赡养人约定分摊的或被赡养人指定分摊的，需已经签订书面分摊协议。</p>
                    </li>
                </ul>
                <ul class="conditions-list">
                    <li>
                        <p>不符合上述条件者请勿填写本页，否则可能导致政策适用错误，影响个人纳税信用甚至违反税收法律。</p>
                    </li>
                </ul>
            </div>
        </mt-popup>
        <Picker
            :status='pickerconfig.pickerStatus'
            :data="pickerconfig.data"
            :pickerType="pickerconfig.pickerType"
            v-on:pickerVal="getPickerVal">
        </Picker>
    </div>
</template>
<script>
import { Popup, Toast, MessageBox } from 'mint-ui';
import { Service } from '../server/api.js'
import Picker from '../components/picker'
export default {
    data(){
        return{
            be: this.$route.query.be,
            supportId: "",
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            pickerconfig: {
                pickerStatus: false,
                data: [],
                pickerType: ''
            },
            explainVisible: false,
            onlyStatus: false,
            commonStatus: false,
            userInfo: {
                isSigle: '请选择',
                dictShareType: '请选择',
                deduction: "",
                supportBeList: [],
                supportToList: [],
            },
            onlyData: [{
                values: [
                    "是",
                    "否"
                ]
            }],
            shareData: [{
                values: [
                    "赡养人平均分摊",
                    "赡养人约定分摊",
                    "被赡养人指定分摊"
                ]
            }],
        }
    },
    components:{
        Picker
    },
    methods: {
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            this.pickerconfig.pickerStatus = data.status;
            if(data.pickerVal){
                if(data.pickerType == 'onlyStatus'){
                    if(data.pickerVal == "是"){
                        this.onlyStatus = true;
                        this.commonStatus = false;
                        this.userInfo.deduction = 2000;
                        if(this.userInfo.supportBeList.length !==0){
                             this.$messagebox({
                              title: '温馨提示',
                              message: '是否继续使用当前被赡养人信息',
                              showCancelButton: true,
                              confirmButtonText:"确认",
                              cancelButtonText:"取消"
                            }).then(action => {
                                if(action !== 'confirm'){
                                   var params = {
                                        supportId: this.supportId
                                    }
                                    Service.delAllSupportTo(params).then((res)=>{
                                        if(res.code == 0){
                                            Toast("清空成功");
                                            this.userInfo.supportBeList = ""
                                        }else{
                                            Toast(res.msg)
                                        }
                                    })
                                    Service.delAllSupportBe(params).then((res)=>{
                                        if(res.code == 0){
                                            Toast("清空成功");
                                            this.userInfo.supportBeList = ""
                                        }else{
                                            Toast(res.msg)
                                        }
                                    })      
                                }else{
                                     var params = {
                                            id: this.supportId?this.supportId:"",
                                            repId: this.repId,
                                            isSigle: this.userInfo.isSigle=="是"?1:0,
                                            dictShareType: this.userInfo.dictShareType=="请选择"?"":this.userInfo.dictShareType,
                                            deduction: this.userInfo.deduction
                                    }
                                    Service.saveSupport(params).then((res)=>{
                                        if(res.code == 0){
                                            Toast("保存成功")
                                        }else{
                                            Toast(res.msg)
                                        }
                                    })
                                }
                          })
                        }
                    }else{
                        this.onlyStatus = true
                        this.commonStatus = true
                        this.userInfo.deduction = "";
                        this.userInfo.dictShareType = "请选择"
                        if(this.userInfo.supportBeList.length !==0){
                            this.$messagebox({
                              title: '温馨提示',
                              message: '是否继续使用当前被赡养人信息',
                              showCancelButton: true,
                              confirmButtonText:"确认",
                              cancelButtonText:"取消"
                            }).then(action => {
                                if(action !== 'confirm'){
                                   var params = {
                                        supportId: this.supportId
                                    }
                                    Service.delAllSupportBe(params).then((res)=>{
                                        if(res.code == 0){
                                            Toast("清空成功");
                                            this.userInfo.supportBeList = ""
                                        }else{
                                            Toast(res.msg)
                                        }
                                    })      
                                }else{
                                    var params = {
                                            id: this.supportId?this.supportId:"",
                                            repId: this.repId,
                                            isSigle: this.userInfo.isSigle=="是"?1:0,
                                            dictShareType: this.userInfo.dictShareType=="请选择"?"":this.userInfo.dictShareType,
                                            deduction: this.userInfo.deduction
                                    }
                                    Service.saveSupport(params).then((res)=>{
                                        if(res.code == 0){
                                            Toast("保存成功")
                                        }else{
                                            Toast(res.msg)
                                        }
                                    })
                                }
                          })
                        }
                        
                    }
                    this.userInfo.isSigle = data.pickerVal
                }else if(data.pickerType == 'shareStasus'){
                    this.userInfo.dictShareType = data.pickerVal
                }
            }
        },
        checkconditions(genre){//跳转路径
            if(this.userInfo.isSigle == "是"){
                
                let path = { 
                    path: '/dependent',
                    query: {
                        id: this.id,
                        be: this.be,
                        repId: this.repId,
                        companyId: this.companyId,
                        collectionId: this.collectionId,
                        isSigle: this.userInfo.isSigle,
                        deduction: this.userInfo.deduction,
                        type: this.type
                    }
                }
                this.$router.push(path)
            }else{
                if(this.userInfo.dictShareType == "请选择"){
                    Toast("请选择分摊方式");
                    return;
                }
                if(this.userInfo.deduction == ""){
                    Toast("请输入扣除金额");
                    return
                }
                if(genre == "is"){
                    
                    let path = {
                        path: '/dependent',
                        query: {
                            be: this.be,
                            repId: this.repId,
                            companyId: this.companyId,
                            collectionId: this.collectionId,
                            isSigle: this.userInfo.isSigle,
                            share: this.userInfo.dictShareType,
                            deduction: this.userInfo.deduction,
                            type: this.type
                        }
                    }
                    this.$router.push(path)
                }else{
                    if(this.userInfo.supportBeList.length !== 0){
                        let path = { 
                            path: '/commonPeople',
                            query: {
                                be: this.be,
                                supportId: this.supportId,
                                repId: this.repId,
                                companyId: this.companyId,
                                collectionId: this.collectionId,
                                type: this.type
                            }
                        }
                        this.$router.push(path)
                    }else{
                        Toast("请先填写被赡养人信息")
                    }
                    
                }
            }
        },
        checkMoney(){//非独生子女每人金额
            if(this.userInfo.deduction > 1000){
                Toast("非独生子女不得超过1000");
                this.userInfo.deduction = 1000
            }
        },
        getOnlyType(){//获取独生子女
            this.pickerconfig.pickerType = 'onlyStatus';
            this.pickerconfig.pickerStatus = true;
            this.pickerconfig.data = this.onlyData;
        },
        getsShareWay(){//获取非独生子女
            this.pickerconfig.pickerType = 'shareStasus'
            this.pickerconfig.pickerStatus = true;
             this.pickerconfig.data = this.shareData;
        },
        checkExplainInfo(){//显示赡养老人条件
            this.explainVisible = true
        },
        closeExplainInfo(){//隐藏赡养老人条件
            this.explainVisible = false
        },
        getData(){
            var params = {
                repId: this.repId
            }
            Service.querySupport(params).then((res)=>{
                if(res.code == 0){
                    if(res.data.isSigle == 1){
                        this.userInfo.isSigle = "是"
                        this.onlyStatus = true
                        this.commonStatus = false
                    }else{
                        this.userInfo.isSigle = "否"
                        this.onlyStatus = true
                        this.commonStatus = true
                    }
                    if(res.data.dictShareType == "" || res.data.dictShareType == null){
                        this.userInfo.dictShareType = "请选择"
                    }else{
                        this.userInfo.dictShareType = res.data.dictShareType
                    }
                    this.userInfo.deduction = res.data.deduction
                    this.userInfo.supportBeList = res.data.supportBeList
                    this.userInfo.supportToList = res.data.supportToList
                    this.supportId = res.data.id;
                }else{
                    Toast(res.msg)
                }
            })
        },
        checkChildInfo(){
            if(this.userInfo.isSigle == "否"){
                    if(this.userInfo.dictShareType == "请选择"){
                    Toast("请选择分摊方式");
                    return;
                }
                if(this.userInfo.deduction == ""){
                    Toast("请输入扣除金额");
                    return
                }
            }
            var params = {
                    id: this.supportId?this.supportId:"",
                    repId: this.repId,
                    isSigle: this.userInfo.isSigle=="是"?1:0,
                    dictShareType: this.userInfo.dictShareType=="请选择"?"":this.userInfo.dictShareType,
                    deduction: this.userInfo.deduction
            }
            Service.saveSupport(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                }else{
                    Toast(res.msg)
                }
            })
        },
        modifySupportIofn(id){
            if(this.userInfo.isSigle == "否"){
                    if(this.userInfo.dictShareType == "请选择"){
                    Toast("请选择分摊方式并保存");
                    return;
                }
                if(this.userInfo.deduction == ""){
                    Toast("请输入扣除金额并保存");
                    return
                }
            }
            let path = {
                    path: '/dependent',
                    query: {
                        id: id,
                        be: this.be,
                        repId: this.repId,
                        companyId: this.companyId,
                        collectionId: this.collectionId,
                        isSigle: this.userInfo.isSigle,
                        share: this.userInfo.dictShareType,
                        deduction: this.userInfo.deduction,
                        type: this.type
                    }
                }
                this.$router.push(path)
        },
        modifyBeSupportIofn(id){
            if(this.userInfo.isSigle == "否"){
                    if(this.userInfo.dictShareType == "请选择"){
                    Toast("请选择分摊方式并保存");
                    return;
                }
                if(this.userInfo.deduction == ""){
                    Toast("请输入扣除金额并保存");
                    return
                }
            }
            let path = {
                    path: '/commonPeople',
                    query: {
                        id: id,
                        be: this.be,
                        repId: this.repId,
                        companyId: this.companyId,
                        collectionId: this.collectionId,
                        isSigle: this.userInfo.isSigle,
                        share: this.userInfo.dictShareType,
                        deduction: this.userInfo.deduction,
                        type: this.type
                    }
                }
                this.$router.push(path)
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.child-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    overflow: hidden;
    overflow-y: auto;
    .addInfo{
        width: 9.2rem;
        padding: 0.4rem;
        background: #fff;
        margin-top: 0.266667rem;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: 2px solid #FAFAFF;
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
}
.user-info,.spouse-info{
    width: 100%;
    height: auto;
    background: #fff;
    .support-wrapper:last-child{
        border: none;
    }
}
.spouse-info{
    margin-top: 20px;
}
.add-wrapper{
    width: 100%;
    background: #fff;
    margin-top: 20px;
    
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
    width: 720px;
    background: #fff;
    margin-left: 30px;
    .child-name{
        width: 720px;
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
.conditions{
    width: 690px;
    padding: 30px;
    display: -webkit-flex;
    align-items: center;
    font-size: 32px;
    color: #1B1B4E;
    .child-explain{
        width: 24px;
        height: 24px;
        display: block;
        background: url('../assets/img/explain.png') no-repeat center;
        background-size: cover;
        margin-left: 20px;
    }
}
.oldMan-info{
    width: 100%;
    height: auto;
    background: #fff;
    .support-wrapper{
        width: 690px;
        padding: 30px 30px 30px 0;
        display: -webkit-flex;
        margin-left: 30px;
        position: relative;
        justify-content: space-between;
        border-bottom: 1px solid #F6F6FF;
        label{
            width: 350px;
            font-size: 28px;
            color: #1B1B4E;
        }
        input{
            width: 400px;
            text-align: right;
            font-size: 28px;
        }
        p{
            width: 400px;
            font-size: 28px;
            color: #9DA3B4;
            text-align: right;
            background: url('../assets/img/right-arrow.png') no-repeat right center;
            background-size: 14px 24px;
            padding-right: 34px;
        }
        
    }
    .support-wrapper:last-child{
        border: none;
    }
}

.fontColor{
    color: #1B1B4E!important;
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


