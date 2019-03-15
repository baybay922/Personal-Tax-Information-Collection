import Vue from 'vue'
import Router from 'vue-router'
//基础页面
import homepage from '../view/homepage.vue'//首页
import login from '../view/login.vue'//登录

import submitInfo from '../view/submitInfo.vue'//呈报信息列表
import basicInfo from '../view/basicInfo.vue'//基本信息
import selectCompany from '../view/selectCompany.vue'//选择企业
import childList from '../view/childList.vue'//子女列表
import childInfo from '../view/childInfo.vue'//子女信息详情
import housingList from '../view/housingList.vue'//租房住房列表
import mortgage from '../view/mortgage.vue'//贷款信息
import tenement from '../view/tenement.vue'//租房信息
import supportList from '../view/supportList.vue'//老人列表
import dependent from '../view/dependent.vue'//被赡养老人信息
import commonPeople from '../view/commonPeople.vue'//被赡养老人信息
import educationList from '../view/educationList.vue'//继续教育列表
import degreeInfo from '../view/degreeInfo.vue'//学历教育信息
import professional from '../view/professional.vue'//职业教育信息

import aboutUs from '../view/aboutUs.vue'//关于我们
import setPassword from '../view/setPassword.vue'//设置密码
import searchCompany from '../view/searchCompany.vue'//搜索企业
import feedback from '../view/feedback.vue'//意见反馈
import mine from '../view/mine.vue'//个人中心
import invoiceInfo from '../view/invoiceInfo.vue'//开票信息
import queryResults from '../view/queryResults.vue'//申报结果列表
import submitRes from '../view/submitRes.vue'//申报结果详情
import checkWage from '../view/checkWage.vue'//查看工资
import interpretation from '../view/interpretation.vue'//政策解读文章


Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: login,
      meta: {
        title: '登录',
        requireAuth: true
      }
    },
    {
      name: 'selectCompany',
      path: '/selectCompany',
      component: selectCompany,
      meta: {
        title: '选择企业'
      }
    },
    {
      name: 'submitInfo',
      path: '/submitInfo',
      component: submitInfo,
      meta: {
        title: '呈报信息'
      }
    },
    {
      name: 'basicInfo',
      path: '/basicInfo',
      component: basicInfo,
      meta: {
        title: '基本信息'
      }
    },
    {
      name: 'childList',
      path: '/childList',
      component: childList,
      meta: {
        title: '子女信息'
      }
    },
    {
      name: 'childInfo',
      path: '/childInfo',
      component: childInfo,
      meta: {
        title: '子女信息'
      }
    },
    {
      name: 'housingList',
      path: '/housingList',
      component: housingList,
      meta: {
        title: '租房住房信息'
      }
    },
    {
      name: 'tenement',
      path: '/tenement',
      component: tenement,
      meta: {
        title: '添加住房租金支出'
      }
    },
    {
      name: 'mortgage',
      path: '/mortgage',
      component: mortgage,
      meta: {
        title: '添加住房贷款利息支出'
      }
    },
    {
      name: 'supportList',
      path: '/supportList',
      component: supportList,
      meta: {
        title: '赡养老人支出'
      }
    },
    {
      name: 'dependent',
      path: '/dependent',
      component: dependent,
      meta: {
        title: '添加被赡养人信息'
      }
    },
    {
      name: 'commonPeople',
      path: '/commonPeople',
      component: commonPeople,
      meta: {
        title: '添加共同赡养人信息'
      }
    },
    {
      name: 'educationList',
      path: '/educationList',
      component: educationList,
      meta: {
        title: '继续教育信息'
      }
    },
    {
      name: 'degreeInfo',
      path: '/degreeInfo',
      component: degreeInfo,
      meta: {
        title: '学位教育信息'
      }
    },
    {
      name: 'professional',
      path: '/professional',
      component: professional,
      meta: {
        title: '职业教育信息'
      }
    },
    {
      name: 'aboutUs',
      path: '/aboutUs',
      component: aboutUs,
      meta: {
        title: '关于我们'
      }
    },
    {
      name: 'setPassword',
      path: '/setPassword',
      component: setPassword,
      meta: {
        title: '设置安全码'
      }
    },
    {
      name: 'searchCompany',
      path: '/searchCompany',
      component: searchCompany,
      meta: {
        title: '添加企业'
      }
    },
    {
      name: 'feedback',
      path: '/feedback',
      component: feedback,
      meta: {
        title: '意见与反馈'
      }
    },
    {
      name: 'mine',
      path: '/mine',
      component: mine,
      meta: {
        title: '个人中心'
      }
    },
    {
      name: 'invoiceInfo',
      path: '/invoiceInfo',
      component: invoiceInfo,
      meta: {
        title: '开票中心'
      }
    },
    {
      name: 'queryResults',
      path: '/queryResults',
      component: queryResults,
      meta: {
        title: '申报信息查询'
      }
    },
    {
      name: 'submitRes',
      path: '/submitRes',
      component: submitRes,
      meta: {
        title: '呈报信息'
      }
    },
    {
      name: 'checkWage',
      path: '/checkWage',
      component: checkWage,
      meta: {
        title: '查看工资'
      }
    },{
      name: 'interpretation',
      path: '/interpretation',
      component: interpretation,
      meta: {
        title: '政策解读'
      }
    },
    {
      name: 'homepage',
      path: '/homepage',
      component: homepage,
      meta: {
        title: '首页'
      }
    }
  ]
});
