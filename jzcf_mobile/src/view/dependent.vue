<template>
    <div class="basic-container">
        <div class="user-info">
            <div class="dependent-wrapper">
                <label for="user-name">*姓名</label>
                <input type="text" id="user-name" placeholder="请输入" v-model="userInfo.name">
            </div>
            <div class="dependent-wrapper">
                <label for="idType">*身份证件类型</label>
                <p id="idType" :class="userInfo.dictCardType == '请选择'?'':'fontColor'" @click="getCardType">{{userInfo.dictCardType}}</p>
            </div>
            <div class="dependent-wrapper">
                <label for="idNumber">*身份证件号码</label>
                <input type="text" id="idNumber" maxlength="18" placeholder="请输入18位身份证号" v-model="userInfo.idCard" @input="getBrithday">
            </div>
            <div class="dependent-wrapper">
                <label for="birthday">*出生日期</label>
                <p id="birthday" :class="userInfo.birthday == '请选择'?'':'fontColor'" @click="getbirthday">{{userInfo.birthday}}</p>
            </div>
            <div class="dependent-wrapper">
                <label for="nationality">*国籍（地区）</label>
                <p id="nationality" :class="userInfo.countryId == '请选择'?'':'fontColor'" @click="getCountry">{{userInfo.countryId}}</p>
            </div>
            <div class="dependent-wrapper">
                <label for="relation">*关系</label>
                <p id="relation" :class="userInfo.dictJoin == '请选择'?'':'fontColor'" @click="getdictJoinType">{{userInfo.dictJoin}}</p>
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
        <DatePicker
            :status='DataPickerStatus'
            :pickerType="pickerType"
            v-on:datePicker="getPickerVal">
        </DatePicker>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import Picker from '../components/picker'
import DatePicker from '../components/datePicker'
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            be: this.$route.query.be,
            id: this.$route.query.id,
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            isSigle: this.$route.query.isSigle,
            share:this.$route.query.share,
            deduction: this.$route.query.deduction,
            pickerStatus: false,
            DataPickerStatus: false,
            data: [],
            pickerType: '',
            userInfo: {
                name: "",
                dictCardType: "请选择",
                idCard: "",
                birthday: "请选择",
                countryId: "请选择",
                dictJoin: "请选择"
            },
            cardType: [{
                values: [
                    "居民身份证",
                    "中国护照",
                    "港澳居民来往内地通行证",
                    "港澳居民居住证"
                ]}
            ],
            dictJoinType: [{
                values: [
                    "父母",
                    "其他"
                ]}
            ],
        }  
    },
    components:{
        Picker,
        DatePicker
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
                }else if(data.pickerType == 'dictJoin'){
                    this.pickerStatus = data.status;
                    this.userInfo.dictJoin = data.pickerVal
                }else if(data.pickerType == 'birthday'){
                    this.DataPickerStatus = data.status;
                    this.userInfo.birthday = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.DataPickerStatus = data.status;
            }
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
        getCardType(){//获取身份类型
            this.pickerType = 'cardType'
            this.pickerStatus = true;
            this.data = this.cardType
        },
        getdictJoinType(){
            this.pickerType = 'dictJoin'
            this.pickerStatus = true;
            this.data = this.dictJoinType
        },
        getbirthday(){
            this.pickerType = 'birthday'
            this.DataPickerStatus = true;
        },
        checkChildInfo(){//校验并保存
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
            if(this.userInfo.birthday == "请选择"){
                Toast("请选择出生日期");
                return;
            }
            if(this.userInfo.countryId == "请选择"){
                Toast("请选择国籍");
                return;
            }
            if(this.userInfo.dictJoin == "请选择"){
                Toast("请选择关系");
                return;
            }
            var params = {
                    id: this.id?this.id:'',
                    repId: this.repId,
                    name: this.userInfo.name,
                    dictCardType:this.userInfo.dictCardType,
                    idCard: this.userInfo.idCard,
                    countryId: this.userInfo.countryId,
                    dictJoin: this.userInfo.dictJoin,
                    birthday: this.userInfo.birthday,
                    isSigle: this.isSigle=="是"?1:0,
                    dictShareType: this.share,
                    deduction: this.deduction
            };
            Service.saveSupportBe(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/supportList",query:{be: this.be, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId,type:this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        getData(){
            var params = {
                supportBeId: this.id
            };
            Service.querySupportBe(params).then((res)=>{
                if(res.code == 0){
                  this.userInfo = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){//删除被赡养人信息
            this.$messagebox({
                  title: '温馨提示',
                  message: '确认要删除被赡养人信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        supportBeId: this.id
                    };
                    Service.delSupportBe(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                          setTimeout(()=>{
                            var path = {path: "/supportList",query:{be: this.be, repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type:this.type}};
                            this.$router.push(path)
                        },1500)
                        }else{
                            Toast(res.msg)
                        }
                    })
              }
          })
        },
        getBrithday(){//输入身份证后自动获取出日期
            if(this.userInfo.idCard.length == 18){
                this.getBirthdayFromIdCard(this.userInfo.idCard)
            }
        },
        getBirthdayFromIdCard(idCard) {//根据输入校验出生日期
            var birthday = "";
            if(idCard != null && idCard != ""){
                if(idCard.length == 15){
                    birthday = "20"+idCard.substr(6,6);
                } else if(idCard.length == 18){
                    birthday = idCard.substr(6,8);
                }
            
                birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
            }
            
           this.userInfo.birthday = birthday
        },
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
        .dependent-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.dependent-wrapper{
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