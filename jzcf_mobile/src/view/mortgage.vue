<template>
    <div class="house-container">
        <div class="house-info">
             <div class="martgage-wrapper">
                <label for="houseAddress">*房屋坐落地址</label>
                <p id="houseAddress" :class="houseInfo.pca == '请选择'?'':'fontColor'" @click="getAddress">{{houseInfo.pca}}</p>
            </div>
             <div class="martgage-wrapper">
                <label for="detailedAddress">*详细地址</label>
                <input type="text" id="detailedAddress" placeholder="如街道、小区、楼栋、单元室等" v-model="houseInfo.houseAddress">
            </div>
            <div class="martgage-wrapper">
                <label for="borrower">*本人是否借款人</label>
                <p id="borrower" :class="houseInfo.isBorrower == '请选择'?'':'fontColor'" @click="getIsBorrower">{{houseInfo.isBorrower}}</p>
            </div>
            <div class="martgage-wrapper">
                <label for="houseType">*房屋证书类型</label>
                <p id="houseType" :class="houseInfo.dictHouseCardType == '请选择'?'':'fontColor'" @click="getDictHouseCardType">{{houseInfo.dictHouseCardType}}</p>
            </div>
            <div class="martgage-wrapper">
                <label for="houseNumber">*房屋证书号码</label>
                <input type="text" id="houseNumber" placeholder="请输入" v-model="houseInfo.houseIdCard">
            </div>
            <div class="martgage-wrapper">
                <label for="ratio" class="ratio">婚前各自首套贷款，婚后各扣除50%</label>
                <p id="ratio" :class="houseInfo.isFristBorrower == '请选择'?'':'fontColor'" @click="getIsFristBorrower">{{houseInfo.isFristBorrower}}</p>
            </div>
        </div>
        <div class="spouse-info" v-if="status == 1">
            <div class="martgage-wrapper">
                <label for="bankName">*贷款银行</label>
                <input type="text" id="bankName" placeholder="请输入" v-model="houseInfo.busBankName">
            </div>
             <div class="martgage-wrapper">
                <label for="loanContract">*贷款合同编号</label>
                <input type="text" id="loanContract" placeholder="请输入" v-model="houseInfo.busLoanNo">
            </div>
             <div class="martgage-wrapper">
                <label for="refundDate">*首次还款日期</label>
                <p id="refundMouth" :class="houseInfo.busFirstRepaymentDate == '请选择'?'':'fontColor'" @click="busFirstRepaymentDate">{{houseInfo.busFirstRepaymentDate}}</p>
            </div>
            <div class="martgage-wrapper">
                <label for="refundMouth">*贷款期限（月数）</label>
                <input type="text" id="refundDate" placeholder="请输入" v-model="houseInfo.busLoanMonths">
            </div>
        </div>
        <div class="spouse-info" v-else>
             <div class="martgage-wrapper">
                <label for="loanContract">*贷款合同编号</label>
                <input type="text" id="loanContract" placeholder="请输入" v-model="houseInfo.gjjLoanNo">
            </div>
             <div class="martgage-wrapper">
                <label for="refundDate">*首次还款日期</label>
                <p id="refundMouth" :class="houseInfo.gjjFirstRepaymentDate == '请选择'?'':'fontColor'" @click="getRepaymentDate">{{houseInfo.gjjFirstRepaymentDate}}</p>
            </div>
            <div class="martgage-wrapper">
                <label for="refundMouth">*贷款期限（月数）</label>
                <input type="tel" id="refundDate" placeholder="请输入" v-model="houseInfo.gjjLoanMonths">
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="submitBtn" @click="delChild" v-if="id">清空</button>
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
            id: this.$route.query.id,
            repId: this.$route.query.repId,
            companyId: this.$route.query.companyId,
            collectionId: this.$route.query.collectionId,
            status: this.$route.query.status,
            type: this.$route.query.type?this.$route.query.type:"",
            pickerStatus: false,
            DataPickerStatus: false,
            pickerType:'',
            houseInfo: {
                pca:"请选择",
                houseAddress: "",
                isBorrower: "请选择",
                dictHouseCardType: "请选择",
                houseIdCard: "",
                isFristBorrower: "请选择",
                loanType: "请选择",
                busBankName: "",
                busLoanNo: "",
                busFirstRepaymentDate: "请选择",
                busLoanMonths: "",
                gjjLoanNo:"",
                gjjFirstRepaymentDate: "请选择",
                gjjLoanMonths: ""
            },
            data: [],
            borrower: [{
                 values: [
                    "是",
                    "否"
                ]}
            ],
            houseCardType: [{
                 values: [
                    "房屋所有产权",
                    "不动产权证",
                    "房屋买卖合同",
                    "房屋预售合同"
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
                if(data.pickerType == 'address'){
                    this.pickerStatus = data.status;
                    this.houseInfo.pca = data.pickerVal
                }else if(data.pickerType == 'isBorrower'){
                    this.pickerStatus = data.status;
                    this.houseInfo.isBorrower = data.pickerVal
                }else if(data.pickerType == 'houseCardType'){
                    this.pickerStatus = data.status;
                    this.houseInfo.dictHouseCardType = data.pickerVal
                }else if(data.pickerType == 'fristBorrower'){
                    this.pickerStatus = data.status;
                    this.houseInfo.isFristBorrower = data.pickerVal
                }else if(data.pickerType == 'busrepaymentDate'){
                    this.DataPickerStatus = data.status;
                    this.houseInfo.busFirstRepaymentDate = data.pickerVal
                }else if(data.pickerType == 'repaymentDate'){
                    this.DataPickerStatus = data.status;
                    this.houseInfo.gjjFirstRepaymentDate = data.pickerVal
                }
            }else{
                this.pickerStatus = data.status;
                this.DataPickerStatus = data.status;
            }
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
        getIsBorrower(){//获取是否本人借款
            this.pickerType = 'isBorrower'
            this.pickerStatus = true;
            this.data = this.borrower
        },
        getDictHouseCardType(){//获取房屋证书类型
            this.pickerType = 'houseCardType'
            this.pickerStatus = true;
            this.data = this.houseCardType
        },
        getIsFristBorrower(){//是否本人首套
            this.pickerType = 'fristBorrower'
            this.pickerStatus = true;
            this.data = this.borrower
        },
        getRepaymentDate(){//公积金日期
            this.pickerType = 'repaymentDate'
            this.DataPickerStatus = true
        },
        busFirstRepaymentDate(){//商业贷款日期
            this.pickerType = 'busrepaymentDate'
            this.DataPickerStatus = true
        },
        checkChildInfo(){
             console.log(this.houseInfo.busLoanNo)
            if(this.houseInfo.pca == "请选择"){
                Toast("请选择房屋坐落地址");
                return;
            }
            if(this.houseInfo.houseAddress == ""){
                Toast("请输入详细地址");
                return;
            }
            if(this.houseInfo.isBorrower == "请选择"){
                Toast("请选择本人是否借款人");
                return;
            }
            if(this.houseInfo.dictHouseCardType == "请选择"){
                Toast("请选择房屋证书类型");
                return;
            }
            if(this.houseInfo.houseIdCard == ""){
                Toast("请输入房屋证书号码");
                return;
            }
            if(this.status == 1){
               
                if(this.houseInfo.busLoanNo == ""){
                    Toast("请输入贷款合同编号");
                    return;
                }
                if(this.houseInfo.busFirstRepaymentDate == "请选择"){
                    Toast("请选择首次还款日期");
                    return;
                }
                if(this.houseInfo.busLoanMonths == ""){
                    Toast("请输入还款期限");
                    return;
                }
            }else{
                if(this.houseInfo.gjjLoanNo == ""){
                    Toast("请输入贷款合同编号");
                    return;
                }
                if(this.houseInfo.gjjFirstRepaymentDate == "请选择"){
                    Toast("请选择首次还款日期");
                    return;
                }
                if(this.houseInfo.gjjLoanMonths == ""){
                    Toast("请输入还款期限");
                    return;
                }
            }
            var params = {
                id: this.id,
                repId: this.repId,
                pca: this.houseInfo.pca,
                houseAddress: this.houseInfo.houseAddress,
                isBorrower: this.houseInfo.isBorrower=='是'?1:0,
                dictHouseCardType: this.houseInfo.dictHouseCardType,
                isFristBorrower: this.houseInfo.isFristBorrower=='是'?1:0,
                houseIdCard: this.houseInfo.houseIdCard,
                busLoanNo: this.houseInfo.busLoanNo,
                busBankName: this.houseInfo.busBankName,
                busFirstRepaymentDate: this.houseInfo.busFirstRepaymentDate=="请选择"?"":this.houseInfo.busFirstRepaymentDate,
                busLoanMonths: this.houseInfo.busLoanMonths,
                gjjLoanNo: this.houseInfo.gjjLoanNo,
                gjjFirstRepaymentDate: this.houseInfo.gjjFirstRepaymentDate=="请选择"?"":this.houseInfo.gjjFirstRepaymentDate,
                gjjLoanMonths: this.houseInfo.gjjLoanMonths
            }
            Service.saveHouse(params).then((res)=>{
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
        getData(){//获取贷款详细信息
            var params = {
                houseId: this.id
            }
            Service.queryHouse(params).then((res)=>{
                if(res.code == 0){
                  this.houseInfo = res.data
                  if(res.data.isBorrower == 1){
                      this.houseInfo.isBorrower = "是"
                  }else{
                      this.houseInfo.isBorrower = "否"
                  }
                  
                  if(res.data.isFristBorrower == 1){
                      this.houseInfo.isFristBorrower = "是"
                  }else{
                      this.houseInfo.isFristBorrower = "否"
                  }
                }else{
                    Toast(res.msg)
                }
            })
        },
        delChild(){//清空数据
            this.$messagebox({
                  title: '温馨提示',
                  message: '确认清空当前信息贷款信息',
                  showCancelButton: true,
                  confirmButtonText:"确认",
                  cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    var params = {
                        houseId: this.id,
                        loanType: this.status
                    };
                    Service.delHouse(params).then((res)=>{
                        if(res.code == 0){
                            Toast("清空成功")
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
        .martgage-wrapper:last-child{
            border: none;
        }
    }
    .spouse-info{
        margin-top: 20px;
    }
}
.martgage-wrapper{
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