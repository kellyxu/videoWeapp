import { observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getMapList, getQiniuToken } from '../services/service';
import qiniuUploader from '../utils/qiniuUploader';
import commonStore from './common';

// 初始化七牛相关参数
function initQiniu(token) {
  var options = {
    uptoken: token,
    region: 'ECN', // 华北区
    uptokenURL: "",
    domain: '',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

const indexStore = observable({
  latitude: 0,
  longitude: 0,
  aid: "",
  scale: 14,
  isCallout: false, // 点击气泡
  list: [],
  goVideoParams:{},
  qiniuToken: "",
  addVideoDetail:{},
  get markers() {
    const markers = this.list.map((value, index) => {
      return {
        id: index,
        latitude: value.map_lat,
        longitude: value.map_lng,
        width: 30,
        height: 30,
        iconPath: require("../assets/images/center_icon.png"),
        // callout: {
        //   content: `${value.name}(${value.num})`,
        //   fontSize: 18,
        //   color: "#ffffff",
        //   bgColor: "#4384FE",
        //   borderRadius: 200,
        //   padding: 20,
        //   textAlign: "center",
        //   display: "ALWAYS"
        // }
      }
    });
    return markers || [];
  },
  get type() {
    let type = "province";
    if(this.scale <=7) {
      type = "province"
    } else if(this.scale <=10) {
      type = "city";
    } else if(this.scale <=12) {
      type = "street";
    } else {
      type = "video";
    }
    return type;
  },
  async init() {
    await this.getLocation();
    this.iconLeft = commonStore.windowWidth / 2 - 10 + 'px';
    this.iconTop = commonStore.windowHeight / 2 - 40 + 'px';

    // this.controls = [{
    //   id: "1",
    //   iconPath: require("../assets/images/point.png"),
    //   position: {
    //     left: `${this.iconLeft - 10}`,
    //     top: `${this.iconTop - 10}`,
    //     width: 20,
    //     height: 30
    //   },
    // }];
    await this.getQiniuToken();
  },
  async getLocation() {
    try {
      const location = await Taro.getLocation({
        type: 'wgs84',
      });
      this.setlocation(location.latitude, location.longitude);
    } catch (res) {
      this.setlocation("31.772752","119.946973");
      console.log('定位',res)
      Taro.showToast({
        title: "定位失败！",
        duration: 2000,
        icon: "none"
      });
    }
  },
  async getMapList(northeast, southwest) {
    let params = {
      maxlat: northeast.latitude,
      minlat: southwest.latitude,
      maxlng: northeast.longitude,
      minlng: southwest.longitude,
      // type: this.type,
      type: "video",
      aid: "",
      // aid: this.aid && this.isCallout ? this.aid : "",
    };
    runInAction(async() => {
      const { data = [] } = await getMapList(params);
      this.list = data;
      this.isCallout = false;
      if(params.type === "video") {
        this.goVideoParams = params;
      }
    })
  },
  setlocation(latitude, longitude) {
    console.log(latitude, longitude)
    this.latitude = latitude;
    this.longitude = longitude;
  },
  setScale(scale) {
    this.scale = scale;
  },
  // 点击气泡
  handleClickCallout(index) {
    this.isCallout = true;
    const data = this.list[index];
    this.aid = data.id;
    if (this.isCallout && this.type === "province") {
      this.scale = 10;
    } else if (this.isCallout && this.type === "city") {
      this.scale = 12;
    } else if(this.isCallout && this.type === "street") {
      this.scale = 14;
    } else if(this.isCallout && this.type === "video") {
      console.log('进入详情',this.aid)
      Taro.navigateTo({
        url: `/pages/video/videoDetail?id=${this.aid}`
      });
    }
  }, 
  // 获取七牛云token
  async getQiniuToken() {
    const token = await getQiniuToken();
    this.qiniuToken = token.data;
    initQiniu(this.qiniuToken);
  },
  // 发布视频
  async addVideo() {
    try {
      const chooseRes = await Taro.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 15,
      })
      Taro.showLoading({
        title: '视频上传中',
      })
      qiniuUploader.upload(chooseRes.tempFilePath, (res) => {
        this.addVideoDetail = {
          videoSrc: chooseRes.tempFilePath,
          videoKey: res.key,
          latitude: this.latitude,
          longitude: this.longitude,
        }
        console.log('选择视频',this.addVideoDetail);
        Taro.navigateTo({
          url: `/pages/video/addVideo?latitude=${this.latitude}&longitude=&${this.longitude}`
        });
        Taro.hideLoading();
      }, (error) => {
        Taro.hideLoading();
        Taro.showToast({
          title: '视频上传失败！',
          duration: 2000,
          icon: 'none'
        });
        console.error('error: ' + JSON.stringify(error));
      })
    } catch (error) {
      console.log('error',error)
    } finally {
      console.log('finally')
    }
    
  }

})
export default indexStore