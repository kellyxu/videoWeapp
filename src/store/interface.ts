import { marker } from '@tarojs/components/types/Map';

export interface IAreaItem {
  childAreas?: Array<any>;
  id: string;
  parent: string;
  name: string;
  plot_num: string;
}
export interface IArea {
  childAreas: Array<IAreaItem>;
  id: string;
  parent: string;
  name: string;
  plot_num: string;
}
export interface  ICommontStore {
  logo: string;
  name: string;
  text: string;
  wxUserInfo: any;
  user: any;
  isShow: boolean;
  areaRange: IArea;
  init: Function;
  getSystemInfo: Function;
  setData: Function;
  getUserInfo: Function;
  nowShow: Function;
}
export interface  IVideoDetailStore {
  videoDetail: any;
  comment: string;
  num: number;
  commentList: Array<any>;
  commentDetail: any;
  init: Function;
  changeInput: Function;
  addVideoComment: Function;
  goComentDetail: Function;
  scrollToLower: Function;
}
export interface IMineStore {
  tabActive: number;
  tab: Array<any>;
  list: Array<any>;
  init: Function;
  getConfig: Function;
  changeTab: Function;
  goVideoDetail: Function;
  deleteVideo: Function;
  scrollToLower: Function;
  scrollToUpper: Function;
}

export interface IAddVideoStore {
  title: string;
  titleLen: string;
  info: string;
  infoLen: string;
  videoId: string;
  videoSrc: string;
  selectIndex: any;
  multiArray: Array<any>;
  multiIndex: any;
  locationId: any;
  locationName: string;
  location: any;
  detailPosition: string;
  provinces: Array<any>;
  init: Function;
  getLocation: Function;
  changeInput: Function;
  changeVideo: Function;
  regionChange: Function;
  regionColumnChange: Function;
  addVideo: Function;
  clear: Function;
}

export interface IReplyStore {
  reply: string;
  num: string,
  replyDetail:any,
  replyList:Array<any>;
  init: Function;
  changeInput: Function;
  addReply: Function;
  scrollToLower: Function;
}

export interface IRegisterStore {
  mobile: string,
  validate: string,
  name: string,
  btnText: string,
  changeInput: Function,
  getValidate: Function,
  goIndex: Function,
}

export interface IIndexStore {
  longitude: number;
  latitude: number;
  type: string;
  markers: Array<marker>;
  polyline: Array<any>;
  controls: Array<any>;
  circles: Array<any>;
  scale: number;
  iconLeft: string;
  iconTop: string;
  isCallout: boolean;
  init: Function;
  getMapList: Function;
  changeLocation: Function;
  setScale: Function;
  setlocation: Function;
  handleClickCallout: Function;
  addVideo: Function;
}