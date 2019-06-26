import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getOpenId } from '../services/service';

const commonStore = observable({
  code: "",
  userInfo: {},
  async init() {
    
     
  },
  async setData(key,value) {
    this[key] = value;
  },
  async getUserInfo() {
    const res = await getOpenId({
      code: "111"
    });
    console.log('res',res)
  }

})
export default commonStore