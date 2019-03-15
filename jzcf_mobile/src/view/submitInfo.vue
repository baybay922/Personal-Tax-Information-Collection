<template>
    <div class="submit-container" :model="prefillInfo">
        <dl class="company-wrapper">
           <dd>
               <img :src="prefillInfo.companyLogoPath" alt="">
           </dd>
           <dt>
               <div class="company-name">{{prefillInfo.companyName}}</div>
	       <div v-if="type !== 'p'">
                <div class="sunmit-number" v-if="prefillInfo.reportStatus == 1">已呈报({{prefillInfo.reportCount}}/{{prefillInfo.collectionCount}})人</div>
                <div class="sunmit-number already" v-if="prefillInfo.reportStatus != 1">
                    <p>{{prefillInfo.reportTime}}</p>
                    <p>已呈报</p>
                </div>
		<div class="sunmit-number already" v-if="prefillInfo.reportStatus == 3">
                    <p>{{prefillInfo.updateTime}}</p>
                    <p>已处理</p>
                </div>
                <div class="sunmit-number already" v-if="prefillInfo.reportStatus == 4">
                    <p>{{prefillInfo.updateTime}}</p>
                    <p>呈报成功</p>
                </div>
                <div class="sunmit-number" v-if="prefillInfo.reportStatus == 5 || prefillInfo.reportStatus == 6">
                    <ul>

                         <li>
                            <p>{{prefillInfo.updateTime}}</p>
                            <p class="refused">呈报拒绝</p>
                        </li>
                    </ul>
                </div>
		</div>
           </dt>
        </dl>
        <div class="prompt" v-if="prefillInfo.reportStatus == 5 || prefillInfo.reportStatus ==6">{{prefillInfo.reportFailRemark}}</div>
        <div class="prompt" v-else>请填写个人真实信息，虚假信息会影响您的个人纳税信用</div>
        <div class="user-info">
            <dl @click="$router.push({path:'/basicInfo',query: {repId: prefillInfo.reportId, companyId: companyId,collectionId:collectionId,type:type}})">
                <dd class="baise">
                    基本信息
                </dd>
                <dt :class="prefillInfo.baseInfoStatus?'':'unfinish'">
                    {{prefillInfo.baseInfoStatus?'已完成':'未完成'}}
                </dt>
            </dl>
            <dl @click="$router.push({path:'/childList',query: {repId: prefillInfo.reportId,companyId: companyId,collectionId:collectionId,type:type}})">
                <dd class="children">
                    子女教育信息
                </dd>
                <dt :class="prefillInfo.childStatus?'':'unfinish'">
                    {{prefillInfo.childStatus?'已完成':'未完成'}}
                </dt>
            </dl>
            <dl @click="$router.push({path:'/housingList',query: {repId: prefillInfo.reportId,companyId: companyId,collectionId:collectionId,type:type}})">
                <dd class="housing">
                    租房住房信息
                </dd>
                <dt :class="prefillInfo.houseStatus?'':'unfinish'">
                    {{prefillInfo.houseStatus?'已完成':'未完成'}}
                </dt>
            </dl>
            <dl @click="$router.push({path:'/supportList',query: {repId: prefillInfo.reportId, be: prefillInfo.supportStatus?'1':'0',companyId: companyId,collectionId:collectionId,type:type}})">
                <dd class="support">
                    赡养老人信息
                </dd>
                <dt :class="prefillInfo.supportStatus?'':'unfinish'">
                    {{prefillInfo.supportStatus?'已完成':'未完成'}}
                </dt>
            </dl>
            <dl @click="$router.push({path:'/educationList',query: {repId: prefillInfo.reportId,companyId: companyId,collectionId:collectionId, type: type}})">
                <dd class="education">
                    继续教育信息
                </dd>
                <dt :class="prefillInfo.educationStatus?'':'unfinish'">
                    {{prefillInfo.educationStatus?'已完成':'未完成'}}
                </dt>
            </dl>
            <dl @click="checkClick" v-if="type !== 'p'">
                <dd class="medical">
                    大病医疗
                </dd>
                <dt :class="prefillInfo.readyIllness?'':'unfinish'">
                    {{prefillInfo.readyIllness?'已完成':'未完成'}}
                </dt>
            </dl>
        </div>
        <div class="btn-wrapper" v-if="type !== 'p'">
            <button class="submit-btn" @click="submitUserInfo" v-if="prefillInfo.reportStatus == 1 || prefillInfo.reportStatus == 2 || prefillInfo.reportStatus == 3 || prefillInfo.reportStatus == 4">上报</button>
            <button class="submit-btn" @click="submitUserInfo" v-else>再次上报</button>
            <button class="submit-btn-right" @click="$router.push({path:'/homepage',query:{companyId:companyId}})">返回首页</button>
        </div>
        <div class="btn-wrapper" v-else>
            <button class="submit-btn-full" @click="$router.push({path:'/homepage',query:{companyId:companyId}})">返回首页</button>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox} from 'mint-ui'
