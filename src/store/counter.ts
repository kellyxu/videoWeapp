import { observable } from 'mobx';

import Taro, { Component } from '@tarojs/taro';

const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    // setTimeout(() => {
    //   this.counter++
    // }, 1000)
    // Taro.redirectTo({
    //   url: "/pages/register/register"
    // });
  }
})
export default counterStore