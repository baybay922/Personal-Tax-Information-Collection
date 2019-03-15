<template>
    <div class="newsInfo-container">
        <!-- {{content}} -->
        <div class="newsInfo-wrapper" :model="newsInfo">
            <p class="news-title">{{newsInfo.title}}</p>
            <div class="news-info">
                <p class="creator">{{newsInfo.creator}}</p>
                <p class="publishTime">{{newsInfo.publishTime}}</p>
            </div>
            <div class="news-content" v-html="newsInfo.context">
            </div>
        </div>
    </div>
</template>
<script>
import { Toast} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            articleId: this.$route.query.articleId,
            newsInfo:[],
            content:""
        }
    },
    methods: {
        getData(){
            var params = {
                    articleId: this.articleId
                };
                Service.queryArticle(params).then((res)=>{
                    if(res.code == 0){
                        console.log(res)
                        this.newsInfo = res.data
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
.newsInfo-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #FBFBFF;
    overflow-y: auto;
}
.newsInfo-wrapper{
    width: 690px;
    height: auto;
    margin: 0 auto;
    .news-title{
        padding: 30px 0 40px;
        color: #1B1B4E;
        font-size: 28px;
    }
}
.news-info{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    
    .creator{
        color: #3B4664;
        font-size: 28px;
    }
    .publishTime{
        color: #9DA3B4;
         font-size: 24px;
    }
}
.news-content{
    width: 100%;
    padding: 40px 0;
    background: #FAFAFF;
}

</style>


