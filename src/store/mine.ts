import { autorun, observable, runInAction } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

import { deleteVideo, getMyVideoList } from '../services/service';
import commonStore from './common';

const tab = [
  {
    name: "审核成功",
    code: "success",
    active: true,
    value: 1,
  },
  {
    name: "审核中",
    code: "checkIng",
    active: false,
    value: 0,
  },
  {
    name: "审核失败",
    code: "faild",
    active: false,
    value: 2,
  },
]

const mineStore = observable({
  tab: tab,
  tabActive: 1,
  page: 1,
  pages: 1,
  list: [],
  async init() {
    await commonStore.checkUser();
    this.tabActive = 1;
    this.tab = tab;
    this.list = [];
    setTimeout(async () => {
      await this.getMyVideoList();
    }, 1000);

  },
  async changeTab(value) {
    this.list = [];
    if (this.tabActive === value) {
      return;
    } else {
      runInAction(async () => {
        this.page = 1;
        this.tabActive = value;
        this.setActiveTab();
        await this.getMyVideoList();
      })
    }
  },
  setActiveTab() {
    this.tab.map((item) => {
      if (item.value === this.tabActive) {
        item.active = true;
      } else {
        item.active = false;
      }
    })
  },
  async getMyVideoList() {
    const { data } = await getMyVideoList({
      uid: commonStore.user.uid,
      status: this.tabActive,
      page: this.page,
    });
    runInAction(() => {
      this.list = this.list.concat(data.list);
      this.pages = data.page_count;
    })
  },
  goVideoDetail(item) {
    Taro.navigateTo({
      url: `/pages/video/addVideo?id=${item.id}`
    })
  },
  async deleteVideo(item) {
    const res = await deleteVideo({
      id: item.id
    });
    if (res.status === "success") {
      this.list = [];
      await this.getMyVideoList();
    } else {
      Taro.showToast({
        title: "删除失败！",
        duration: 2000,
        icon: "none"
      });
    }
  },
  // 下拉加载
  async scrollToLower() {
    if (this.page < this.pages) {
      this.page++;
      await this.getMyVideoList();
    }
    console.log("下拉加载");
  },
  // // 上拉刷新
  // async scrollToUpper() {
  //   this.page = 1;
  //   this.list = [];
  //   await this.getMyVideoList();
  //   console.log("上拉刷新")
  // }
})
export default mineStore