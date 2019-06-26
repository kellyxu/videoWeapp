import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

const indexStore = observable({
  latitude: 31.11325,
  longitude: 121.38206,
  markers: [
    {
      id: 0,
      latitude: 31.11325,
      longitude: 121.38206,
      width: 300,
      height: 300,
      label: {
        content: "上海",
        fontSize: 24,
        color: "#ffffff",
        bgColor: "#4384FE",
        borderRadius: 200,
        padding: 50,
        textAlign: "center",
      },
    },
  ],

  async init() {
    try {
      const res = await Taro.getLocation({
        type: 'wgs84',
      });
      this.latitude = res.latitude;
      this.longitude = res.longitude;
    } catch(res) {
      Taro.showToast({
        title: "定位失败！",
        duration: 2000,
        icon: "none"
      });
    }
     
  }
})
export default indexStore