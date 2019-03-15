<template>
    <div class="submit-container">
        <dl class="company-wrapper">
           <dd>
               <img src="../assets/img/companyLogo.png" alt="">
           </dd>
           <dt>
               <div class="company-name">九州财智科技（北京）有限公司京）有限公司</div>
                <div class="sunmit-number">
                    <p class="resDate">2018-03-02 11:30</p>
                    <p class="resStatus">已呈报</p>
                </div>
           </dt>
        </dl>
        <div class="prompt">请填写个人真实信息，虚假信息会影响您的个人纳税信用</div>
        <div class="user-info">
            <dl @click="$router.push('/basicInfo')">
                <dd class="baise">
                    基本信息
                </dd>
                <dt>
                    已完成
                </dt>
            </dl>
            <dl @click="$router.push('/childList')">
                <dd class="children">
                    子女教育信息
                </dd>
                <dt>
                    已完成
                </dt>
            </dl>
            <dl @click="$router.push('/housingList')">
                <dd class="housing">
                    租房住房信息
                </dd>
                <dt>
                    已完成
                </dt>
            </dl>
            <dl @click="$router.push('/supportList')">
                <dd class="support">
                    赡养老人信息
                </dd>
                <dt>
                    已完成
                </dt>
            </dl>
            <dl @click="$router.push('/educationList')">
                <dd class="education">
                    继续教育信息
                </dd>
                <dt>
                    未完成
                </dt>
            </dl>
            <dl @click="checkClick">
                <dd class="medical">
                    大病医疗
                </dd>
                <dt>
                    未完成
                </dt>
            </dl>
        </div>
        <div class="btn-wrapper">
            <button class="submit-btn" @click="submitUserInfo">再次上报</button>
        </div>
        
    </div>
</template>
<script>
import { Toast, MessageBox} from 'mint-ui'
export default {
    data(){
        return{

        }
    },
    methods: {
        checkClick(){
            Toast("由纳税人自行办理汇算清缴")
        },
        submitUserInfo(){//确认提交信息
             MessageBox.confirm('', { 
                message: '请确保信息的真实性，虚假信息会影响您的个人纳税信用，如因填写不规范导致扣缴义务人信息采集失败将会影响个人享受专项附加扣除。', 
                title: '确认上报', 
                confirmButtonText: '确认', 
                cancelButtonText: '返回' 
            })
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
            display: -webkit-flex;
            justify-content: space-between;
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
    }
}

.btn-wrapper{
    width: 100%;
    background: #FAFAFF;
    padding: 30px 0;
    .submit-btn{
        width: 690px;
        padding: 22px 0;
        background: #3063AD;
        text-align: center;
        font-size: 28px;
        color: #fff;
        letter-spacing: 5px;
        margin: 0 auto;
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
</style>
