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
  areaRange: IArea;
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
  commentDetail: any;
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
  multiArray: Array<any>;
  multiIndex: any;
  isLocation: Boolean;
  locationId: any;
  locationName: string;
  location: any;
  provinces: Array<any>;
  init: Function;
  getLocation: Function;
  changeInput: Function;
  changeVideo: Function;
  regionChange: Function;
  regionColumnChange: Function;
  addVideo: Function;
}

export interface IReplyStore {
  reply: string;
  num: string,
  replyDetail:any,
  replyList:Array<any>;
  init: Function;
  changeInput: Function;
  addReply: Function;
}