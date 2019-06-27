/**
 * 首页/我的
 */

import {getHttpRequest} from '../utils';

const http = getHttpRequest({
  baseUrl: WEAPP_API_PREFIX
});

http.useRequestInterceptor(config => {
  if (config.method === 'POST') {
    config.data = {
      // business_appid: '1001',
      time_stamp: new Date().valueOf(),
      ...config.data
    };
  }

  return config;
});
/**
 * 获取用户信息
 * @param {code} params
 */
export const getOpenId = params =>
  http.get("getOpenId", params);

/**
 * 注册
 * @param {name,openid,phone,logo} params
 */
export const setUser = params =>
  http.get("setUser", params);

/**
 * 视频地图列表
 * @param {name,openid,phone,logo} params
 */
export const getMapList = params =>  
  http.get("list", params);
 



