import './addVideo.less';

import { ComponentType } from 'react';

import { Button, Image, Input, Text, Textarea, Video, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

type PageStateProps = {
  addVideoStore: {
    title: string;
    titleLen: string;
    info: string;
    infoLen: string;
    videoSrc: string;
    positionName: string;
    init: Function;
    getLocation: Function;
    changeInput: Function;
    changeVideo: Function;
  }
}

interface AddVideo {
  props: PageStateProps;
}

@inject('addVideoStore')
@observer
class AddVideo extends Component {

  config: Config = {
    navigationBarTitleText: '上传视频'
  }

  componentWillMount() {
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  async componentDidMount() {
    const { addVideoStore } = this.props;
    await addVideoStore.init();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  render() {
    const { addVideoStore } = this.props;
    const { title, titleLen, info, infoLen, videoSrc, positionName } = addVideoStore;
    return (
      <View className="addVideo">
        <View className="main">
          {
            videoSrc ? (
              <View className="videoBox">
                <Video className="myVideo" src={videoSrc}
                  show-center-play-btn enable-danmu controls autoplay={true}
                ></Video>
                <View className="">
                  <Text onClick={async () => await addVideoStore.changeVideo()}>重新上传</Text>
                </View>
              </View>) : (
              <View className="videoBox">
                <Image
                  className="icon"
                  mode="widthFix"
                  src={require("../../assets/images/avatar.png")}
                  onClick={async () => await addVideoStore.changeVideo()}
                />
              </View>
            )
          }

          <View className="content">
            <View className="item">
              <Textarea className="itemLeft" value={title}  
                onInput={(event)=>addVideoStore.changeInput('title',event)}
                maxlength={20} auto-height placeholder="请输入视频标题" />
              <Text className="itemRight">{titleLen}</Text>
            </View>
            <View className="item position">
              <Text className="itemLeft">{positionName}</Text>
              <Text className="itemRight" onClick={()=>addVideoStore.getLocation()}>获取定位</Text>
            </View>
            <View className="item infoBox">
              <Textarea className="itemLeft" value={info}  
                onInput={(event)=>addVideoStore.changeInput('info',event)}
                maxlength={300} auto-height  placeholder="请输入视频简介" />
              <Text className="itemRight">{infoLen}</Text>
            </View>
          </View>


          <Button
            // onGetUserInfo={(event)=>registerStore.goIndex(event)}
            // disabled={!(validate && mobile && name)}
            // openType="getUserInfo"
            className="save"
          >
            发布
          </Button>

        </View>

      </View>
    )
  }
}

export default AddVideo as ComponentType
