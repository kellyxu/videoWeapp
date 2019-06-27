import Taro from "@tarojs/taro";
import Http from "./http";
import {
  wxAuthorize,
  userLogin,
  userAuthentication
} from "./authorize";
let loginFailure = 0;
export function getHttpRequest(config) {
  const interceptors = {
    request: [
      //微信授权拦截
      async config => {
        return config;
      }
    ],
    response: [
      async function (res) {
        const {
          code,
          data,
          message
        } = res.data;
        
        if (res.config.pureResult) {
          return res;
        } else {
          return data;
        }
      }
    ]
  };
  return new Http(config, interceptors);
}
