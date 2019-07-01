import { observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { getMapList } from '../services/service';
import commonStore from './common';

const indexStore = observable({
  latitude: 0,
  longitude: 0,
  type: "province",
  aid: "",
  scale: 8,
  isCallout: false, // 点击气泡
  list: [],
  get markers() {
    const markers = this.list.map((value, index) => {
      return {
        id: index,
        latitude: value.map_lat,
        longitude: value.map_lng,
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
  async init() {
    await this.getLocation();
    this.iconLeft = commonStore.windowWidth / 2;
    this.iconTop = commonStore.windowHeight / 2;
    this.controls = [{
      id: "1",
      iconPath: require("../assets/images/edit.png"),
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
      this.setlocation(location.latitude, location.longitude)
    } catch (res) {
      Taro.showToast({
        title: "定位失败！",
        duration: 2000,
        icon: "none"
      });
    }
  },
  async getMapList(northeast, southwest) {
    const { data = [] } = await getMapList({
      maxlat: northeast.latitude,
      minlat: southwest.latitude,
      maxlng: northeast.longitude,
      minlng: southwest.longitude,
      type: this.type,
      aid: this.aid ? this.aid : "",
    });

    runInAction(() => {
      if (data.length > 0) {
        this.list = data;
      } else {
        this.list = [];
      }
      if (this.isCallout && this.type === "province") {
        this.type = "city";
        this.scale = 10;
        this.isCallout = false;
      } else if (this.isCallout && this.type === "city") {
        this.type = "street";
        this.scale = 12;
        this.isCallout = false;
      } else if(this.isCallout && this.type === "street") {
        this.type = "video";
        this.scale = 14;
        this.isCallout = false;
      } else if(this.isCallout && this.type === "video") {
        console.log('进入详情',this.aid)
        Taro.redirectTo({
          url: `/pages/video/videoDetail?id=${this.aid}`
        });
      }
    })
  },
  setlocation(latitude, longitude) {
    console.log(latitude, longitude)
    this.latitude = latitude;
    this.longitude = longitude;
  },
  // 点击气泡
  handleClickCallout(index) {
    this.isCallout = true;
    const data = this.list[index];
    this.aid = data.id;
    this.setlocation(data.map_lat, data.map_lng)
  }

})
export default indexStore