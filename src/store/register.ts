import { observable } from 'mobx';

import Taro from '@tarojs/taro';

import * as authApi from '../services/auth.js';
import commonStore from '../store/common';
import { wxAuthorize } from '../utils/authorize';

const registerStore = observable({
  mobile: "",
  validate: "",
  name: "",
  btnText: '获取验证码',
  timer: "",
  delay: 5,
  canGet: true,
  mobileReg: /^[1]\d{10}$/,

  init() {

  },
  changeInput(key,e) {
    const value = e.detail.value;
    this[key] = value;
  },
  getValidate() {
    const {mobile, canGet, mobileReg} = this;
    if (!canGet) return;
    if (!mobileReg.test(mobile)) {
      Taro.showToast({
        title: "请输入正确手机号码",
        icon: "none",
        duration: 2000
      });
      return;
    }
    this.sendSmsCode();
    Taro.showToast({
      title: "验证码已发送至您的手机",
      icon: "none",
      duration: 2000
    });
  },
  sendSmsCode() {
    // await sendSmsCode({mobile: this.mobile});
    this.canGet = false;
    this.countDown();
  },
  countDown() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.delay === 0) {
        clearInterval(this.timer);
        this.btnText = '重新发送';
        this.canGet = true;
        this.delay = 60;
      } else {
        this.canGet = false;
        this.delay--;
        this.btnText = `${this.delay}s`
      }
    }, 1000)
  },
  async goIndex(e) {
    console.log('登录');
    console.log(' e.detail', e.detail)
    const {encryptedData, iv, userInfo} = e.detail;
    await commonStore.setData('userInfo',userInfo);
    if (encryptedData) {
      Taro.showLoading({mask: true, title: "注册中..."});
      // await wxAuthorize();
      const res = await this.register({
        // encrypted_data: encryptedData,
        // i_v: iv,
        // login_type: 2
        name: this.name,
        phone: this.mobile,
        openid: commonStore.code,
      });
      Taro.hideLoading();
      console.log('res',res)
      // const {data, code, message} = res.data;
      // if (code === 1 && data) {
      //   await Taro.setStorage({
      //     key: "userinfo",
      //     data: data.user_info
      //   });
      //   // await this.setData();
      //   // await loginComplete(true);
      //   if (this.redirect) {
      //     Taro.redirectTo({
      //       url: this.redirect
      //     });
      //   } else {
      //     Taro.navigateBack();
      //   }
      // } else {
      //   Taro.showToast({
      //     title: message,
      //     duration: 2000,
      //     icon: "none"
      //   })
      // }
    }
  },
  async register(params) {
    const result = await authApi.setUser(params);
    return result;
  }
})
export default registerStore