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
      business_appid: '1001',
      time_stamp: new Date().valueOf(),
      ...config.data
    };
  }

  return config;
});

/**
 * 获取用户信息
 * @param {code:''}
 */
export const getOpenId = params =>
  http.post('/getOpenId?code', params);

/**
 * 获取首页展示信息
 * @param {contract_person_code:''}
 */
export const getMyIndexShow = params =>
  http.post('v2.0/Contract/GetMyIndexShow', params);

/**
 * 查询我的管家
 * @param {} params
 */

export const GetMyManage = params =>
  http.post('v2.0/Contract/GetMyManage', params);


/**
 * 获取 首页配置
 * @param {Object} params
 */
export const getHomeConfig = params =>
  http.post("v2.0/Home/GetData", params, {
    disableWxAuthorized: true,
    disableUserAuthorized: true
  });

