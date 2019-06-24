import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

const tab = [
  {
    name: "审核成功",
    code: "success",
    active: true,
  },
  {
    name: "审核中",
    code: "checkIng",
    active: false,
  },
  {
    name: "审核失败",
    code: "faild",
    active: false,
  },
]

const mineStore = observable({
  tab: tab,
  tabActive: "success",
  init() {
    this.setActiveTab();
  },
  changeTab(check) {
    this.tabActive = check.code;
    this.setActiveTab();
  },
  setActiveTab() {
    this.tab.map((item)=>{
      if(item.code === this.tabActive) {
        item.active = true;
      } else {
        item.active = false;
      }
      
    })
  }
  
})
export default mineStore