import { observable, runInAction } from 'mobx';
import { error } from 'util';

import Taro, { Component } from '@tarojs/taro';

import { getArea, getConfig, getOpenId, nowShow } from '../services/service';
import { IArea } from './interface';

const commonStore = observable({
  logo: "",
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
  area: [],
  isShow: false,
  get areaRange ():Array<IArea> {
    return this.area;
  },
  async init() {
    this.getSystemInfo();
    await this.getUserInfo();
    await this.getConfig();
    await this.getArea();
    await this.nowShow();
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
      if (!data.uid && this.isShow) {
        Taro.navigateTo({
          url: '/pages/register/register',
        });
      }
    }
  },
  async checkUser() {
    await this.getUserInfo();
    if (this.user.uid) {
      return;
    }
    if(this.isShow) {
      await Taro.navigateTo({
        url: '/pages/register/register',
      });
    }
    throw new Error("无法操作");
  },
  async getArea() {
    const { data } = await getArea();
    this.area = data;
  },
  async nowShow() {
    const { data } = await nowShow();
    console.log('nowShow',data)
    if( data === 1 ) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

})
export default commonStore