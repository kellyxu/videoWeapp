import { observable } from 'mobx';

import Taro from '@tarojs/taro';

import { setUser } from '../services/service';
import commonStore from '../store/common';

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
    const {userInfo} = e.detail;
    await commonStore.setData('wxUserInfo',userInfo);
    if (userInfo) {
      Taro.showLoading({mask: true, title: "注册中..."});
      const res = await setUser({
        name: this.name,
        phone: this.mobile,
        openid: commonStore.user.openid,
        logo: userInfo.avatarUrl,
      });
      Taro.hideLoading();
      if(res.status === "success") {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }
    } else {
      Taro.showToast({
        title: "用户信息获取失败！",
        duration: 2000,
        icon: "none"
      })
    }
  },
})
export default registerStore