import { observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getArea, getConfig, getOpenId } from '../services/service';

const commonStore = observable({
  logo: "",
  name: "名字",
  text: "",
  wxUserInfo: {},
  user: {
    openid: "",
    uid: "",
    name: "",
    logo: "",
  },
  windowWidth: 0,
  windowHeight: 0,
  areaRange: [],
  async init() {
    this.getSystemInfo();
    await this.getUserInfo();
    await this.getConfig();
    await this.getArea();
  },
  getSystemInfo() {
    Taro.getSystemInfo({
      success: (res) => {
        this.windowWidth = res.windowWidth;
        this.windowHeight = res.windowHeight;
      }
    })
  },
  async getConfig() {
    const { data } = await getConfig();
    runInAction(() => {
      this.logo = data.logo;
      this.text = data.txt;
    })
  },
  async setData(key, value) {
    this[key] = value;
  },
  async getUserInfo() {
    const { code } = await Taro.login();
    const { data } = await getOpenId({
      code
    });
    if (data) {
      await commonStore.setData('user', data);
      if (!data.uid) {
        Taro.navigateTo({
          url: '/pages/register/register',
        });
      }
    }
  },
  async getArea() {
    const { data } = await getArea();
    this.areaRange = data;
  }

})
export default commonStore