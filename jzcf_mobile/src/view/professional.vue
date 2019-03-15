<template>
    <div class="child-container">
        <div class="user-info">
            
            <div class="profession-wrapper">
                <label for="idType">*继续教育类型</label>
                <p id="idType" :class="userInfo.dictOccupationType == '请选择'?'':'fontColor'" @click="getDictType">{{userInfo.dictOccupationType}}</p>
            </div>
            <div class="profession-wrapper">
                <label for="relation">*发证（批准）日期</label>
                <p id="relation" :class="userInfo.grantDate == '请选择'?'':'fontColor'" @click="getGrantDate">{{userInfo.grantDate}}</p>
            </div>
            <div class="profession-wrapper">
                <label for="user-name">*证书名称</label>
                <p id="relation" :class="userInfo.occCardId == '请选择'?'':'fontColor'" @click="getoccCardId">{{userInfo.occCardId}}</p>
            </div>
            <div class="profession-wrapper">
                <label for="user-name">*证书编号</label>
                <input type="text" id="user-name" placeholder="请输入" v-model="userInfo.cardNo">
            </div>
            <div class="profession-wrapper">
                <label for="user-name">*发证机关</label>
                <input type="text" id="user-name" placeholder="请输入" v-model="userInfo.grantDept">
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
            pickerStatus: false,
            DataPickerStatus: false,
            pickerType:'',
            userInfo: {
                dictOccupationType:"请选择",
                grantDate: "请选择",
                grantDept: "",
                occCardId: "请选择",
                cardNo: ""
            },
            data: [],
            dictType: [{
                values: [
                    "技能人员职业资格",
                    "专业技术人员职业资格"
                ]}
            ]
        }
    },
    components:{
        Picker,
        DatePicker
    },
    methods: {
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            if(data.pickerVal){
                if(data.pickerType == 'dictType'){
                    this.pickerStatus = data.status;
                    this.userInfo.dictOccupationType = data.pickerVal
                }else if(data.pickerType == 'grantDate'){
                    this.pickerStatus = data.status;
                    this.userInfo.grantDate = data.pickerVal
                }else if(data.pickerType == 'occCard'){
                    this.pickerStatus = data.status;
                    this.userInfo.occCardId = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.grantDate = data.status;
            }
        },
        getDictType(){//获取身份类型
            this.pickerType = 'dictType'
            this.pickerStatus = true;
            this.data = this.dictType
        },
        getoccCardId(){
            var params = {
                cardType: this.userInfo.grantDate=="技能人员职业资格"?1:2
            };
            Service.queryOccCard(params).then((res)=>{
                if(res.code == 0){
                    this.pickerType = 'occCard'
                    this.pickerStatus = true;
                    var newArr = [];
                    for (var i=0;i<res.data.length;i++) {
                        newArr.push(res.data[i].cardName)
                    }
                    this.data = [{values:newArr}]
                }else{
                    Toast(res.msg)
                }
            })
        },
        getGrantDate(){
            this.pickerType = 'grantDate'
            this.DataPickerStatus = true;
        },
        checkChildInfo(){//校验并保存
            if(this.userInfo.dictOccupationType == "请选择"){
                Toast("请选择继续教育类型");
                return;
            }
            if(this.userInfo.grantDate == "请选择"){
                Toast("请选择发证日期");
                return;
            }
            if(this.userInfo.occCardId == ""){
                Toast("请输入证书名称");
                return;
            }
            if(this.userInfo.cardNo == ""){
                Toast("请输入证书编号");
                return;
            }
            if(this.userInfo.grantDept == ""){
                Toast("请输入发证机关");
                return;
            }
            var params = {
                    id: this.id?this.id:'',
                    repId: this.repId,
                    dictOccupationType: this.userInfo.dictOccupationType,
                    grantDate: this.userInfo.grantDate,
                    grantDept: this.userInfo.grantDept,
                    occCardId: this.userInfo.occCardId,
                    cardNo: this.userInfo.cardNo,

            };
            Service.saveOccupation(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/educationList",query:{be: this.be, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId,type: this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        getData(){
            var params = {
                id: this.id
            };
            Service.queryOccupation(params).then((res)=>{
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
                  message: '确认删除职业资格继续教育',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        id: this.id
                    };
                    Service.delOccupation(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                            setTimeout(()=>{
                                var path = {path: "/educationList",query:{id: this.id, repId: this.repId, companyId: this.companyId, collectionId: this.collectionId,type: this.type}};
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
.child-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    .user-info,.spouse-info{
        width: 100%;
        height: auto;
        background: #fff;
        .profession-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.profession-wrapper{
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