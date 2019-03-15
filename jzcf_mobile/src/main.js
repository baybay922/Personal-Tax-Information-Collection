import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import 'lib-flexible'//引入flexible,实现移动端自适应
import { Service } from './server/api'
import './assets/css/my-mint.css'//修改mint样式，不与原版冲突

Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  /* 页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    //是否登录
    var params = {}
    Service.authorized(params).then((res)=>{
      if(res.code == -1){//进入登录页面
        next()
      }else if(res.code == 2){//进入搜索页面
        next({
          path: '/searchCompany'
        })
      }
      else if(res.code == 4){//进入填报页
        
        next({
          path: '/submitInfo',
          query: {
            collectionId: res.data.collectionId,
            companyId: res.data.companyId
          }
        })
      }else if(res.code == 5){//进入首页
        next({
          path: '/homepage',
          query: {
            companyId: res.data.companyId
          }
        })
      }
    })
  }
  next();
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})



