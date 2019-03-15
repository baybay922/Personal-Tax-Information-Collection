<template>
    <div class="basic-container">
        <div class="user-info">
            <div class="base-wrapper">
                <label for="user-phone">*手机号码</label>
                <input type="tel" id="user-phone" maxlength="11" placeholder="请输入您的手机号" readonly="readonly" v-model="userInfo.phone">
            </div>
            <div class="base-wrapper">
                <label for="email">电子邮箱</label>
                <input type="email" id="email" placeholder="请输入您的电子邮箱" v-model="userInfo.email">
            </div>
            <div class="base-wrapper" @click="getAddress">
                <label for="address">联系地址(省市区)</label>
                <p id="address" :class="userInfo.pca == '请选择'?'':'fontColor'">{{userInfo.pca}}</p>
            </div>
            <div class="base-wrapper">
                <label for="addressInfo">详细地址</label>
                <input type="text" id="addressInfo" placeholder="如街道、小区、楼栋、单元室等" v-model="userInfo.address">
            </div>
            <div class="base-wrapper" @click="getIdType">
                <label for="idType">*纳税人身份证件类型</label>
                <p id="idType" :class="userInfo.distCardType == '请选择'?'':'fontColor'">{{userInfo.distCardType}}</p>
            </div>
            <div class="base-wrapper">
                <label for="idNumber">*纳税人身份证件号码</label>
                <input type="text" id="idNumber" placeholder="请输入您的身份证号" readonly="readonly" v-model="userInfo.idCard">
            </div>
        </div>
        <div class="spouse-info">
            <div class="base-wrapper" @click="getSpouseStatus">
                <label for="spouse">*配偶情况</label>
                <p id="spouse" :class="userInfo.isMarried == '请选择'?'':'fontColor'">{{userInfo.isMarried}}</p>
            </div>
           <div class="spouse-info" v-if="userInfo.isMarried == '有配偶'">
                <div class="base-wrapper">
                    <label for="spouseName">*配偶姓名</label>
                    <input type="text" id="spouseName" maxlength="11" placeholder="请输入" v-model="userInfo.spouseName">
                </div>
                <div class="base-wrapper" @click="getSpouseIdType">
                    <label for="spouseIdType">*配偶身份证件类型</label>
                    <p id="spouseIdType" :class="userInfo.distSpouseCardType == '请选择'?'':'fontColor'">{{userInfo.distSpouseCardType}}</p>
                </div>
                <div class="base-wrapper">
                    <label for="spouseIdNumber">*配偶身份证号码</label>
                    <input type="text" id="spouseIdNumber" maxlength="18" placeholder="请输入" v-model="userInfo.spouseIdCard">
                </div>
           </div>
        </div>
        
        <div class="btn-wrapper" style="margin-top: 20px;">
            <button class="submitBtn" @click="submitBaseInfo">保存</button>
        </div>
        <Picker
            :status='pickerStatus'
            :data="data"
            :pickerType="pickerType"
            v-on:pickerVal="getPickerVal">
        </Picker>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import Picker from '../components/picker'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            pickerStatus: false,
            pickerType:'',
            userInfo: {
                phone: '',
                email: '',
                pca: '请选择',
                address: '',
                distCardType: '居民身份证',
                idCard: '',
                isMarried: '请选择',
                spouseName: '',
                distSpouseCardType: '请选择',
                spouseIdCard: ''
            },
            data: [],
            idType: [{
                values: [
                    "居民身份证",
                    "中国护照",
                    "港澳居民来往内地通行证",
                    "港澳居民居住证"
                ]
            }],
            spouseType:[{
                 values: [
                    "有配偶",
                    "无配偶"
                ]
            }],
        }
    },
    components:{
        Picker
    },
    methods: {
        getData(){//获取预填信息
            var params = {
                repId: this.repId
            }
            Service.queryBaseInfo(params).then((res)=>{
                if(res.code == 0){
                    if(res.data.email){
                        this.userInfo = res.data
                        if(res.data.isMarried == 0){
                            this.userInfo.isMarried = "无配偶"
                        }else{
                            this.userInfo.isMarried = "有配偶"
                        }
                    }else{
                        this.userInfo.phone = res.data.phone
                    this.userInfo.idCard = res.data.idCard
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            this.pickerStatus = data.status;
            if(data.pickerVal){
                if(data.pickerType == 'address'){
                    this.userInfo.pca = data.pickerVal
                }else if(data.pickerType == 'idType'){
                    this.userInfo.distCardType = data.pickerVal
                }else if(data.pickerType == 'spouseStatus'){
                    this.userInfo.isMarried = data.pickerVal
                }else if(data.pickerType == 'distSpouseCardType'){
                    this.userInfo.distSpouseCardType = data.pickerVal
                }
            }
        },
        getIdType(){//现在个人身份证类型
            this.pickerType = 'idType'
            this.pickerStatus = true;
            this.data = this.idType
        },
        getAddress(){//选择地址
            var params = {};
            Service.queryPcaForPlug(params).then((res)=>{
                if(res.code == 0){
                    this.pickerType = 'address'
                    this.pickerStatus = true;
                    this.data = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        getSpouseStatus(){//现在配偶
            this.pickerType = 'spouseStatus'
            this.pickerStatus = true;
            this.data = this.spouseType
        },
        getSpouseIdType(){//选择配偶身份类型
            this.pickerType = 'distSpouseCardType'
            this.pickerStatus = true;
            this.data = this.idType
        },
        submitBaseInfo(){//校验并保存
            if(this.userInfo.isMarried == "请选择"){
                Toast("请选择配偶情况");
                return;
            }
            if(this.userInfo.isMarried == "有配偶"){
                if(this.userInfo.spouseName == ""){
                    Toast("请输入配偶姓名");
                    return;
                }
                if(this.userInfo.distSpouseCardType == "请选择"){
                    Toast("请输入配偶身份证件类型");
                    return;
                }
                if(this.userInfo.spouseIdCard == ""){
                    Toast("请输入配偶身份证号码");
                    return;
                }
            }
            var params = {
                repId: this.repId,
                phone: this.userInfo.phone,
                distCardType: this.userInfo.distCardType,
                idCard: this.userInfo.idCard,
                isMarried: this.userInfo.isMarried=="有配偶"?1:0,
                spouseName: this.userInfo.spouseName,
                distSpouseCardType: this.userInfo.distSpouseCardType=="请选择"?"":this.userInfo.distSpouseCardType,
                spouseIdCard: this.userInfo.spouseIdCard,
                email: this.userInfo.email,
                pca: this.userInfo.pca,
                address: this.userInfo.address
            };
            Service.saveBaseInfo(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功");
                    setTimeout(()=>{
                        var path = {path:'/submitInfo',query:{id: this.repId,companyId: this.companyId,collectionId: this.collectionId, type: this.type}};
                        this.$router.push(path)
                    },1500)
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
<style lang='less' scoped>
.basic-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    .user-info,.spouse-info{
        width: 100%;
        height: auto;
        background: #fff;
        .base-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.base-wrapper{
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
.btn-wrapper{
    width: 100%;
    background: #FAFAFF;
    padding: 30px 0;
    .submitBtn{
        width: 690px;
        padding: 22px 0;
        display: block;
        background: #3063AD;
        color: #fff;
        font-size: 28px;
        border-radius: 8px;
        margin: 0 auto;
    }
}
.fontColor{
    color: #1B1B4E!important;
}
/* 最小尺寸 */
@media screen and (min-height: 480px){
    .btn-wrapper{
        width: 100%;
        padding: 30px 0;
        position: inherit;
        bottom: 0;
    }
}
</style>