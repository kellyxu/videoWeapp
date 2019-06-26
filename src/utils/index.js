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
          if (!config.disableWxAuthorized) {
            if (!token) {
              await wxAuthorize();
            }
            let token;
            try {
              token = await Taro.getStorage({
                key: "token"
              });
              config.header = {
                ...config.header,
                token: token.data
              };
              return config;
            } catch (e) {}
          } else {
            return config;
          }
        },
        //用户授权拦截
        async config => {
          if (!config.disableUserAuthorized) {
            return config;
          } else {
            return config;
          }
        }
    ],
    response: [
      async function (res) {
        const {
          code,
          data,
          message
        } = res.data;
        if (code === -104) {
          //触发微信授权
          try {
            await Taro.removeStorage({
              key: "token"
            });
          } catch (e) {}
          if (loginFailure > 10) {
            Taro.showToast({
              title: "微信登录失败次数过多",
              icon: "error"
            });
          } else {
            loginFailure++;
            await wxAuthorize();
            loginFailure = 0;
            //重新发起请求
            return await this.request(res.config);
          }
        }
        if (code === -105) {
          //触发用户登录
          // try {
            // await Taro.removeStorage({ key: "userinfo" });
            await userLogin();
            return await this.request(res.config);
          // } catch (e) {}
        }
        if (code === -106) {
          //触发实名认证
          // try {
            await userAuthentication();
            return await this.request(res.config);
          // } catch (e) {
        }
        if (code !== 1 && !res.config.pureResult) {
          Taro.showToast({
            title: message,
            duration: 2000,
            icon: "none"
          });
        }
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
