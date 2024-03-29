/*
 使用方法示例：
 打包：
 打包dev环境：npm run build --dev
 打包test环境：npm run build --test
 打包pro环境：npm run build --pro
 本地运行：
 本地运行dev环境：npm run dev --dev
 本地运行test环境：npm run dev --test
 无【--xxx】参数，则默认为dev环境：npm run dev
 */
'use strict'
 
const chalk = require('chalk')
const path = require('path')
/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        dirName: 'dev',
        baseUrl: 'http://192.168.1.181:8080/batc/',
        assetsPublicPath:''
    },
    {
        //测试环境
        envName: 'test',
        dirName: path.resolve(__dirname, '../wechain'),
        baseUrl: '',
        assetsPublicPath: ''
    },
    {
        //生产环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'pro',
        dirName: path.resolve(__dirname, '../wechain'),
        baseUrl: '',
        assetsPublicPath:''
    },
 
]
console.log("process.env.assetsPublicPath="+process.env.assetsPublicPath)
//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[0]
// 把环境常量挂载到process.env.HOST_ENV方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl
process.env.ASSETS_PUBLIC_PATH = HOST_CONF.assetsPublicPath

// process.env.ENV_NAME = HOST_CONF.envName
// log选中的变量
console.log(chalk.green('当前环境：'))
console.log(HOST_ENV)
console.log(chalk.green('当前环境对应的常量：'))
console.log(HOST_CONF)
console.log(process.env.ASSETS_PUBLIC_PATH)

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST