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
  pages: 1,
  commentList: [],
  commentDetail: {},
  async init(params) {
    this.commentList = [];
    this.detailId = params.id;
    await this.getVideoComments();
    await this.getVideoDetai();
  },
  async getVideoDetai() {
    const { data } = await getVideoDetail({
      id: this.detailId
    });
    this.videoDetail = data;
  },
  async getVideoComments() {
    const { data } = await getVideoComments({
      page: this.page,
      id: this.detailId,
    });
    runInAction(() => {
      this.commentList = this.commentList.concat(data.list);
      this.num = data.num;
      this.pages = data.page_count;
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
    if (res.status === "success") {
      // Taro.showToast({
      //   title: "评论成功，请等待审核",
      //   duration: 2000,
      //   icon: "none"
      // });
      this.comment = "";
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
    this.commentDetail = item;
    Taro.navigateTo({
      url: `/pages/video/reply?id=${item.id}`
    })
  },
  // 下拉加载
  async scrollToLower() {
    if (this.page < this.pages) {
      this.page++;
      await this.getVideoComments();
    }
    console.log("下拉加载");
  },
})
export default videoDetailStore