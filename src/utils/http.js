import Taro from "@tarojs/taro";

let connections = 0,
  loadingTimer,
  isLoading = false;

async function executeInterceptors(interceptors, params) {
  if (interceptors.length > 0) {
    const interceptorFunc = interceptors.shift();
    let newParams = await interceptorFunc.call(this, params);
    return executeInterceptors.call(this, interceptors, newParams);
  } else {
    return params;
  }
}
/**
 * 稀释loading展示次数
 * @param {*} delay
 */
function showLoading(delay = 200) {
  if (!isLoading) {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
    }
    loadingTimer = setTimeout(() => {
      isLoading = true;
      loadingTimer = null;
      Taro.showLoading({
        title: "加载中...",
        mask: true
      });
    }, delay);
  }
}
/**
 * 关闭loading
 */
function hideLoading() {
  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }
  if (isLoading) {
    isLoading = false;
    Taro.hideLoading();
  }
}

export default class Http {
  constructor(config, interceptors) {
    this._config = config || {};
    this.interceptors = interceptors;
  }
  async request(config) {
    const { baseUrl, ...baseConfig } = this._config;
    let { url } = config;
    if (!/^http(s)\:\/\/.*/.test(url) && baseUrl) {
      url = baseUrl + url;
    }
    let newConfig = {
      ...baseConfig,
      ...config,
      url,
      header: {
        "Content-Type": "application/json",
        ...baseConfig.header,
        ...config.header
      }
    };
    console.log("request => ", newConfig);
    let res;
    try {
      res = await Taro.request({ ...newConfig });
    } catch (e) {
      throw e;
    } finally {
    }
    console.log("response => ", res);
    res.config = newConfig;
    if(res.statusCode !== 200) {
      Taro.showToast({
        title: "操作失败！",
        duration: 2000,
        icon: "none"
      })
      throw new Error("操作失败");
    } else {
      if(res.data.status !== "success") {
        Taro.showToast({
          title: res.data.msg,
          duration: 2000,
          icon: "none"
        })
        throw new Error("接口失败");
      }
    }
    return res.data;
  }
  post(url, data, config = {}) {
    return this.request({
      method: "POST",
      url,
      data,
      ...config
    });
  }
  get(url, config = {}) {
    var i, path='';
    for(i in config) path+='&'+i+'='+config[i];
    return this.request({
      method: "GET",
      url:url + path.replace(/./, '?'),
      // url,
      ...config
    });
  }
  useRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }
  useResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }
}
