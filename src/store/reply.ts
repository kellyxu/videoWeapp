import { observable } from 'mobx';

const replyStore = observable({
  comment: "",
  async init() {
  
     
  },
  changeInput(e) {
    const value = e.detail.value;
    this.comment = value;
  }
})
export default replyStore