import { Service } from '../server/api.js'
export default {
    data(){
        return{
            companyId: this.$route.query.companyId,
            prefillInfo:[],
            collectionId: this.$route.query.collectionId,
            repId: "",
            status: this.$route.query.status,
            type: this.$route.query.type?this.$route.query.type:'',
            showSubmitStatus:false
        }
    },
    methods: {
        getData(){//获取六项信息状态
            var params = {
                companyId: this.companyId,
                collectionId: this.collectionId
            }
            Service.report(params).then((res)=>{
                if(res.code == 0){
                    this.prefillInfo = res.data
                    this.repId = res.data.reportId
                }else{
                    Toast(res.msg)
                }
            })
        },

        checkClick(){//大病医疗
            var params = {}
            
            Service.readyIllness(params).then((res)=>{
                if(res.code == 0){
                    Toast("由纳税人自行办理汇算清缴")
                    if(this.type == "p"){
                        this.getPrefill()
                    }else{
                        this.getData();
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        submitUserInfo(){//确认提交信息
            if(this.prefillInfo.baseInfoStatus){
                this.$messagebox({
                      title: '温馨提示',
                      message: '请确保信息的真实性，虚假信息会影响您的个人纳税信用，如因填写不规范导致扣缴义务人信息采集失败将会影响个人享受专项附加扣除。',
                      showCancelButton: true,
                      confirmButtonText:"确认",
                      cancelButtonText:"取消"
                }).then(action => {
                    if(action == 'confirm'){
                        var params = {
                            repId: this.repId
                        };
                        Service.saveReport(params).then((res)=>{
                            if(res.code == 0){
                            Toast("呈报成功，等待企业审核")
                            setTimeout(()=>{
                                var path = {path: "/homepage",query:{companyId: this.companyId, repId: this.repId}};
                                this.$router.push(path)
                            },1500)
                            }else{
                                Toast(res.msg)
                            }
                        })
                  }
              })
            }else{
                Toast("基本信息必须填写")
            }
            
        },
        getPrefill(){
            var params = {
                companyId: this.companyId
            }
            Service.prefill(params).then((res)=>{
                if(res.code == 0){
                    this.prefillInfo = res.data
                    this.repId = res.data.reportId
                }else{
                    Toast(res.msg)
                }
            })
        }

    },
    mounted(){
        if(this.type == 'p'){
            document.title = "预填信息"
            this.getPrefill()
            this.showSubmitStatus = false
        }else{
            var params = {
                companyId: this.companyId,
                collectionId: this.collectionId
            }
            Service.reportValid(params).then((res)=>{
                if(res.code == 1 || res.code == 3){
                    this.getData();
                }else if(res.code == 2){
                    this.$messagebox({
                      title: '温馨提示',
                      message: '是否使用已有预填信息',
                      showCancelButton: true,
                      confirmButtonText:"立即使用",
                      cancelButtonText:"暂时不用"
                        }).then(action => {
                            if(action == 'confirm'){
                                var params = {
                                    companyId: this.companyId,
                                    collectionId: this.collectionId
                                };
                                Service.reportByPrefill(params).then((res)=>{
                                    if(res.code == 0){
                                        this.prefillInfo = res.data
                                        this.repId = res.data.reportId
                                    }else{
                                        Toast(res.msg)
                                    }
                                })
                            }else{
                                this.getData();
                            }
                      })
                }
            })
           
            this.showSubmitStatus = true
        }
    }
}
</script>
<style lang="less" scoped>
.submit-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    overflow: hidden;
}
.company-wrapper{
    width: 690px;
    border-radius: 16px;
    margin: 30px auto 0;
    background: #fff;
    display: -webkit-flex;
    align-items: center;
    box-shadow:0px 2px 8px 0px rgba(23,42,146,0.04);
    dd{
        width: 120px;
        min-width: 120px;
        min-height: 120px;
        border-radius: 100%;
        overflow: hidden;
        background: #F6F6FF;
        margin: 30px;
        img{
            width: 100%;
            height: auto;
        }
    }
    dt{
        margin-left: 20px;
        display: -webkit-flex;
        flex-direction: column;
        .company-name{
            width: 462px;
            color: #1B1B4E;
            font-size: 28px;
            line-height: 40px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-weight:1000;
            margin-bottom: 12px;
        }
        .sunmit-number{
            color: #9DA3B4;
            width: 462px;
            font-size: 24px;
            li{
                display: -webkit-flex;
                justify-content: space-between;
            }
        }
    }
}
.prompt{
    width: 690px;
    padding: 30px 20px 10px;
    color: #9DA3B4;
    font-size: 24px;
    text-align: center;
}
.user-info{
    width: 690px;
    margin: 0 auto;
    dl{
        width: 690px;
        padding: 30px 0;
        display: -webkit-flex;
        justify-content: space-between;
        background: #fff;
        margin-top: 20px;
        dd{
            text-indent: 120px;
            background: url('../assets/img/basic.png') no-repeat 30px center;
            background-size: 40px;
            font-size: 28px;
            font-weight:1000;
            color: #1B1B4E;
        }
        .children{
            background: url('../assets/img/children.png') no-repeat 30px center;
            background-size: 40px;
        }
        .housing{
            background: url('../assets/img/housing.png') no-repeat 30px center;
            background-size: 40px;
        }
        .support{
            background: url('../assets/img/support.png') no-repeat 30px center;
            background-size: 40px;
        }
        .education{
            background: url('../assets/img/education.png') no-repeat 30px center;
            background-size: 40px;
        }
        .medical{
            background: url('../assets/img/medical.png') no-repeat 30px center;
            background-size: 40px;
        }
        dt{
            font-size: 24px;
            padding: 0 34px;
            margin-right: 30px;
            background: url('../assets/img/right-arrow.png') no-repeat right center;
            background-size: 14px 24px;
            color: #3B4664;
        }
        .unfinish{
            color: #9DA3B4;
        }
    }
}

.btn-wrapper{
    width: 100%;
    background: #FAFAFF;
    padding: 30px 0;
    .submit-btn{
        width: 45%;
        padding: 22px 0;
        background: #3063AD;
        text-align: center;
        font-size: 28px;
        color: #fff;
	    float:left;
        letter-spacing: 5px;
        margin: 5px auto;
        display: block;
        border-radius: 8px;
    }
    .submit-btn-full{
        width: 690px;
        padding: 22px 0;
        background: #3063AD;
        text-align: center;
        font-size: 28px;
        color: #fff;
        letter-spacing: 5px;
        margin: 5px auto;
        display: block;
        border-radius: 8px;
    }
    .submit-btn-right{
        width: 45%;
        padding: 22px 0;
        background: #3063AD;
        text-align: center;
        font-size: 28px;
        color: #fff;
	float:right;
        letter-spacing: 5px;
        margin: 5px auto;
        display: block;
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
.refused{
    color: #FF4824;
}
.already{
    display: -webkit-flex;
    justify-content: space-between;
}
</style>
