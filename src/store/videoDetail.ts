import { observable } from 'mobx';

const videoDetailStore = observable({
  videoSrc: "",
  comment: "",
  async init() {
  
     
  },
  changeInput(e) {
    const value = e.detail.value;
    this.comment = value;
  }
})
export default videoDetailStore