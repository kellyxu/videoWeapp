import { observable, runInAction } from 'mobx';

import Taro from '@tarojs/taro';

import { addComment, getVideoComments, getVideoDetail } from '../services/service';
import commonStore from './common';

const videoDetailStore = observable({
  videoDetail: {},
  comment: "",
  detailId: "",
  num: 0,
  page: 1,
  commentList: [],
  async init(params) {
    this.detailId = params.id;
    await this.getVideoComments();
    await this.getVideoDetai();
  },
  async getVideoDetai() {
    const {data} = await getVideoDetail({
      id: this.detailId
    });
    this.videoDetail = data;
  },
  async getVideoComments() {
    const {data} = await getVideoComments({
      page: this.page,
      id: this.detailId,
    });
    runInAction(()=>{
      this.commentList = data.list;
      this.num = data.num;
    })
  },
  changeInput(e) {
    const value = e.detail.value;
    this.comment = value;
  },
  async addVideoComment() {
    const res = await addComment({
      uid: commonStore.user.uid,
      content: this.comment,
      vid: this.detailId,
    });
    if(res.status === "success") {
      Taro.showToast({
        title: "评论成功",
        duration: 2000,
        icon: "none"
      });
      await this.getVideoComments();
      await this.getVideoDetai();
    } else {
      Taro.showToast({
        title: "评论失败，请稍后再试！",
        duration: 2000,
        icon: "none"
      });
    }
  },
  goComentDetail(item) {
    Taro.redirectTo({
      url: `/pages/reply?id=${item.id}`
    })
  }
})
export default videoDetailStore