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
 * 配置
 * @param {} 
 */
export const getConfig = () =>  
  http.get("config");
 
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
 
/**
 * 视频详情
 * @param {id} params
 */
export const getVideoDetail = params =>  
  http.get("info", params);
 
 
/**
 * 视频评论列表
 * @param {page,id} params
 */
export const getVideoComments = params =>  
  http.get("comments", params);
 
/**
 * 添加评论
 * @param {uid,content,vid} params
 */
export const addComment = params =>  
  http.get("addComment", params);
 
/**
 * 我的视频
 * @param {uid,status,page} params
 */
export const getMyVideoList = params =>  
  http.get("myVideoList", params);

/**
 * 增加/编辑视频
 * @param {id,title,url,descp,uid} params
 */
export const addVideo = params =>  
http.get("addVideo", params);

/**
 * 获取省市区
 * @param {} 
 */
export const getArea = () =>  
  http.get("area");

 

