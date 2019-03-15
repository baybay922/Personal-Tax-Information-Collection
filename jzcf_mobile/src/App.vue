<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
html, body, #app{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background: #fff;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    font-size: 12px;
    font-family:PingFangSC-Regular;
}
/* 最小尺寸 */
@media screen and (min-width: 415px){
    body,html{
        width: 100%;
        height: 100%;
        position: relative;
        background: #1d1d28;
        
    }
    #app{
        width: 750px;
        height: 1334px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -667px;
        margin-left: -375px;
        border-radius: 4px;
    }
    /*滚动条样式*/
    *::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    *::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    *::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
}

</style>

