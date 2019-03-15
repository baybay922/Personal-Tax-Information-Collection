<template>
    <div class="about-container">
        <div class="companyInfo">
            <div class="img-wrapper">
                <img src="../assets/img/companyLogo.png" alt="">
            </div>
            <div class="company-name">九州财智科技（北京）有限公司</div>
            <div class="company-version">版本号：V1.0.0</div>
        </div>
        <ul class="otherInfo">
            <li>
                <p class="title">官方网站</p>
                <p class="titleInfo">www.jiuzhoucaizhi.com</p>
            </li>
            <li>
                <p class="title">微信公众号</p>
                <p class="titleInfo">九州财智</p>
            </li>
            <li>
                <p class="title">商务合作</p>
                <p class="titleInfo">jzcz2018@163.com</p>
            </li>
            <li>
                <p class="title">联系我们</p>
                <p class="titleInfo"></p>
            </li>
        </ul>
        <div class="copyright-wrapper">
            <p class="copyright-version">copyright@2019</p>
            <p class="copyright-company">九州财智科技（北京）有限公司 版权所有</p>
        </div>
    </div>
</template>
<style lang="less" scoped>
.about-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #FBFBFF;
}
.companyInfo{
    width:100%;
    background: #FFFFFF;
    padding: 120px 0;
    .img-wrapper{
        width: 160px;
        height: auto;
        margin: 0 auto;
        img{
            width: 100%;
            height: auto;
        }
    }
    .company-name{
        width: 100%;
        text-align: center;
        color: #1B1B4E;
        font-size: 32px;
        padding: 40px 0 10px 0;
    }
    .company-version{
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #9DA3B4;
    }
}
.otherInfo{
    width: 100%;
    background: #fff;
    margin-top: 20px;
    li{
        width: 720px;
        margin-left: 30px;
        border-bottom: 2px solid #F6F6FF;
        padding: 30px 0;
        display: -webkit-flex;
        justify-content: space-between;
        .title{
            font-size: 32px;
            color: #1B1B4E;
            font-weight: 500;
        }
        .titleInfo{
            margin-right: 30px;
            font-size: 28px;
            color:#9DA3B4;
            a{
                font-size: 28px;
                color:#9DA3B4;
                text-decoration:none;
            }
        }
    }
    li:last-child{
        border:none;
    }
}
.copyright-wrapper{
    width: 690px;
    padding: 30px;
    position: absolute;
    bottom: 0;
    color: #9DA3B4;
    font-size: 28px;
    p{
        text-align: center;
    }
    .copyright-version{
        margin-bottom: 10px;
    }
}
</style>


