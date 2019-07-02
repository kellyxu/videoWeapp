import { observable, runInAction, toJS } from 'mobx';

import Taro from '@tarojs/taro';

import { addVideo } from '../services/service';
import commonStore from './common';

const addVideoStore = observable({
  title: "",
  info: "",
  videoSrc: "",
  // selectIndex: [0, 0, 0],
  // provinces: [],
  citys: [],
  streets: [],
  isLocation: false, // 自动定位
  location: {},
  get titleLen() {
    return `${this.title.length}/20`;
  },
  get infoLen() {
    return `${this.info.length}/300`;
  },
  // get locationId() {
  //   if (this.isLocation) {
  //     return {
  //       map_lng: this.location.longitude,
  //       map_lat: this.location.latitude,
  //     }
  //   }
  //   return {
  //     province: this.provinces[0][this.selectIndex[0].id],
  //     city: this.provinces[1][this.selectIndex[1].id],
  //     street: this.provinces[2][this.selectIndex[2].id],
  //   }
  // },
  // get locationName() {
  //   var name = "";
  //   if (this.isLocation) {
  //     name = this.location.name;
  //   } else {
  //     name = `${this.provinces[0][this.selectIndex[0]].name}，${this.provinces[1][this.selectIndex[1]].name}，${this.provinces[2][this.selectIndex[2]].name}`;
  //   }
  //   return name;
  // },
  changeInput(key, e) {
    const value = e.detail.value;
    console.log(this[key], value)
    this[key] = value;
  },
  async init() {
    
  },
  async changeVideo() {
    try {
      const res = await Taro.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
      })
      this.videoSrc = res.tempFilePath;
      console.log('res', res)
    } catch (res) {
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
      await Taro.getLocation({
        type: 'gcj02',
      });
      this.isLocation = true;
      const res = await Taro.chooseLocation();
      this.location = res;
    } catch (res) {
      Taro.showToast({
        title: "定位失败！",
        duration: 2000,
        icon: "none"
      });
    }

  },
  regionChange(e) {
    this.selectIndex = e.detail.value;
    this.isLocation = false;
  },
  
  async addVideo() {
    const params = {
      ...this.locationId,
      id: "",
      title: this.title,
      descp: this.info,
      url: this.videoSrc,
      uid: commonStore.user.uid,
    };
    console.log(params)
    // const res = await addVideo({
    //   ...this.locationId,
    //   id: "",
    //   title: this.title,
    //   descp: this.info,
    //   url: this.videoSrc,
    //   uid: commonStore.user.uid,
    // });
    // console.log('save', res)
  }

})
export default addVideoStore