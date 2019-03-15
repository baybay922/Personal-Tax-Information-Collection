<template>
    <div class="house-container">
        <div class="house-info">
            <div class="tenement-wrapper">
                <label for="workArea" class="workArea">
                    <span>*工作地区</span>
                    <button class="child-explain" @click="checkExplainInfo"></button>
                </label>
                <p id="workArea" :class="houseInfo.jobPc == '请选择'?'':'fontColor'" @click="getWorAddress">{{houseInfo.jobPc}}</p>
            </div>
            <div class="tenement-wrapper">
                <label for="workType">*类型</label>
                <p id="workType" :class="houseInfo.lessorType == '请选择'?'':'fontColor'" @click="getLessorType">{{houseInfo.lessorType}}</p>
            </div>
            <div class="tenement-wrapper">
                <label for="rentName">出租方姓名（组织名称）</label>
                <input type="text" id="rentName" placeholder="请输入" v-model="houseInfo.lessorName">
            </div>
            <div class="tenement-wrapper" v-if="organization">
                <label for="rentIdType">出租房证件类型</label>
                <p id="rentIdType" :class="houseInfo.dictLessorCardType == '请选择'?'':'fontColor'" @click="getCardType">{{houseInfo.dictLessorCardType}}</p>
            </div>
            <div class="tenement-wrapper">
                <label for="rentIdNmuber">{{credit}}</label>
                <input type="text" id="rentIdNmuber" placeholder="请输入" maxlength="18" v-model="houseInfo.lessorIdCard">
            </div>
        </div>
        <div class="spouse-info">
            <div class="tenement-wrapper">
                <label for="houseAddress">*住房坐落地址</label>
                <p id="houseAddress" :class="houseInfo.pca == '请选择'?'':'fontColor'" @click="getAddress">{{houseInfo.pca}}</p>
            </div>
             <div class="tenement-wrapper">
                <label for="detailedAddress">*详细地址</label>
                <input type="text" id="detailedAddress" placeholder="如街道、小区、楼栋、单元室等" v-model="houseInfo.houseAddress">
            </div>
             <div class="tenement-wrapper">
                <label for="loanContract">住房租赁合同编号</label>
                <input type="text" id="loanContract" placeholder="请输入" v-model="houseInfo.leasingContractNo">
            </div>
            <div class="tenement-wrapper">
                <label for="startingDate">*租赁期起</label>
                <p id="startingDate" :class="houseInfo.leaseStartTime == '请选择'?'':'fontColor'" @click="getStartTime">{{houseInfo.leaseStartTime}}</p>
            </div>
            <div class="tenement-wrapper">
                <label for="endingDate">*租赁期止</label>
                <p id="endingDate" :class="houseInfo.leaseEndTime == '请选择'?'':'fontColor'" @click="getEndTime">{{houseInfo.leaseEndTime}}</p>
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
        <mt-popup
            v-model="explainVisible"
            position="bottom">
            <div class="popup-header">
                <p>适用条件</p>
                <button class="close-popup" @click="closeExplainInfo()"></button>
            </div>
            <div class="conditions-wrapper">
                <div class="conditions-title">大城市</div>
                <ul class="conditions-list">
                    <li>
                        <p>·直辖市，省会城市，计划单列市以及国务院确定的其他城市</p>
                    </li>
                </ul>
            </div>
            <div class="conditions-wrapper">
                <div class="conditions-title">中城市</div>
                <ul class="conditions-list">
                    <li>
                        <p>·市辖区户籍人口超过100万的</p>
                    </li>
                </ul>
            </div>
            <div class="conditions-wrapper">
                <div class="conditions-title">小城市</div>
                <ul class="conditions-list">
                    <li>
                        <p>·市辖区户籍人口不超过100万的</p>
                    </li>
                </ul>
            </div>
        </mt-popup>
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
            explainVisible: false,
            pickerStatus: false,
            DataPickerStatus: false,
	    YearPickerStatus: false,
            organization: true,
            credit:"身份证件号码",
            pickerType:'',
            houseInfo: {
                jobPc: "请选择",
                lessorType: "请选择",
                lessorName: "",
                dictLessorCardType: "请选择",
                lessorIdCard: "",
                pca: "请选择",
                houseAddress: "",
                leasingContractNo: "",
                leaseStartTime: "请选择",
                leaseEndTime: "请选择"
            },
            data: [],
            houseType: [{
                 values: [
                    "个人",
                    "组织"
                ]}
            ],
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
        Picker,
        DatePicker,
        PickerYear
    },
    methods: {
        checkExplainInfo(){//显示条件
            this.explainVisible = true
        },
        closeExplainInfo(){//隐藏条件
            this.explainVisible = false
        },
        getPickerVal( data ){//点击确定后获取当前值，并根据变量赋值
            
            if(data.pickerVal){
                if(data.pickerType == 'wrokAddress'){
                    this.pickerStatus = data.status;
                    this.houseInfo.jobPc = data.pickerVal
                }else if(data.pickerType == 'houseType'){
                    this.pickerStatus = data.status;
                    this.houseInfo.lessorType = data.pickerVal
                    if(data.pickerVal=="组织"){
                        this.organization = false;
                        this.credit = "统一社会信用代码"
                    }else{
                        this.organization = true;
                        this.credit = "身份证件号码"
                    }
                }else if(data.pickerType == 'cardType'){
                    this.pickerStatus = data.status;
                    this.houseInfo.dictLessorCardType = data.pickerVal
                }else if(data.pickerType == 'address'){
                    this.pickerStatus = data.status;
                    this.houseInfo.pca = data.pickerVal
                }else if(data.pickerType == 'startTime'){
                    this.YearPickerStatus = data.status;
                    this.houseInfo.leaseStartTime = data.pickerVal
                }else if(data.pickerType == 'endTime'){
                    this.YearPickerStatus = data.status;
                    this.houseInfo.leaseEndTime = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.YearPickerStatus = data.status;
            }
        },
        getWorAddress(){//获取主要工作城市
            var params = {};
            Service.queryPcaForPlug(params).then((res)=>{
                if(res.code == 0){
                    this.pickerType = 'wrokAddress'
                    this.pickerStatus = true;
                    this.data = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        getLessorType(){//获取出租房类型
            this.pickerType = 'houseType'
            this.pickerStatus = true;
            this.data = this.houseType
        },
        getCardType(){//获取身份类型
            this.pickerType = 'cardType'
            this.pickerStatus = true;
            this.data = this.cardType
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
        getStartTime(){
            this.pickerType = 'startTime'
	this.YearPickerStatus = true;
        },
        getEndTime(){
            this.pickerType = 'endTime'
this.YearPickerStatus = true;
        },
        checkChildInfo(){
            if(this.houseInfo.jobPc == "请选择"){
                Toast("请选择工作地区");
                return;
            }
            if(this.houseInfo.lessorType == "请选择"){
                Toast("请选择类型");
                return;
            }
            // if(this.houseInfo.lessorName == "" ){
            //     Toast("请输入出租方姓名（组织名称）");
            //     return;
            // }
            // if(this.houseInfo.lessorType == "个人" && this.houseInfo.dictLessorCardType == "请选择"){
            //     Toast("请选择出租房证件类型");
            //     return;
            // }
            // if(this.houseInfo.lessorType == "个人" && this.houseInfo.lessorIdCard == ""){
            //     Toast("请输入身份证件号码");
            //     return;
            // }
            // if(this.houseInfo.lessorType == "组织" && this.houseInfo.lessorIdCard == ""){
            //     Toast("请输入统一社会信用代码");
            //     return;
            // }
            if(this.houseInfo.pca == "请选择" ){
                Toast("请选择住房坐落地址");
                return;
            }
            if(this.houseInfo.houseAddress == "请选择" ){
                Toast("请输入详细地址");
                return;
            }
            if(this.houseInfo.leaseStartTime == "请选择" ){
                Toast("请选择租赁期起");
                return;
            }
            if(this.houseInfo.leaseEndTime == "请选择" ){
                Toast("请选择租赁期止");
                return;
            }
            var params = {
                id: this.id?this.id:'',
                repId: this.repId,
                jobPc: this.houseInfo.jobPc,
                lessorType: this.houseInfo.lessorType=="个人"?1:2,
                lessorName: this.houseInfo.lessorName=="请选择"?"":this.houseInfo.lessorName,
                dictLessorCardType: this.houseInfo.dictLessorCardType=="请选择"?"":this.houseInfo.dictLessorCardType,
                lessorIdCard: this.houseInfo.lessorIdCard,
                pca: this.houseInfo.pca,
                houseAddress: this.houseInfo.houseAddress,
                leasingContractNo: this.houseInfo.leasingContractNo,
                leaseStartTime: this.houseInfo.leaseStartTime,
                leaseEndTime: this.houseInfo.leaseEndTime
            }
            Service.saveHouseRent(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path: "/housingList",query:{id: this.id, repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type: this.type}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
        },
        getData(){//获取租房详细信息
            var params = {
                houseRentId: this.id
            }
            Service.queryHouseRent(params).then((res)=>{
                if(res.code == 0){
                    console.log(res)
                  this.houseInfo = res.data
                  if(res.data.lessorType == 2){
                      this.houseInfo.lessorType = "组织"
                  }else{
                      this.houseInfo.lessorType = "个人"
                  }
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){
            this.$messagebox({
                  title: '温馨提示',
                  message: '确认要删除当前租房信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        houseRentId: this.id
                    };
                    Service.delHouseRent(params).then((res)=>{
                        if(res.code == 0){
                           Toast("删除成功")
                          setTimeout(()=>{
                            var path = {path: "/housingList",query:{id: this.id, repId: this.repId,companyId: this.companyId,collectionId: this.collectionId,type: this.type}};
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
.house-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    .house-info,.spouse-info{
        width: 100%;
        height: auto;
        background: #fff;
        .tenement-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.tenement-wrapper{
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
.ratio{
    display: block;
    min-width: 500px;
    width:500px!important;
}
.fontColor{
    color: #1B1B4E!important;
}
.child-explain{
    width: 24px;
    height: 24px;
    display: block;
    background: url('../assets/img/explain.png') no-repeat center;
    background-size: cover;
    margin-left: 20px;
}
.workArea{
    display: -webkit-flex;
    align-items: center;
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
    padding: 40px 40px 0 40px;
    font-size: 28px;
    .conditions-title{
        color: #3B4664;
        
    }
    .conditions-list{
        color: #3B4664; 
        line-height: 40px;
    }
}
.conditions-wrapper:last-child{
    padding: 40px;
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
</style>