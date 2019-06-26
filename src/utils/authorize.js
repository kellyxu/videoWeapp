import Taro, { getCurrentPages } from "@tarojs/taro";
import * as authApi from "../services/auth.js";
import commonStore from "../store/common.js";

let _loginCallbacks = [];
let _authCallbacks = [];
let _loginListeners = [];
let _authListeners = [];

/**
 * 检测授权
 */
export async function wxAuthorize() {
  let token;
  try {
    token = await Taro.getStorage({
      key: "token"
    });
  } catch (e) {}
  //如果本地TOKEN不存在触发微信登录
  if (!token) {
    await wxLogin();
  } else {
    let wxSessionTimeout = true;
    try {
      await Taro.checkSession();
      wxSessionTimeout = false;
    } catch (e) {}
    //如果微信SESSION过期触发微信登录
    if (wxSessionTimeout) {
      await wxLogin();
    }
  }
}

export function addLoginListener(listener) {
  if (typeof listener === "function") {
    _loginListeners.push(listener);
  }
}

export function addAuthListener(listener) {
  if (typeof listener === "function") {
    _authListeners.push(listener);
  }
}

/**
 * 获取用户信息
 */
export async function wxLogin() {
  const { code } = await Taro.login();
  const result = await authApi.getOpenId({
    code
  });
  await commonStore.setData('code',code);
  console.log('result',result)
  if(result.length === 0) {
    setTimeout(() => {
      Taro.navigateTo({
        url: '/pages/register/register',
      });
    }, 500);
  }
  // const { token, user_info } = result;
  // if (token) {
  //   await Taro.setStorage({
  //     key: "token",
  //     data: token
  //   });
  // }
  // if (user_info) {
  //   await Taro.setStorage({
  //     key: "userinfo",
  //     data: user_info
  //   });
  // } else {
  //   await Taro.removeStorage({
  //     key: "userinfo"
  //   });
  // }
  return result;
}

/**
 * 判断用户是否登录
 */
export async function userAuthorize() {
  let userinfo;
  try {
    userinfo = await Taro.getStorage({
      key: "userinfo"
    });
  } catch (e) {
  } finally {
    return userinfo;
  }
}

/**
 * 用户登录
 * @param {String} redirectTo
 */
export function userLogin(currentPage) {
  //跳转到登录页
  return new Promise(async (resolve, reject) => {
    //跳转登录页
    function loginCallback(success) {
      if (success) {
        resolve();
      } else {
        reject();
      }
    }
    _loginCallbacks.push(loginCallback);
    if (currentPage) {
      const redirectTo =
        typeof currentPage === "string" ? currentPage : "/" + currentPage.route;
      await Taro.navigateTo({
        url: `/pages/login/login?redirect=${redirectTo}`
      });
    } else {
      await Taro.navigateTo({
        url: `/pages/login/login`
      });
    }
  });
}

/**
 * 登录完成
 */
export async function loginComplete(success) {
  for (let callback of _loginCallbacks) {
    await callback(success);
  }
  for (let listener of _loginListeners) {
    await listener(success);
  }
  _loginCallbacks.splice(0, _loginCallbacks.length);
}

/**
 * 认证成功
 */
export async function authComplete(success) {
  console.log(_authCallbacks)
  for (let callback of _authCallbacks) {
    await callback(success);
  }
  for (let listener of _authListeners) {
    await listener(success);
  }
  _authCallbacks.splice(0, _authCallbacks.length);
}

/**
 * 用户退出登录
 */
export async function userLogout() {
  try {
    await authApi.userLogout();
    await Taro.removeStorage({
      key: "userinfo"
    });
    await Taro.removeStorage({
      key: "token"
    });
  } catch (e) {}
  for (let listener of _loginListeners) {
    await listener();
  }
  return true;
}
/**
 * 实名认证
 */
export async function userAuthentication() {
  const { is_certify } = (await userAuthorize()) || {};
  if (!is_certify) {
    const res = await Taro.showModal({
      title: "请先绑定实名信息",
      content: "1.确保本人；2.和门店录入信息一致",
      cancelText: "下次再说",
      confirmText: "绑定",
      cancelColor: "#008EFF",
      confirmColor: "#008EFF"
    });
    if (!res.confirm) {   
      throw new Error("用户取消实名认证");
    }
    await new Promise((resolve, reject) => {
      _authCallbacks.push(success => {
        if (success) {
          resolve(true);
        } else {
          reject();
        }
      });
      Taro.navigateTo({
        url: `/pages/authentication/verifyIDCard`
      });
    });
  }
}

// /**
//  * 封装页面需要登录后才可以访问
//  * @param {Object} Component
//  */
// export function authorize({ isTabPage }) {
//   return function(Component) {
//     return class Authorize extends Component {
//       isAuthorizePage = true;
//       constructor(props) {
//         super(props);
//       }
//       componentDidShow = async () => {
//         const userinfo = await userAuthorize();
//         //用户未登录
//         const pages = await Taro.getCurrentPages();
//         const currentPage = pages[pages.length - 1];
//         if (currentPage.$component.isAuthorizePage) {
//           if (!userinfo) {
//             try {
//               await userLogin({ isTabPage, currentPage });
//               //登录成功，触发当前页面重新加载数据
//               if (typeof super.componentDidMount === "function") {
//                 await super.componentDidMount();
//               }
//               if (typeof super.componentDidShow === "function") {
//                 super.componentDidShow();
//               }
//             } catch (e) {
//               const pages = await Taro.getCurrentPages();
//               if (pages.length <= 1) {
//                 await Taro.switchTab({ url: "/pages/index/index" });
//               } else {
//                 await Taro.navigateBack();
//               }
//             }
//           }
//         }
//       };
//     };
//   };
// }
