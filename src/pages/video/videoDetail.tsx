import './videoDetail.less';

import { ComponentType } from 'react';

import { Button, Image, Input, Map, Text, Video, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import TabBar from '../../components/tabBar/tabBar';

type PageStateProps = {
  videoDetailStore: {
    videoSrc: string;
    comment: string;
    changeInput: Function;
  }
}

interface VideoDeatil {
  props: PageStateProps;
}

@inject('videoDetailStore')
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

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { videoDetailStore } = this.props;
    const { videoSrc, comment } = videoDetailStore;
    return (
      <View className="videoDetail">
        <View className="videoBox">
          <Video className="myVideo" src={videoSrc}
            show-center-play-btn enable-danmu controls autoplay={true}
          ></Video>
        </View>

        <View className="content">
          <View className="headerBox">
            <Text className="title">来上海旅游，第一天</Text>
            <View className="position">
              <View className="position">
                <Image
                  className="icon"
                  mode="widthFix"
                  src={require("../../assets/images/position_icon.png")}
                />
                <Text className="text">上海-青浦区</Text>
              </View>
            </View>
          </View>
          <View className="userInfo">
            <View className="item name">
              <Image
                className="icon"
                mode="widthFix"
                src={require("../../assets/images/position_icon.png")}
              />
              <Text className="text">用户昵称</Text>
            </View>
            <View className="item">
              <Image
                className="icon"
                mode="widthFix"
                src={require("../../assets/images/position_icon.png")}
              />
              <Text className="text">1207</Text>
            </View>
            <View className="item">
              <Image
                className="icon"
                mode="widthFix"
                src={require("../../assets/images/date_icon.png")}
              />
              <Text className="text">昨天</Text>
            </View>
          </View>
          <View className="detailInfo">
            <Text className="allInfo">这是一段视频简介文字，这是一段视频简介文字，这是一段视频简介文字，这是一段视频简介文视频简介文字，这是一</Text>
            {/* <Text className="show">展开</Text> */}
          </View>

        </View>

        <View className="comment">
          <View className="title">
            <Text>评论</Text>
            <Text className="number">121</Text>
          </View>
          <View className="list">
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  一直都想去上海，羡慕～
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  一直都想去上海，羡慕～
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  语雀是一款优雅高效的在线文档编辑与协同工具， 让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View className="footer">
          <Input
            className="input"
            type="text"
            maxLength={11}
            placeholder="喜欢就发表一下见解吧～"
            value={comment}
            onInput={(event) => videoDetailStore.changeInput(event)}
          />
          <Button className="btn" 
            disabled={!comment} >
            发送
          </Button>
        </View>

      </View>
    )
  }
}

export default VideoDeatil as ComponentType
