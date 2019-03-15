<template>
    <div class="wage-container">
        <header @click="screen = !screen">
            <span>{{curDate}}</span>
        </header>
        <div class="wage-list">
            <ul :model="wageInfo" v-if="hasWage">
                <li>
                    <p>应发工资</p>
                    <p>￥{{wageInfo.wages}}</p>
                </li>
                <li class="checkDetailList">
                    <div class="project">
                        <p>社保扣除</p>
                        <p :class="unfold?'closelBtn':'detailBtn'" @click="unfold = !unfold">￥{{wageInfo.sbkc}}</p>
                    </div>
                    <ol class="detail-list" :class="unfold?'unfold':''">
                        <li>
                            <p>养老</p>
                            <p>￥{{wageInfo.pension}}</p>
                        </li>

                        <li>
                            <p>医疗</p>
                            <p>￥{{wageInfo.yl}}</p>
                        </li>
                        <li>
                            <p>失业</p>
                            <p>￥{{wageInfo.sy}}</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>公积金扣除</p>
                    <p>￥{{wageInfo.gjjkc}}</p>
                </li>
                <li class="checkDetailList">
                    <div class="project">
                        <p>专项附加扣除</p>
                        <p :class="additional?'closelBtn':'detailBtn'" @click="additional = !additional">￥{{wageInfo.deduction}}</p>
                    </div>
                    <ol class="detail-list" :class="additional?'unfold':''">
                        <li>
                            <p>子女教育</p>
                            <p>￥{{wageInfo.repChild}}</p>
                        </li>
                        <li>
                            <p>赡养老人</p>
                            <p>￥{{wageInfo.repSupport}}</p>
                        </li>
                        <li>
                            <p>住房贷款利息</p>
                            <p>￥{{wageInfo.repHouse}}</p>
                        </li>
                        <li>
                            <p>住房租金</p>
                            <p>￥{{wageInfo.repHouseRent}}</p>
                        </li>
                        <li>
                            <p>继续教育</p>
                            <p>￥{{wageInfo.repEducation}}</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>税前工资</p>
                    <p>￥{{wageInfo.preTax}}</p>
                </li>
                <li>
                    <p>个人所得税</p>
                    <p>￥{{wageInfo.tax}}</p>
                </li>
                <li>
                    <p>实发工资</p>
                    <p>￥{{wageInfo.realWages}}</p>
                </li>
            </ul>
            <ul v-else>
                <li>暂无数据</li>
            </ul>
        </div>
        
        <transition name="fade">
            <div class="screening-mask" v-if="screen">
                <div class="curTimer" @click="screen = !screen">
                    <span>{{curDate}}</span>
                </div>
                <div class="selectTime">
                    <div class="starting">
                        <p class="dateBtn">开始日期</p>
                        <p class="dateTimer" @click="showStartTime">{{startTime}}</p>
                    </div>
                    <mt-picker :slots="slots" :visibleItemCount="3"  @change="getStartTime" v-if="startStatus" className="picker"></mt-picker>
                    <div class="starting">
                        <p class="dateBtn">结束日期</p>
                        <p class="dateTimer" @click="showEndTime">{{endTime}}</p>
                    </div>
                    <mt-picker :slots="slots" :visibleItemCount="3"  @change="getEndTime" v-if="endStatus" className="picker"></mt-picker>
                    <div class="sure-wrapper">
                        <button class="sureBtn" @click="getSalaryDetails">确认</button>
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { Toast, Picker } from 'mint-ui'
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            hasWage: false,
            curDate: "",
            startTime:"请选择",
            companyId: this.$route.query.companyId,
            endTime:"请选择",
            startStatus:true,
            endStatus:false,
            screen: false,
            transitionHeight:"",
            unfold: false,
            additional:false,
            slots:
				[
			    {
		          flex: 1,
		          values: [],
		          className: 'slot1',
                  textAlign: 'center',
                  defaultIndex:  0,
		        }, {
		          divider: true,
		          content: '--',
		          className: 'slot2'
		        }, {
		          flex: 1,
		          values: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
		          className: 'slot3',
                  textAlign: 'center',
                  defaultIndex:  0,
		        }
              ],
            wageInfo: []
        }
    },
    methods: {
        getDate(timeStamp){//获取当前事件
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            this.curDate = year + "年" + month + "月";
            this.slots[0].values.push(year + "年")
            this.slots[2].defaultIndex = new Date(timeStamp).getMonth()
        },
        getStartTime(picker, values){//获取当前开始时间
            this.startTime = values[0]+''+values[1]
            
        },
        getEndTime(picker, values){//获取当前结束时间
            this.endTime = values[0]+''+values[1]
        },
        showStartTime(){//显示开始控件
            this.startStatus = true
            this.endStatus = false
        },
        showEndTime(){//显示结束控件
            this.startStatus = false
            this.endStatus = true
        },
        getSalaryDetails(){//获取时间段并作对比
            var startDate = parseInt(this.startTime.charAt(6));
            if(this.endTime !== "请选择"){
                var endDate = parseInt(this.endTime.charAt(6));
            } 
            console.log(startDate+""+endDate)
            if(startDate > endDate){
                Toast("请选择正确的日期区间")
                return;
            }
            if(this.endTime=="请选择"){
                var params = {
                    companyId: this.companyId,
                    ym: this.startTime=="请选择"?this.curDate:this.startTime
                };
                Service.readWages(params).then((res)=>{
                    if(res.code == 0){
                        if(res.data == null){
                            this.hasWage = false
                        }else{
                            this.hasWage = true
                            this.wageInfo = res.data
                            this.curDate = res.data.ym
                        }
                    
                    }else{
                    Toast(res.msg)
                    }
                })
                
            }else{
                var params = {
                    companyId: this.companyId,
                    ymStart: this.startTime,
                    ymEnd: this.endTime
                };
                Service.readWagesByDateArea(params).then((res)=>{
                    if(res.code == 0){
                        if(res.data == null){
                            this.hasWage = false
                        }else{
                            this.hasWage = true
                            this.wageInfo = res.data
                        }
                    
                    }else{
                    Toast(res.msg)
                    }
                })
                this.curDate = this.startTime+'-'+this.endTime
            }
            
            this.screen = false;
        }
    },
    mounted(){
        this.getDate(new Date())
        this.getSalaryDetails()
        
    }
}
</script>

