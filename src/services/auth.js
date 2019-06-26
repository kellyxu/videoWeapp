import Taro from "@tarojs/taro";
import { getHttpRequest } from "../utils";

const http = getHttpRequest({
  baseUrl: AUTH_API_PREFIX
});

http.useRequestInterceptor(config => {
  if (config.method === "POST" && config.data) {
    config.data = {
      business_appid: "1001",
      ...config.data
    };
  }
  return config;
});
/**
 * 获取用户信息
 * @param {Object} params
 */
export const getOpenId = params =>
  http.post("getOpenId", params, {
    disableWxAuthorized: true,
    disableUserAuthorized: true
  });

/**
 * 注册
 * @param {Object} params
 */
export const setUser = params =>
http.post("setUser", params, {
  disableUserAuthorized: true,
  pureResult: true
});

/**
 * 发送短信验证码
 * @param {Object} params
 */
export const sendSmsCode = params =>
  http.post("v1.0/UserAuth/SendSmsCode", params, {
    disableUserAuthorized: true
  });



export const userLogout = () => http.post("v1.0/UserAuth/UserLogout");


/**
 *  表单信息记录
 * @param { wx_form_id:'' } params
 */
export const wxFormLog = params => http.post("v1.0/WxMessage/WxFormLog", params);


