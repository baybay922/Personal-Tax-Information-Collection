<template>
    <div class="child-container">
        <div class="user-info">
            <div class="degree-wrapper">
                <label for="idType">*教育阶段</label>
                <p id="idType" :class="userInfo.distEducationLevel == '请选择'?'':'fontColor'" @click="getEducationLevel">{{userInfo.distEducationLevel}}</p>
            </div>
            <div class="degree-wrapper">
                <label for="idType">*当前继续教育起始时间</label>
                <p id="idType" :class="userInfo.educationStartTime == '请选择'?'':'fontColor'" @click="getEducationStarting">{{userInfo.educationStartTime}}</p>
            </div>
            <div class="degree-wrapper">
                <label for="idType">*当前继续教育结束时间</label>
                <p id="idType" :class="userInfo.educationEndTime == '请选择'?'':'fontColor'" @click="getEducationEnding">{{userInfo.educationEndTime}}</p>
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="submitBtn" @click="delChild" v-if="id">删除</button>
            <button class="submitBtn" @click="checkEducationInfo">保存</button>
        </div>
        <Picker
            :status='pickerStatus'
            :data="data"
            :pickerType="pickerType"
            v-on:pickerVal="getPickerVal">
        </Picker>
        <PickerYear
            :status='DataPickerStatus'
            :pickerType="pickerType"
            v-on:datePicker="getPickerVal">
        </PickerYear>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import Picker from '../components/picker'
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
            pickerType:'',
            userInfo: {
               distEducationLevel: "请选择",
               educationStartTime: "请选择",
               educationEndTime: "请选择",
            },
            data: [],
            educationStage: [{
                values: [
                    "大学专科",
                    "大学本科",
                    "硕士研究生",
                    "博士研究生",
                    "其他"
                ]}
            ],
        }
    },
    components:{
        Picker,
        PickerYear
    },
    methods: {
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
           
            if(data.pickerVal){
                if(data.pickerType == 'level'){
                    this.pickerStatus = data.status;
                    this.userInfo.distEducationLevel = data.pickerVal
                }else if(data.pickerType == 'startDate'){
                    this.DataPickerStatus = data.status;
                    this.userInfo.educationStartTime = data.pickerVal
                }else if(data.pickerType == 'endDate'){
                    this.DataPickerStatus = data.status;
                    this.userInfo.educationEndTime = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.DataPickerStatus = data.status;
            }
        },
        getEducationLevel(){
            this.pickerType = 'level'
            this.pickerStatus = true;
            this.data = this.educationStage
        },
        getEducationStarting(){//获取教育起始时间
            this.pickerType = 'startDate'
            this.DataPickerStatus = true;
        },
        getEducationEnding(){//获取教育结果时间
            this.pickerType = 'endDate'
            this.DataPickerStatus = true;
        },
        checkEducationInfo(){
            if(this.userInfo.getEducationLevel == "请选择"){
                Toast("请选择当前教育阶段")
                return;
            }
            if(this.userInfo.educationStartTime == "请选择"){
                Toast("请选择当前继续教育起始时间")
                return;
            }
            if(this.userInfo.educationEndTime == "请选择"){
                Toast("请选择当前继续教育结束时间")
                return;
            }
            var params = {
                    repId: this.repId,
                    id: this.id?this.id:'',
                    distEducationLevel: this.userInfo.distEducationLevel,
                    educationStartTime: this.userInfo.educationStartTime+"-01",
                    educationEndTime: this.userInfo.educationEndTime+"-01"

            };
            Service.saveQualification(params).then((res)=>{
                if(res.code == 0){
                   Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/educationList",query:{id: this.id, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId, type: this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){
             this.$messagebox({
                  title: '温馨提示',
                  message: '确认要删除当前学历教育信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        id: this.id
                    };
                    Service.delQualification(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                          setTimeout(()=>{
                            var path = {path: "/educationList",query:{id: this.id, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId, type: this.type}};
                            this.$router.push(path)
                        },1500)
                        }else{
                            Toast(res.msg)
                        }
                    })
              }
          })
        },
        getData(){//获取子女信息详情
            var params = {
                id: this.id
            };
            Service.queryQualification(params).then((res)=>{
                if(res.code == 0){
                    this.userInfo = res.data
                    this.userInfo.educationStartTime = res.data.educationStartTime.substring(0,7)
                    this.userInfo.educationEndTime = res.data.educationEndTime.substring(0,7)
                }else{
                    Toast(res.msg)
                }
            })
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
        .degree-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.degree-wrapper{
    width: 690px;
    padding: 30px 30px 30px 0;
    display: -webkit-flex;
    margin-left: 30px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid #F6F6FF;
    label{
        width: 600px;
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
    position: absolute;
    bottom: 0;
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