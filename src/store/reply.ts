import { observable } from 'mobx';

import Taro from '@tarojs/taro';

import { addReply, getReplyList } from '../services/service';
import commonStore from './common';

const replyStore = observable({
  replyId: 0,
  reply: "",
  page: 1,
  pages: 1,
  num: 0,
  replyDetail: {},
  replyList: [],
  async init(params) {
    this.replyList = [];
    this.replyId = params.id;
    await this.getReplyList();
  },
  changeInput(e) {
    const value = e.detail.value;
    this.reply = value;
  },
  async getReplyList() {
    const { data } = await getReplyList({
      id: this.replyId,
      page: this.page
    });
    this.replyList = this.replyList.concat(data.list);
    this.num = data.num;
    this.pages = data.page_count;
    console.log('getReplyList', data)
  },
  async addReply() {
    const res = await addReply({
      uid: commonStore.user.uid,
      content: this.reply,
      cid: this.replyId,
    });
    if (res.status === "success") {
      // Taro.showToast({
      //   title: "回复成功，请等待审核",
      //   duration: 2000,
      //   icon: "none"
      // });
      this.reply = "";
      await this.getReplyList();
    } else {
      Taro.showToast({
        title: "回复失败，请稍后再试！",
        duration: 2000,
        icon: "none"
      });
    }
  },
  // 下拉加载
  async scrollToLower() {
    if (this.page < this.pages) {
      this.page++;
      await this.getReplyList();
    }
    console.log("下拉加载");
  },
})
export default replyStore