<template>
    <div class="opinion-container">
        <div class="opinion-wrapper">
            <div class="opinion-title">意见与建议</div>
            <div class="opinion-content">
                <textarea class="details" name="contentVal" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助" v-model="form.contentVal" maxlength="200"></textarea>
                <div class="propmt">{{form.contentVal.length == 0?'0':form.contentVal.length}}/200</div>
            </div>
            <div class="opinion-title">相关截图<span>(选填)</span></div>
            <div class="uploade-wrapper">
                <div class="uploaderContainer">
                    <ul class="imgList">
                        <li v-for="(item, index) in form.imgDataUrl" :key="index">
                            <span class="closeBtn" @click="delectImg(index)"></span>
                            <img :src="item" alt="">
                        </li>
                    </ul>
                    <label class="uploaderBtn" for="uploader" v-if="picFlag">
                    </label>
                    <input type="file" id="uploader" @change='add_img'>
                </div>
            </div>
        </div>
        <div class="contact-propmt">输入有效联系方式以便我们联系你（选填）</div>
        <div class="contact-info">
            <label for="">联系方式</label>
            <input type="tel" id="phone" placeholder="邮箱/手机号" maxlength="11" v-model="form.phone">
        </div>
        <div class="submitBtn">
            <button @click="submitFeedback">提交反馈</button>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import { Service } from '../server/api.js'

export default {
    data(){
        return{
            name: this.$route.query.name,
            position: this.$route.query.position,
            companyId: this.$route.query.companyId,
            form:{
                contentVal: "",
                imgDataUrl: [],
                phone: "" 
            },
            contentLen: 0,
            picFlag: true,
        }
    },
    methods: {
        delectImg(ind){//删除当前点击图片
                this.form.imgDataUrl.splice(ind, 1);
                if (this.form.imgDataUrl.length < 4) {
                    this.picFlag = true;
                }
            },
        add_img(event){//添加照片，只做本地处理，未上传服务器
            this.files = event.target.files[0];  //提交的图片
            this.getBase64(event.target,(url)=>{
                if (this.form.imgDataUrl.length < 4) {
                    this.form.imgDataUrl.push('data:image/png;base64,'+url)   //显示的图片
                }
                if (this.form.imgDataUrl.length == 4) this.picFlag = false
                
            }); 
        },
        getBase64(file,callback){//base64
            var maxWidth = 640;
            if(file.files && file.files[0]){
                var thisFile = file.files[0];
                if(thisFile.size>2019200){
                    alert("图片不能超过2M");
                    return
                };
                var reader = new FileReader();
                reader.onload = function(event){
                    var imgUrl = event.target.result;
                    var img = new Image();
                    img.onload = function(){
                        var canvasId = 'canvasBase64Imgid',
                        canvas = document.getElementById(canvasId);
                        if(canvas!=null){document.body.removeChild(canvas);}
                        var canvas = document.createElement("canvas");
                        canvas.innerHTML = 'New Canvas';
                        canvas.setAttribute("id", canvasId);
                        canvas.style.display='none';
                        document.body.appendChild(canvas);
                        canvas.width = this.width;
                        canvas.height = this.height;
                        var imageWidth = this.width, 
                        imageHeight = this.height;
                        if (this.width > maxWidth){
                            imageWidth = maxWidth;
                            imageHeight = this.height * maxWidth/this.width;
                            canvas.width = imageWidth;
                            canvas.height = imageHeight;
                        }
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, imageWidth, imageHeight);
                        context.drawImage(this, 0, 0, imageWidth, imageHeight);
                        var base64 = canvas.toDataURL('image/png',1);
                        var imgbase = base64.substr(22);
                        callback(imgbase)
                    }
                    img.src = imgUrl;
                }
                reader.readAsDataURL(file.files[0]);
            }
        },
        submitFeedback(){
            if(this.form.contentVal == ""){
                Toast("请描述您的意见与建议")
                return;
            }
            var params = {
                opinion: this.form.contentVal,
                images: this.form.imgDataUrl,
                concat: this.form.phone
            }
            Service.saveFeedBack(params).then((res)=>{
                if(res.code == 0){
                    Toast("保存成功")
                    setTimeout(()=>{
                        var path = {path:'/mine',query:{name: this.name, position: this.position, companyId: this.companyId}};
                        this.$router.push(path)
                    },1500)
                }else{
                    Toast(res.msg)
                }
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
.opinion-container{
    width: 100%;
    height: 100%;
    position: relative;
    background: #FAFAFF;
}
.opinion-wrapper{
    width: 100%;
    height: auto;
    background: #fff;
    .opinion-title{
        width: 690px;
        padding: 30px;
        font-size: 32px;
        color: #1B1B4E;
        font-weight: 800;
    }
    .opinion-content{
        width: 690px;
        background: #F8F8F9;
        margin: 0 auto;
        border-radius: 8px;
        .details{
            width: 640px;
            padding: 30px;
            height: 260px;
            border:none;
            outline: none;
            background: none;
            line-height: 40px;
            color: #1B1B4E;
            font-size: 32px;
        }
        .details::-webkit-input-placeholder{
            font-size: 28px;
            line-height: 40px;
            color: #C9CFE0;
        }
        .propmt{
           width: 640px;
            padding: 30px;
            text-align: right;
            color: #9DA3B4;
            font-size: 28px;
        }
    }
}
.uploade-wrapper{
    width: 690px;
    padding: 0 30px;
}
.uploaderBtn{
    width: 160px;
    height: 160px;
    display: block;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
    background:#F8F8F9 url("../assets/img/add-image.png") no-repeat center;
    background-size: 48px 48px;
    overflow: hidden;
    border-radius: 8px;
}
#uploader{
    position: fixed;
    left: -99999999999px;
}
.resultWrapper{
    width: 80%;
    height: auto;
    padding: 10px;
    border: 1px dashed #ccc;
    border-radius: 3px;
}
.resultTtitle{
    margin-bottom: 10px;
}
.resultWrapper ul li{
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
}
.imgList{
    width: auto;
    display: block;
    border-radius: 3px;
    display: -webkit-box;
}
.imgList li{
    width: 160px;
    height: 160px;
    border-radius: 8px;
    border:1px solid #dcdfe6;
    overflow: hidden;
    display: -webkit-flex;
    align-items: center;
    position: relative;
    margin-right: 15px;
    background: #F8F8F9;
}
.imgList li img{
    width: 100%;
    height: auto;
}
.uploaderContainer{
    padding-bottom: 30px;
    display: -webkit-box;
}
.closeBtn{
    width: 100%;
    height: 0px;
    border-radius: 8px;
    background: rgba(0,0,0,.5) url('../assets/img/closePopup.png') no-repeat center;
    background-size: 80px;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transition: all .3s ease-in-out;
}
.imgList li:hover span{
    height: 160px;
}
.contact-propmt{
    width: 690px;
    padding: 30px;
    font-size: 28px;
    color: #C9CFE0;
}
.contact-info{
    width: 690px;
    padding: 30px;
    background: #fff;
    display: -webkit-flex;
    align-items: center;
    label{
        font-size: 32px;
        color: #1B1B4E;
        margin-right: 40px;
        font-weight: 800;
    }
    input{
        font-size: 28px;
        color: #1B1B4E;
    }
}
.submitBtn{
    width: 690px;
    padding: 30px;
    position: absolute;
    bottom: 0;
    button{
        width: 690px;
        padding: 20px 0;
        text-align: center;
        color: #fff;
        background: #3063AD;
        font-size: 32px;
        border-radius: 8px;
        font-weight: 800;
    }
}
</style>

