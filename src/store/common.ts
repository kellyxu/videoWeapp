import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getOpenId } from '../services/service';

const commonStore = observable({
  wxUserInfo: {},
  user: {
    openid: ""
  },
  async init() {
    
     
  },
  async setData(key,value) {
    this[key] = value;
  },
  async getUserInfo() {
    const { code } = await Taro.login();
    const {data} = await getOpenId({
      code
    });
    if(data) {
      await commonStore.setData('user',data);
      if(!data.uid) {
        Taro.navigateTo({
          url: '/pages/register/register',
        });
      } 
    }
  }

})
export default commonStore