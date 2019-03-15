<template>
    <div class="basic-container">
        <div class="user-info">
            <div class="common-wrapper">
                <label for="user-name">*姓名</label>
                <input type="text" id="user-name" placeholder="请输入" v-model="userInfo.name">
            </div>
            <div class="common-wrapper">
                <label for="idType">*身份证件类型</label>
                <p id="idType" :class="userInfo.dictCardType == '请选择'?'':'fontColor'" @click="getCardType">{{userInfo.dictCardType}}</p>
            </div>
            <div class="common-wrapper">
                <label for="idNumber">*身份证件号码</label>
                <input type="text" id="idNumber" maxlength="18" placeholder="请输入18位身份证号" v-model="userInfo.idCard">
            </div>
            <div class="common-wrapper">
                <label for="nationality">*国籍（地区）</label>
                <p id="nationality" :class="userInfo.countryId == '请选择'?'':'fontColor'" @click="getCountry">{{userInfo.countryId}}</p>
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="submitBtn" @click="delChild" v-if="id">删除</button>
            <button class="submitBtn" @click="checkChildInfo">保存</button>
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
            be: this.$route.query.be,
            id: this.$route.query.id,
            supportId:  this.$route.query.supportId,
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            pickerStatus: false,
            data: [],
            pickerType: '',
            userInfo: {
                name: "",
                dictCardType: "请选择",
                idCard: "",
                countryId: "请选择",
            },
            cardType: [{
                values: [
                    "居民身份证",
                    "中国护照",
                    "港澳居民来往内地通行证",
                    "港澳居民居住证"
                ]}
            ],
        }  
    },
    components:{
        Picker
    },
    methods: {
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            if(data.pickerVal){
                if(data.pickerType == 'cardType'){
                    this.pickerStatus = data.status;
                    this.userInfo.dictCardType = data.pickerVal
                }else if(data.pickerType == 'country'){
                    this.pickerStatus = data.status;
                    this.userInfo.countryId = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
            }
        },
        getCardType(){//获取身份类型
            this.pickerType = 'cardType'
            this.pickerStatus = true;
            this.data = this.cardType
        },
        getCountry(){//获取国家地区
            var params = {};
            Service.queryCountry(params).then((res)=>{
                if(res.code == 0){
                    this.pickerType = 'country'
                    this.pickerStatus = true;
                    var newArr = [];
                    for (var i=0;i<res.data.length;i++) {
                        newArr.push(res.data[i].name)
                    }
                    this.data = [{values:newArr}]
                   
                }else{
                    Toast(res.msg)
                }
            })
        },
        checkChildInfo(){
            if(this.userInfo.name == ""){
                Toast("请输入姓名");
                return;
            }
            if(this.userInfo.dictCardType == "请选择"){
                Toast("请选择身份类型");
                return;
            }
            if(this.userInfo.idCard == ""){
                Toast("请输入证件号码");
                return;
            }
            if(this.userInfo.countryId == "请选择"){
                Toast("请选择国籍");
                return;
            }
            var params = {
                    id: this.id?this.id:'',
                    supportId: this.supportId,
                    repId: this.repId,
                    name: this.userInfo.name,
                    dictCardType:this.userInfo.dictCardType,
                    idCard: this.userInfo.idCard,
                    countryId: this.userInfo.countryId
            };
            Service.saveSupportTo(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/supportList",query:{be: this.be, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId, type: this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        getData(){
            var params = {
                supportToId: this.id
            };
            Service.querySupportTo(params).then((res)=>{
                if(res.code == 0){
                  this.userInfo = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){//删除共同赡养人信息
            this.$messagebox({
                  title: '温馨提示',
                  message: '确认要删除共同赡养人信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        supportToId: this.id
                    };
                    Service.delSupportTo(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                          setTimeout(()=>{
                            var path = {path: "/supportList",query:{be: this.be, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId, type: this.type}};
                            this.$router.push(path)
                        },1500)
                        }else{
                            Toast(res.msg)
                        }
                    })
              }
          })
        }
    },
    mounted(){
        if(this.id){
            this.getData()
        }
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
        .common-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.common-wrapper{
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
.btn-wrapper{
    width: 100%;
    background: #FAFAFF;
    padding: 30px 0;
    display: -webkit-flex;
    justify-content: space-between;
    .submitBtn{
        flex: 1;
        padding: 22px 0;
        margin: 0 30px;
        display: block;
        background: #3063AD;
        color: #fff;
        font-size: 28px;
        border-radius: 8px;
    }
}
/* 最小尺寸 */
@media screen and (min-height: 480px){
    .btn-wrapper{
        width: 100%;
        padding: 30px 0;
        position: absolute;
        bottom: 0;
    }
}
</style>