import { observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getMapList } from '../services/service';
import commonStore from './common';

const indexStore = observable({
  latitude: 0,
  longitude: 0,
  aid: "",
  scale: 8,
  isCallout: false, // 点击气泡
  list: [],
  goVideoParams:{},
  get markers() {
    const markers = this.list.map((value, index) => {
      return {
        id: index,
        latitude: value.map_lat,
        longitude: value.map_lng,
        width: 1,
        height: 1,
        iconPath: require("../assets/images/center_icon.png"),
        callout: {
          content: `${value.name}(${value.num})`,
          fontSize: 18,
          color: "#ffffff",
          bgColor: "#4384FE",
          borderRadius: 200,
          padding: 20,
          textAlign: "center",
          display: "ALWAYS"
        }
      }
    });
    return markers || [];
  },
  get type() {
    let type = "province";
    if(this.scale <=8) {
      type = "province"
    } else if(this.scale <=10) {
      type = "city";
    } else if(this.scale <=12) {
      type = "street";
    } else if(this.scale <=14) {
      type = "video";
    }
    return type;
  },
  async init() {
    await this.getLocation();
    this.iconLeft = commonStore.windowWidth / 2;
    this.iconTop = commonStore.windowHeight / 2;
    this.controls = [{
      id: "1",
      iconPath: require("../assets/images/center_icon.png"),
      position: {
        left: `${this.iconLeft - 10}`,
        top: `${this.iconTop - 10}`,
        width: 20,
        height: 20
      },
    }];
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
      type: this.type,
      aid: this.aid && this.isCallout ? this.aid : "",
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
    this.setlocation(data.map_lat, data.map_lng);
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
  }

})
export default indexStore