import { observable, runInAction, toJS } from 'mobx';

import Taro from '@tarojs/taro';

import { addVideo } from '../services/service';
import commonStore from './common';

const addVideoStore = observable({
  title: "",
  info: "",
  videoSrc: "",
  selectIndex: [0, 0, 0],
  provinces: [],
  citys: [],
  streets: [],
  location: {},
  get titleLen() {
    return `${this.title.length}/20`;
  },
  get infoLen() {
    return `${this.info.length}/300`;
  },
  get locationId() {
    var id = {};
    if(this.provinces && this.selectIndex && this.selectIndex.length > 0) {
      id = {
        province: this.provinces[0][this.selectIndex[0]].id,
        city: this.provinces[1][this.selectIndex[1]].id,
        street: this.provinces[1][this.selectIndex[1]].id,
      }
    }
    return id;
  },
  get locationName() {
    let name = "";
    if(this.provinces && this.selectIndex && this.selectIndex.length > 0) {
      name = `${this.provinces[0][this.selectIndex[0]].name}，${this.provinces[1][this.selectIndex[1]].name}，${this.provinces[2][this.selectIndex[2]].name}`;
    }
    return name;
  },
  changeInput(key, e) {
    const value = e.detail.value;
    console.log(this[key], value)
    this[key] = value;
  },
  async init() {
    const areaRange = commonStore.areaRange;
    if (areaRange && areaRange.length > 0) {
    this.provinces = [areaRange, areaRange[0].childAreas, areaRange[0].childAreas[0].childAreas];
    }
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
  },

  regionColumnChange(e) {
    const detail = e.detail;
    const { value, column } = detail;
    //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
    if (column == 0) {
      this.selectIndex = [value, 0, 0];
    } else if (column == 1) {
      //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
      this.selectIndex = [this.selectIndex[0], value, 0];
    } else if (column == 2) {
      //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
      this.selectIndex = [this.selectIndex[0], this.selectIndex[1], value];
    }
    const temp = commonStore.areaRange;
    this.provinces[0] = temp;
    if ((temp[this.selectIndex[0]].childAreas).length > 0) {
      //如果第二列“市”的个数大于0,通过this.selectIndex变更this.provinces[1]的值
      this.provinces[1] = temp[this.selectIndex[0]].childAreas;
      const areaArr = (temp[this.selectIndex[0]].childAreas[this.selectIndex[1]]).childAreas || [];
      //如果第三列“区”的个数大于0,通过selectIndex变更this.provinces[2]的值；否则赋值为空数组
      this.provinces[2] = areaArr.length > 0 ? areaArr : [];
    } else {
      //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
      this.provinces[1] = [];
      this.provinces[2] = [];
    }
  },
  
  async addVideo() {
    const params = {
      ...this.locationId,
      map_lng: this.location.longitude,
      map_lat: this.location.latitude,
      id: "",
      title: this.title,
      descp: this.info,
      url: this.videoSrc,
      uid: commonStore.user.uid,
    };
    
    let arr:any = Reflect.ownKeys(params).map((key:any)=>{
      let name =  `data[${key}]`;
      return {
        [name]: params[key],
      }
    })
    var obj={ };

  arr.map( ( item)=> {
    obj = Object.assign(obj, item)
  });
      console.log(params,arr,obj)
    if(!params.title || !params.descp || !params.url || !params.map_lng && !params.province) {
      Taro.showToast({
        title: "请先完善信息！",
        duration: 2000,
        icon: "none"
      });
    } else {
      
      const res = await addVideo(params);
      console.log('save', res)
    }
    
    
  }

})
export default addVideoStore