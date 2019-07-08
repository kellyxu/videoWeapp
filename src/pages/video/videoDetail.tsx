import './videoDetail.less';

import { toJS } from 'mobx';
import { ComponentType } from 'react';

import { Button, Image, Input, Map, ScrollView, Text, Video, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import Tips from '../../components/tips/tips';
import { ICommontStore, IVideoDetailStore } from '../../store/interface';

type PageStateProps = {
  videoDetailStore: IVideoDetailStore,
  commonStore: ICommontStore;
}

interface VideoDeatil {
  props: PageStateProps;
}

@inject('videoDetailStore', 'commonStore')
@observer
class VideoDeatil extends Component {

  config: Config = {
    navigationBarTitleText: '视频详情'
  }

  componentWillMount() {
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  async componentDidMount() {
    const { videoDetailStore } = this.props;
    const params = this.$router.params;
    await videoDetailStore.init(params);

    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { videoDetailStore, commonStore } = this.props;
    const { comment, num, commentList, videoDetail } = videoDetailStore;
    const { user } = commonStore;
    console.log('videoDetail', commentList)

    const tipData = {
      icon: '',
      title: '',
      des: ['快来抢沙发吧']
    };

    return (
      <View className="videoDetail">
        <View className="videoBox">
          <Video className="myVideo" src={videoDetail.url}
            duration={15} showCenterPlayBtn controls autoplay={true}
          ></Video>
        </View>

        <View className="content">
          <View className="headerBox">
            <Text className="title">{videoDetail.title}</Text>
            {/* <View className="position">
              <View className="position">
                <Image
                  className="icon"
                  mode="widthFix"
                  src={require("../../assets/images/position_icon.png")}
                />
                <Text className="text">{videoDetail.province}-{videoDetail.city}-{videoDetail.street}</Text>
              </View>
            </View> */}
          </View>
          <View className="userInfo">
            <View className="item name">
              <Image
                className="icon"
                mode="widthFix"
                src={videoDetail.user && videoDetail.user.logo ? videoDetail.user.logo : require("../../assets/images/avatar.png")}
              />
              <Text className="text">{videoDetail.user.name}</Text>
            </View>
            <View className="item">
              <Image
                className="icon"
                mode="widthFix"
                src={require("../../assets/images/hits_icon.png")}
              />
              <Text className="text">{videoDetail.hits}</Text>
            </View>
            <View className="item">
              <Image
                className="icon"
                mode="widthFix"
                src={require("../../assets/images/date_icon.png")}
              />
              <Text className="text">{videoDetail.time}</Text>
            </View>
          </View>
          <View className="detailInfo">
            <Text className="allInfo">{videoDetail.content}</Text>
            {/* <Text className="show">展开</Text> */}
          </View>

        </View>

        <View className="comment">
          <View className="title">
            <Text>评论</Text>
            <Text className="number">{num}</Text>
          </View>
          {
            toJS(commentList).length > 0 ? (
              <ScrollView style="max-height: 2500px;" className="list"
                scrollY
                scrollWithAnimation
                upperThreshold={100}
                onScrollToLower={async () => await videoDetailStore.scrollToLower()}
              >
                {
                  toJS(commentList).map((item) => {
                    console.log('item.user', item.user)
                    return (
                      <View className="item" key={item.id} onClick={() => videoDetailStore.goComentDetail(item)}>
                        <Image
                          className="headImg"
                          mode="widthFix"
                          src={item.user.logo ? item.user.logo : require("../../assets/images/avatar.png")}
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
                            <Text className="num">{item.replys}回复</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
                }

              </ScrollView>
            ) : (<Tips data={tipData} />)
          }

        </View>

        {
          user && user.uid && (<View className="footer">
            <Input
              className="input"
              type="text"
              maxLength={100}
              placeholder="喜欢就发表一下见解吧～"
              value={comment}
              onInput={(event) => videoDetailStore.changeInput(event)}
            />
            <Button className="btn"
              onClick={() => videoDetailStore.addVideoComment()}
              disabled={!comment} >
              发送
            </Button>
          </View>)
        }


      </View>
    )
  }
}

export default VideoDeatil as ComponentType
