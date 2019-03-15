<template>
    <div class="child-container">
        <div class="user-info">
            <div class="childList-wrapper">
                <label for="user-name">*子女姓名</label>
                <input type="text" id="user-name" placeholder="请输入" v-model="userInfo.name">
            </div>
            <div class="childList-wrapper" @click="getCardType">
                <label for="idType">*身份证件类型</label>
                <p id="idType" :class="userInfo.distCardType == '请选择'?'':'fontColor'">{{userInfo.distCardType}}</p>
            </div>
            <div class="childList-wrapper">
                <label for="user-idNumber">*身份证件号码</label>
                <input type="text" id="user-idNumber" maxlength="18" placeholder="请输入18位身份证号码" v-model="userInfo.idCard" @input="getBrithday">
            </div>
            <div class="childList-wrapper" @click="getChildType">
                <label for="relation">*关系</label>
                <p id="relation" :class="userInfo.distRelationship == '请选择'?'':'fontColor'">{{userInfo.distRelationship}}</p>
            </div>
            <div class="childList-wrapper" @click="getBirthday">
                <label for="birthTime">*出生日期</label>
                <p id="birthTime" :class="userInfo.birthday == '请选择'?'':'fontColor'">{{userInfo.birthday}}</p>
            </div>
            <div class="childList-wrapper" @click="getCountry">
                <label for="nationality">*国籍（地区）</label>
                <p id="nationality" :class="userInfo.country == '请选择'?'':'fontColor'">{{userInfo.country}}</p>
            </div>
        </div>
        <div class="spouse-info">
            <div class="childList-wrapper" @click="getEducationStage">
                <label for="education">*当前受教育阶段</label>
                <p id="education" :class="userInfo.distEducationLevel == '请选择'?'':'fontColor'">{{userInfo.distEducationLevel}}</p>
            </div>
            <div class="childList-wrapper" @click="getEducationStarting">
                <label for="starting">*当前受教育起始时间</label>
                <p id="starting" :class="userInfo.currEducationStartTime == '请选择'?'':'fontColor'">{{userInfo.currEducationStartTime}}</p>
            </div>
            <div class="childList-wrapper" @click="getEducationEnding">
                <label for="ending">当前受教育结束时间</label>
                <p id="ending" :class="userInfo.currEducationEndTime == '请选择'?'':'fontColor'">{{userInfo.currEducationEndTime}}</p>
            </div>
            <div class="childList-wrapper" @click="getEducationEndTime">
                <label for="termination">教育终止时间</label>
                <p id="termination" :class="userInfo.educationEndTime == '请选择'?'':'fontColor'">{{userInfo.educationEndTime}}</p>
            </div>
            <div class="childList-wrapper" @click="getEducationCountry">
                <label for="countries">*当前就读国家（地区）</label>
                <p id="countries" :class="userInfo.distCurrEducationCountry == '请选择'?'':'fontColor'">{{userInfo.distCurrEducationCountry}}</p>
            </div>
            <div class="childList-wrapper">
                <label for="schoolName">*当前就读学校</label>
                <input type="text" id="schoolName" maxlength="30" placeholder="请输入学校名称" v-model="userInfo.currEducationSchool">
            </div>
            <div class="childList-wrapper" @click="getDeductProportion">
                <label for="proportion">*本人扣除比例</label>
                <p id="proportion" :class="userInfo.distChildRatio == '请选择'?'':'fontColor'">{{userInfo.distChildRatio}}</p>
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
        <PickerYear
            :status='YearPickerStatus'
            :pickerType="pickerType"
            v-on:datePicker="getPickerVal">
        </PickerYear>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import Picker from '../components/picker'
