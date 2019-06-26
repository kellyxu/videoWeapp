import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

const addVideoStore = observable({
  title: "",
  info: "",
  videoSrc: "",
  positionName: "上海市，青浦区",
  get titleLen() {
    return `${this.title.length}/20`;
  },
  get infoLen() {
    return `${this.info.length}/300`;
  },
  changeInput(key,e) {
    const value = e.detail.value;
    console.log(this[key],value)
    this[key] = value;
  },
  async init() {
    await this.getLocation();
  },
  async changeVideo() {
    try {
      const res = await Taro.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
      })
      this.videoSrc = res.tempFilePath;
      console.log('res',res)
    } catch(res) {
      Taro.showToast({
        title: '视频上传失败！',
        duration: 2000,
        icon: 'none'
      });
    } finally {
      console.log('finally')
    }
    
  },
  async getLocation() {
    try {
      const location = await Taro.getLocation({
        type: 'wgs84',
      });
      this.latitude = location.latitude;
      this.longitude = location.longitude;
      console.log(location)
      // const res = await Taro.openLocation({
      //   latitude: location.latitude,
      //   longitude: location.longitude,
      //   scale: 18
      // })
      // console.log(res)
    } catch(res) {
      Taro.showToast({
        title: "定位失败！",
        duration: 2000,
        icon: "none"
      });
    }
     
  },
  
})
export default addVideoStore