<style lang="less" scoped>
.wage-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #FBFBFF;
    overflow-y: auto;
}
header{
    width: 100%;
    height: 92px;
    line-height: 92px;
    color: #1B1B4E;
    font-size: 32px;
    background: #fff;
    display: -webkit-flex;
    justify-content: center;
    border-bottom: 1px solid #F6F6FF;
    position: fixed;
    top: 0;
    span{
        padding-right: 40px;
        background: url("../assets/img/date-btm.png") no-repeat right center;
        background-size: 24px 24px;
    }
}
.wage-list{
    width: 100%;
    height: auto;
    background: #fff;
    margin-top: 92px;
    display: -webkit-flex;
    justify-content: flex-end;
    ul{
        width: 720px;
        li{
            padding: 30px 0;
            border-bottom: 1px solid #F6F6FF;
            display: -webkit-flex;
            justify-content: space-between;
            font-size: 28px;
            color: #1B1B4E;
            
            p:last-child{
                margin-right: 30px;
                color: #9DA3B4;
            }
        }
        li:last-child{
            border:none;
        }
    }
}
.checkDetailList{
    display: -webkit-flex;
    flex-direction: column;
    padding: 0!important;
    .project{
        padding: 30px 0;
        display: -webkit-flex;
        justify-content: space-between;
    }
    ol{
        height: 0;
        transition: all .3s;
        overflow: hidden;
        li{
            padding: 0 0 30px 0!important;
            border: none;
        }
    }
    .unfold{
        transition: all .3s;
        height: auto!important;
    }
}
.detailBtn{
    padding-right: 40px;
    background: url("../assets/img/detail-btm.png") no-repeat right center;
    background-size: 24px 24px;
}
.closelBtn{
    padding-right: 40px;
    background: url("../assets/img/detail-top.png") no-repeat right center;
    background-size: 24px 24px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.screening-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background:rgba(59,70,100,.8);
}
.curTimer{
    width: 100%;
    height: 92px;
    line-height: 92px;
    color: #1B1B4E;
    font-size: 32px;
    background: #fff;
    display: -webkit-flex;
    justify-content: center;
    border-bottom: 1px solid #F6F6FF;
    span{
        padding-right: 40px;
        background: url("../assets/img/date-top.png") no-repeat right center;
        background-size: 24px 24px;
    }
}
.selectTime{
    width: 100%;
    height: auto;
    background: #fff;
    padding-bottom: 30px;
    .starting{
        width: 690px;
        padding: 30px 0;
        margin: 0 auto;
        display: -webkit-flex;
        justify-content: space-between;
    }
}
.dateBtn{
    color: #1B1B4E;
    font-size: 32px;
    font-weight: 800;
}
.dateTimer{
    color: #1B1B4E;
    font-size: 28px;
    font-weight: 800;
}
.sure-wrapper{
    width: 100%;
    border-top: 1px solid #F6F6FF;
}
.sureBtn{
    width: 690px;
    padding: 22px 0;
    background: #3063AD;
    border-radius: 8px;
    text-align: center;
    color: #fff;
    font-size: 32px;
    display: block;
    margin: 30px auto 0;
}


</style>