import DatePicker from '../components/datePicker'
import PickerYear from '../components/PickerYear'
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            id: this.$route.query.id,
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            type: this.$route.query.type?this.$route.query.type:"",
            pickerStatus: false,
            DataPickerStatus: false,
            YearPickerStatus: false,
            pickerType:'',
            userInfo: {
                name: '',
                distCardType: '请选择',
                idCard: '',
                distRelationship: '请选择',
                birthday: '请选择',
                country: '请选择',
                distEducationLevel: '请选择',
                currEducationStartTime: '请选择',
                currEducationEndTime: '请选择',
                educationEndTime: '请选择',
                distCurrEducationCountry: '请选择',
                currEducationSchool: '',
                distChildRatio: '请选择',
            },
            data: [],
            cardType: [{
                values: [
                    "居民身份证",
                    "中国护照",
                    "港澳居民来往内地通行证",
                    "港澳居民居住证"
                ]}
            ],
            childType: [{
                values: [
                    "子",
                    "女"
                ]}
            ],
            educationStage: [{
                values: [
                    "学前教育阶段",
                    "义务教育",
                    "高中阶段教育",
                    "高等教育"
                ]}
            ],
            deductProportion: [{
                values: [
                    "50%",
                    "100%"
                ]}
            ]
        }
    },
    components:{
        Picker,
        DatePicker,
        PickerYear
    },
    methods: {
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            if(data.pickerVal){
                if(data.pickerType == 'cardType'){
                    this.pickerStatus = data.status;
                    this.userInfo.distCardType = data.pickerVal
                }else if(data.pickerType == 'childType'){
                    this.pickerStatus = data.status;
                    this.userInfo.distRelationship = data.pickerVal
                }else if(data.pickerType == 'birthday'){
                    this.DataPickerStatus = data.status;
                    this.userInfo.birthday = data.pickerVal
                }else if(data.pickerType == 'country'){
                    this.pickerStatus = data.status;
                    this.userInfo.country = data.pickerVal
                }else if(data.pickerType == 'educationStage'){
                    this.pickerStatus = data.status;
                    this.userInfo.distEducationLevel = data.pickerVal
                }else if(data.pickerType == 'startDate'){
                    this.YearPickerStatus = data.status;
                    this.userInfo.currEducationStartTime = data.pickerVal
                }else if(data.pickerType == 'endDate'){
                    this.YearPickerStatus = data.status;
                    this.userInfo.currEducationEndTime = data.pickerVal
                }else if(data.pickerType == 'endTime'){
                    this.YearPickerStatus = data.status;
                    this.userInfo.educationEndTime = data.pickerVal
                }else if(data.pickerType == 'educationCountry'){
                    this.pickerStatus = data.status;
                    this.userInfo.distCurrEducationCountry = data.pickerVal
                }else if(data.pickerType == 'deductProp'){
                    this.pickerStatus = data.status;
                    this.userInfo.distChildRatio = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.YearPickerStatus = data.status;
                this.DataPickerStatus = data.status;
            }
        },
        getCardType(){//获取身份类型
            this.pickerType = 'cardType'
            this.pickerStatus = true;
            this.data = this.cardType
        },
        getChildType(){//获取关系类型
            this.pickerType = 'childType'
            this.pickerStatus = true;
            this.data = this.childType
        },
        getBirthday(){//获取出身日期
            this.pickerType = 'birthday'
            this.DataPickerStatus = true;
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
        getEducationStage(){//获取受教育阶段
            this.pickerType = 'educationStage'
            this.pickerStatus = true;
            this.data = this.educationStage
        },
        getEducationStarting(){//获取教育起始时间
            this.pickerType = 'startDate'
            this.YearPickerStatus = true;
        },
        getEducationEnding(){//获取教育结果时间
            this.pickerType = 'endDate'
            this.YearPickerStatus = true;
        },
        getEducationEndTime(){//获取教育终止时间
            this.pickerType = 'endTime'
            this.YearPickerStatus = true;
        },
        getEducationCountry(){//获取当前就读国家
            var params = {};
            Service.queryCountry(params).then((res)=>{
                if(res.code == 0){
                    this.pickerType = 'educationCountry'
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
        getDeductProportion(){//获取扣除比例
            this.pickerType = 'deductProp'
            this.pickerStatus = true;
            this.data = this.deductProportion
        },
        checkChildInfo(){//校验并保存
            if(this.userInfo.name == ""){
                Toast("请输入子女姓名");
                return;
            }
            if(this.userInfo.distCardType == "请选择"){
                Toast("请选择身份类型");
                return;
            }
            if(this.userInfo.idCard == ""){
                Toast("请输入证件号码");
                return;
            }
            if(this.userInfo.distRelationship == "请选择"){
                Toast("请选择关系类型");
                return;
            }
            if(this.userInfo.birthday == "请选择"){
                Toast("请选择出身日期");
                return;
            }
            if(this.userInfo.country == "请选择"){
                Toast("请选择国籍");
                return;
            }
            if(this.userInfo.distEducationLevel == "请选择"){
                Toast("请选择当前受教育阶段");
                return;
            }
            if(this.userInfo.currEducationStartTime == "请选择"){
                Toast("请选择当前受教育起始时间");
                return;
            }
            if(this.userInfo.distCurrEducationCountry == "请选择"){
                Toast("请选择当前就读国家");
                return;
            }
            if(this.userInfo.currEducationSchool == "请选择"){
                Toast("请输入当前就读学校");
                return;
            }
            if(this.userInfo.distChildRatio == "请选择"){
                Toast("请选择本人扣除比例");
                return;
            }
            var params = {
                    name: this.userInfo.name,
                    distCardType: this.userInfo.distCardType,
                    idCard:	this.userInfo.idCard,		   
                    distRelationship: this.userInfo.distRelationship,
                    birthday: this.userInfo.birthday ,    
                    country: this.userInfo.country,
                    distEducationLevel: this.userInfo.distEducationLevel,
                    currEducationStartTime: this.userInfo.currEducationStartTime+"-01",
                    currEducationEndTime: this.userInfo.currEducationEndTime=="请选择"?"":this.userInfo.currEducationEndTime+"-01",
                    educationEndTime: this.userInfo.educationEndTime=="请选择"?"":this.userInfo.educationEndTime+"-01",
                    distCurrEducationCountry: this.userInfo.distCurrEducationCountry,
                    currEducationSchool: this.userInfo.currEducationSchool,
                    distChildRatio: this.userInfo.distChildRatio,
                    repId: this.repId,
                    id: this.id?this.id:''
            };
            Service.saveChild(params).then((res)=>{
                if(res.code == 0){
                   Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/childList",query:{repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type:this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        getData(){//获取子女信息详情
            var params = {
                childId: this.id
            };
            Service.queryChild(params).then((res)=>{
                if(res.code == 0){
                    this.userInfo = res.data
                    if(res.data.currEducationEndTime){
                        this.userInfo.currEducationEndTime = res.data.currEducationEndTime.substring(0,7)
                    }else{
                        this.userInfo.currEducationEndTime = "请选择"
                    }
                    if(res.data.educationEndTime){
                       this.userInfo.educationEndTime = res.data.educationEndTime.substring(0,7)
                    }else{
                        this.userInfo.educationEndTime = "请选择"
                    }
                    this.userInfo.currEducationStartTime = res.data.currEducationStartTime.substring(0,7)
                    
                    
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){//删除当前子女
            this.$messagebox({
                  title: '温馨提示',
                  message: '确认要删除当前子女信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        childId: this.id
                    };
                    Service.delChild(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                          setTimeout(()=>{
                            var path = {path: "/childList",query:{repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type:this.type}};
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
.child-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    .user-info,.spouse-info{
        width: 100%;
        height: auto;
        background: #fff;
        .childList-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.childList-wrapper{
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

.fontColor{
    color: #1B1B4E!important;
}

</style>