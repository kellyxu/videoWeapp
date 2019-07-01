import { observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getMyVideoList } from '../services/service';
import commonStore from './common';

const tab = [
  {
    name: "审核成功",
    code: "success",
    active: true,
    value: 1,
  },
  {
    name: "审核中",
    code: "checkIng",
    active: false,
    value: 0,
  },
  {
    name: "审核失败",
    code: "faild",
    active: false,
    value: 2,
  },
]

const mineStore = observable({
  tab: tab,
  tabActive: 1,
  page: 1,
  page_count: 10,
  list:[],
  async init() {
    
    setTimeout(async() => {
      await this.changeTab(1);
    }, 1000);
    
  },
  async changeTab(value) {
    if(this.tabActive === value) {
      return;
    } else {
      this.tabActive = value;
      this.setActiveTab();
      await this.getMyVideoList();
    }
    
   
  },
  setActiveTab() {
    this.tab.map((item)=>{
      if(item.value === this.tabActive) {
        item.active = true;
      } else {
        item.active = false;
      }
    })
  },
  async getMyVideoList() {
    const {data} = await getMyVideoList({
      uid: commonStore.user.uid,
      status: this.tabActive,
      page: this.page,
      page_count: this.page_count
    });
    runInAction(()=>{
      this.list = data.list;
    })
  }
})
export default mineStore