import axios from "axios";
import { Toast, Indicator  } from "mint-ui";
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = "http://192.168.1.181:8080/batc/"; //填写域名

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    Indicator.close()
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          Toast("错误请求");
          break;
        case 401:
          Toast("未授权，请重新登录");
          break;
        case 403:
          Toast("拒绝访问");
          break;
        case 404:
          Toast("请求错误,未找到该资源");
          break;
        case 405:
          Toast("请求方法未允许");
          break;
        case 408:
          Toast("请求超时");
          break;
        case 500:
          Toast("服务器端出错");
          break;
        case 501:
          Toast("网络未实现");
          break;
        case 502:
          Toast("网络错误");
          break;
        case 503:
          Toast("服务不可用");
          break;
        case 504:
          Toast("网络超时");
          break;
        case 505:
          Toast("http版本不支持该请求");
          break;
        default:
          Toast(`连接错误${err.response.status}`);
      }
    } else {
      Toast("连接到服务器失败,请尝试刷新");
    }
    return Promise.resolve(err.response);
  }
);

export default {
  /**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  get(url, params) {
    this.indicator();
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params
        })
        .then(response => {
          resolve(response.data);
          Indicator.close()
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  post(url, data) {
    this.indicator()
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        response => {
          resolve(response.data);
          Indicator.close()
        },
        err => {
          reject(err);
        }
      );
    });
  },
  /**
   * 封装patch请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  patch(url, data) {
    this.indicator()
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(
        response => {
          resolve(response.data);
          Indicator.close()
        },
        err => {
          reject(err);
        }
      );
    });
  },
  /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  put(url, data) {
    this.indicator();
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(
        response => {
          resolve(response.data);
          Indicator.close()
        },
        err => {
          reject(err);
        }
      );
    });
  },
  indicator(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  }
  
};

