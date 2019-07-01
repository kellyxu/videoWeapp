export interface  ICommontStore {
  logo: string;
  name: string;
  text: string;
  wxUserInfo: any;
  user: any;
  areaRange: Array<any>;
  init: Function;
  getSystemInfo: Function;
  setData: Function;
  getUserInfo: Function;
}
export interface  IVideoDetailStore {
  videoDetail: any;
  comment: string;
  num: number;
  commentList: Array<any>;
  init: Function;
  changeInput: Function;
  addVideoComment: Function;
  goComentDetail: Function;
}
export interface IMineStore {
  tab: Array<any>;
  list: Array<any>;
  init: Function;
  getConfig: Function;
  changeTab: Function;
}

export interface IAddVideoStore {
  title: string;
  titleLen: string;
  info: string;
  infoLen: string;
  videoSrc: string;
  selectIndex: any;
  positionName: Array<any>;
  provinces: Array<any>;
  citys: Array<any>;
  streets: Array<any>;
  init: Function;
  getLocation: Function;
  changeInput: Function;
  changeVideo: Function;
  regionChange: Function;
}