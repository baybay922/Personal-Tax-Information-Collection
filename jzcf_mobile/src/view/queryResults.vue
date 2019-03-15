<template>
    <div class="result-container">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部呈报</mt-tab-item>
            <mt-tab-item id="2">呈报成功</mt-tab-item>
            <mt-tab-item id="3">呈报失败</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="result-list" :model="reportList">
                    <li v-for="(item, ind) in reportList" :key="ind" @click="$router.push({path:'/submitInfo', query:{companyId: companyId, status: item.status,collectionId: item.collectionId}})">
                        <p class="resDate">{{item.updateTime}}</p>
                        <p class="resStatus" v-html="getReportStatus(item.status)"></p>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
               <ul class="result-list" :model="sucReportList">
                    <li v-for="(item, ind) in sucReportList" :key="ind" @click="$router.push({path:'/submitInfo', query:{companyId: companyId, status: item.status,collectionId: item.collectionId}})">
                        <p class="resDate">{{item.updateTime}}</p>
                        <p class="resStatus" v-html="getReportStatus(item.status)"></p>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
               <ul class="result-list" :model="faiReportList">
                    <li v-for="(item, ind) in faiReportList" :key="ind" @click="$router.push({path:'/submitInfo', query:{companyId: companyId, status: item.status,collectionId: item.collectionId}})">
                        <p class="resDate">{{item.updateTime}}</p>
                        <p class="resStatus" v-html="getReportStatus(item.status)"></p>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import { Toast, MessageBox} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            companyId: this.$route.query.companyId,
            selected:'1',//注意就是这里，默认选字符串数字，不然初始没展示；
            reportList:[],
            sucReportList: [],
            faiReportList: []
        }
    },
    methods:{
        getData(){
            var params = {
                    companyId: this.companyId
                };
                Service.listHisReport(params).then((res)=>{
                    console.log(res)
                    if(res.code == 0){
                        this.reportList = res.data
                    }else{
                        Toast(res.msg)
                    }
                })
        },
        getReportStatus(status){//根据当前状态显示不同
            switch (status) {
                case 2:
                    return '<p class="resStatus">已呈报</p>'
                    break;
                case 3:
                    return '<p class="resStatus">已处理</p>'
                    break;
                case 4:
                    return '<p class="resStatus">呈报成功</p>'
                    break;
                case 5:
                    return '<p class="resStatus">呈报失败</p>'
                    break;
                case 6:
                    return '<p class="resStatus">呈报失败</p>'
                    break;
            }
        }
    },
    mounted(){
        this.getData()
    },
    watch: {
        selected:function(val, oldVal){//tab切换获取不同数据
            if(val == "2"){
                var params = {
                    companyId: this.companyId
                };
                Service.listSuccessReport(params).then((res)=>{
                    console.log(res)
                    if(res.code == 0){
                        this.sucReportList = res.data
                    }else{
                        Toast(res.msg)
                    }
                })
            }else if(val == "3"){
                var params = {
                    companyId: this.companyId
                };
                Service.listFailReport(params).then((res)=>{
                    console.log(res)
                    if(res.code == 0){
                        this.faiReportList = res.data
                    }else{
                        Toast(res.msg)
                    }
                })
            }else{
                this.getData()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.result-container{
    width: 100%;
    height: 100%;
    background: #FAFAFF;
    position: relative;
    overflow: hidden;
}
.mint-navbar{
    width: 100%;
    background: #FAFAFF;
}
.mint-tab-item{
    display: block;
    padding: 30px 0;
    text-decoration: none;
}
.mint-tab-item .mint-tab-item-label{
    font-size: 32px!important;
    color: #3B4664;
}
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: 8px solid #3667AF;
    color: #3667AF;
}
.mint-tab-container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
}
.result-list{
    width: 720px;
    margin-left: 30px;
    li{
        padding: 30px 0;
        background: url('../assets/img/right-arrow.png') no-repeat 676px center;
        background-size: 14px 24px;
        border-bottom: 1px solid #F6F6FF;
        display: -webkit-flex;
        justify-content: space-between;
        font-size: 28px;
        .resDate{
            color: #1B1B4E;
        }
        .resStatus{
            color: #9DA3B4;
            margin-right: 64px;
        }
    }
    li:last-child{
        border:none;
    }
}
</style>


