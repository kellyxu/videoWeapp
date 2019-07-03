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
  http.get("index/config");
 
/**
 * 获取用户信息
 * @param {code} params
 */
export const getOpenId = params =>
  http.get("index/getOpenId", params);

/**
 * 注册
 * @param {name,openid,phone,logo} params
 */
export const setUser = params =>
  http.get("index/setUser", params);

/**
 * 视频地图列表
 * @param {name,openid,phone,logo} params
 */
export const getMapList = params =>  
  http.get("index/list", params);
 
/**
 * 视频详情
 * @param {id} params
 */
export const getVideoDetail = params =>  
  http.get("index/info", params);
 
 
/**
 * 评论列表
 * @param {page,id} params
 */
export const getVideoComments = params =>  
  http.get("index/comments", params);
 
/**
 * 添加评论
 * @param {uid,content,vid} params
 */
export const addComment = params =>  
  http.get("index/addComment", params);

/**
 * 回复列表
 * @param {page,id} params
 */
export const getReplyList = params =>  
  http.get("index/replys", params);
 
/**
 * 添加回复
 * @param {uid,content,cid} params
 */
export const addReply = params =>  
  http.get("index/addReply", params);
 
/**
 * 我的视频
 * @param {uid,status,page} params
 */
export const getMyVideoList = params =>  
  http.get("index/myVideoList", params);

/**
 * 增加/编辑视频
 * @param {id,title,url,descp,uid} params
 */
export const addVideo = params =>  
http.post("index/addVideo", params);

/**
 * 获取省市区
 * @param {} 
 */
export const getArea = () =>  
  http.get("index/area");

/**
 * 获取验证码
 * @param {} 
 */
export const sendSmsCode = params =>  
  http.get("index/addOne", params);

/**
 * 校验验证码
 * @param {} 
 */
export const checkCode = params =>  
  http.get("index/checkCode", params);

/**
 * 获取七牛云token
 * @param {} 
 */
export const getQiniuToken = () =>  
  http.get("image/qnUpload");

 

