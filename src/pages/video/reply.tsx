import './reply.less';

import { toJS } from 'mobx';
import { ComponentType } from 'react';

import { Button, Image, Input, Map, ScrollView, Text, Video, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import Tips from '../../components/tips/tips';
import { IReplyStore, IVideoDetailStore } from '../../store/interface';

type PageStateProps = {
  replyStore: IReplyStore;
  videoDetailStore: IVideoDetailStore,
}

interface Reply {
  props: PageStateProps;
}

@inject('replyStore','videoDetailStore')
@observer
class Reply extends Component {

  config: Config = {
    navigationBarTitleText: '回复'
  }

  componentWillMount() {
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  async componentDidMount() {
    const { replyStore } = this.props;
    const params = this.$router.params;
    await replyStore.init(params);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { replyStore, videoDetailStore } = this.props;
    const { reply, num, replyDetail, replyList } = replyStore;
    const { commentDetail } = videoDetailStore;

    const tipData = {
      icon: require("../../assets/images/empty.png"),
      title: '',
      des: ['快来抢沙发吧']
    };

    return (
      <View className="reply">
        <View className="header">
          <View className="item">
            <Image
              className="headImg"
              mode="widthFix"
              src={ commentDetail && commentDetail.user && commentDetail.user.logo?commentDetail.user.logo:require("../../assets/images/avatar.png")}
            />
            <View className="detail">
              <View className="name">
                {commentDetail.user.name}
                </View>
              <View className="text">
                {commentDetail.content}
                </View>
              <View className="date">
                <Text>{commentDetail.time}</Text>
                <Text className="num">{commentDetail.replys}回复</Text>
              </View>
            </View>
          </View>

        </View>
        <View className="comment">
          <View className="title">
            <Text>全部回复</Text>
            <Text className="number">{num}</Text>
          </View>


          {
            toJS(replyList).length > 0 ? (
              <ScrollView style="max-height: 2500px;" className="list"
                scrollY
                scrollWithAnimation
                upperThreshold={100}
                onScrollToLower={async() => await replyStore.scrollToLower()}
              >
                {
                  toJS(replyList).map((item) => {
                    return (
                      <View className="item" key={item.id}>
                        <Image
                          className="headImg"
                          mode="widthFix"
                          src={item.user.logo?item.user.logo:require("../../assets/images/avatar.png")}
                        />
                        <View className="detail">
                          <View className="name">
                            {item.user.name}
                          </View>
                          <View className="text">
                            {item.content}
                          </View>
                          <View className="date">
                            <Text>{item.time}</Text>
                            {/* <Text className="num">{item.replys}回复</Text> */}
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
            ) : (
                <View style={{ "marginTop": "100px" }}>
                  <Tips data={tipData} />
                </View>
              )
          }
        </View>

        <View className="footer">
          <Input
            className="input"
            type="text"
            maxLength={100}
            placeholder="喜欢就发表一下见解吧～"
            value={reply}
            onInput={(event) => replyStore.changeInput(event)}
          />
          <Button
            onClick={() => replyStore.addReply()}
            className="btn"
            // disabled={!reply} 
          >
            回复
          </Button>
        </View>

      </View>
    )
  }
}

export default Reply as ComponentType
