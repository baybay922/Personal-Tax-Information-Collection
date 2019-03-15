<template>
    <div class="homepage-container">
        <dl class="homepage-wrapper" :model="userInfo"  @click="$router.push({path: '/mine', query:{name: userInfo.realName, position: userInfo.position, companyId: userInfo.companyId}})">
           <dd>
               <img v-if="userInfo.facePath" :src="userInfo.facePath" alt="">
               <img v-else src="http://47.92.240.34/file/c/def.jpg"  alt="">
           </dd>
           <dt>
                <div class="homepage-name">{{ userInfo.realName }}</div>
                <div class="homepage-job">{{ userInfo.companyName }}</div>
           </dt>
        </dl>
        <div class="skills-wrapper">
            <dl @click="checkSafeCode">
                <dd>
                    <img src="../assets/img/wage.png" alt="">
                </dd>
                <dt>查工资</dt>
            </dl>
            <dl>
                <dd>
                    <a href="http://www.12333sb.com/shebaoka/"><img src="../assets/img/security.png" alt="">
                    </a>
                </dd>
                <dt>查社保</dt>
            </dl>
            <dl>
                <dd>
                    <a href="http://www.12333sb.com/gongjijin/"><img src="../assets/img/reserve.png" alt="">
                    </a>
                </dd>
                <dt>查公积金</dt>
            </dl>
        </div>
        <div class="news-wrapper">
            <div class="news-title">政策解读</div>
            <ul class="news-list">
                <li v-for="(item, ind) in userInfo.articleList" :key="ind" @click="$router.push({path: '/interpretation', query:{articleId: item.id}})">
                    <div class="news-info">
                        <p class="article">{{item.title}}</p>
                        <p class="author">{{item.creator}}</p>
                    </div>
                    <div class="new-img">
                        <img :src="item.coverPath" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="checkBtn">
            <button @click="$router.push({path: '/queryResults', query:{companyId: userInfo.companyId}})">申报信息查询</button>
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
            userInfo: {

            }
        }
    },
    methods: {
        getData(){
            var params = {
                    companyId: this.companyId
                };
                Service.getHomeInfo(params).then((res)=>{
                    if(res.code == 0){
                        console.log(res)
                        this.userInfo = res.data
                    }else{
                        Toast(res.msg)
                    }
                })
        },
        checkSafeCode(){
            var params = {}
            Service.queryUserInfo(params).then((res)=>{
                if(res.code == 0){
                    if(res.data.wagesPassword == null){
                        this.$messagebox({
                              title: '温馨提示',
                              message: '您还没有设置安全码，为了您的信息安全，是否立即前往设置',
                              showCancelButton: true,
                              confirmButtonText:"立即设置",
                              cancelButtonText:"暂时不用"
                        }).then(action => {//立即设置
                            if(action == 'confirm'){
                                var path = {path:'/setPassword',query: {companyId: this.companyId, pwdStatus: 0}}
                                this.$router.push(path)
                            }else{//暂时不用
                                var path = {path:'/checkWage',query: {companyId: this.companyId}}
                                this.$router.push(path)
                            }
                      })
                    }else{
                        var path = {path:'/setPassword',query: {companyId: this.companyId, pwdStatus: 2}}
                        this.$router.push(path)
                    }
                }else{
                    Toast(res.msg)
                }
            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.homepage-container{
    width: 100%;
    height: 100%;
    position: relative;
    background: #FAFAFF;
    overflow: hidden;
}
.homepage-wrapper{
    width: 100%;
    display: -webkit-flex;
    align-items: center;
    background:#fff url("../assets/img/right-arrow.png") no-repeat 710px center;
    background-size: 14px 24px;
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
        .homepage-name{
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
        .homepage-job{
            color: #9DA3B4;
            width: 462px;
            font-size: 24px;
        }
    }
}
.skills-wrapper{
    width: 100%;
    height: auto;
    padding: 50px 0;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin-top: 20px;
    dl{
        flex: 1;
        display: -webkit-flex;
        flex-direction: column;
        dd{
            width: 100px;
            height: 100px;
            margin: 0 auto;
            img{
                width: 100%;
                height: auto;
            }
        }
        dt{
            text-align: center;
            font-size: 28px;
            color: #1B1B4E;
        }
    }
}
.news-wrapper{
    width: 690px;
    padding: 0 30px;
    height: auto;
    background: #fff;
    margin-top: 20px;
    .news-title{
        width: 100%;
        padding: 30px 0;
        font-size: 32px;
        color: #1B1B4E;
        font-weight: 800;
    }
    .news-list{
        width: 100%;
        li{
            display: -webkit-flex;
            justify-content: space-between;
            padding: 30px 0;
            .news-info{
                width: 450px;
                font-size: 28px;
                font-weight: 1000;
                .article{
                    width: 100%;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    color: #1B1B4E;
                }
                .author{
                    margin-top: 40px;
                    color: #3B4664;
                }
            }
            .new-img{
                width: 220px;
                height: 160px;
                overflow: hidden;
                border-radius: 10px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
.checkBtn{
    width: 100%;
    padding: 30px 0;
    position: absolute;
    bottom: 0;
    button{
        width: 690px;
        padding: 22px 0;
        background: #3063AD;
        display: block;
        border-radius: 8px;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        font-size: 32px;
    }
}
</style>


