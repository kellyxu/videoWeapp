import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

const menuOption = [
  { 
    pagePath: "pages/index/index",
    text: "视频",
    name: "home",
    iconPath: "../../assets/images/home.png",
    selectedIconPath: "../../assets/images/home_active.png"
  },
  {
    pagePath: "pages/index/mine",
    text: "我的",
    name: "mine",
    iconPath: "../../assets/images/mine.png",
    selectedIconPath: "../../assets/images/mine_active.png"
  }     
];

const tabBarStore = observable({
  menuOption: menuOption,
  selected: "mine",
 
})
export default tabBarStore