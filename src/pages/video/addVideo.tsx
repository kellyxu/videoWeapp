import './addVideo.less';

import { toJS } from 'mobx';
import { ComponentType } from 'react';

import {
    Button, Image, Input, Picker, PickerView, PickerViewColumn, Text, Textarea, Video, View
} from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import { IAddVideoStore, ICommontStore } from '../../store/interface';

type PageStateProps = {
  addVideoStore: IAddVideoStore;
  commonStore: ICommontStore;
}

interface AddVideo {
  props: PageStateProps;
}

@inject('addVideoStore', 'commonStore')
@observer
class AddVideo extends Component {

  config: Config = {
    navigationBarTitleText: '上传视频'
  }

  state = {
    selectIndex: [0, 0, 0],
    provinces: [],
  };

  componentWillMount() {
    Taro.hideTabBar()
  }

  componentWillReact() { }

  async componentDidMount() {
    const { addVideoStore, commonStore } = this.props;
    const params = this.$router.params;
    await addVideoStore.init(params);
  }

  componentWillUnmount() { 
    console.log('componentWillUnmount')
    Taro.showTabBar();
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { addVideoStore, commonStore } = this.props;
    const { title, titleLen, info, infoLen, videoId, videoSrc, selectIndex, provinces, locationName, location } = addVideoStore;
    const multiArray = toJS(provinces);
    const multiIndex = toJS(selectIndex);
    console.log('multiArray', multiArray)
    console.log('multiIndex', multiIndex)
    const locationClass = videoId?"disable":"itemRight";
    return (
      <View className="addVideo">
        <View className="main">
          {
            videoSrc ? (
              <View className="videoBox">
                <Video className="myVideo" src={videoSrc}
                  show-center-play-btn enable-danmu controls autoplay={true}
                ></Video>
                {
                  !videoId ? (
                    <View className="update">
                      <Text onClick={async () => await addVideoStore.changeVideo()}>重新上传</Text>
                    </View>) : null
                }

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
                onInput={(event) => addVideoStore.changeInput('title', event)}
                maxlength={20} auto-height placeholder="请输入视频标题" />
              <Text className="itemRight">{titleLen}</Text>
            </View>
            <View className="item position">
              <View className="itemLeft">
                <Picker
                  mode="multiSelector" rangeKey="name"
                  onChange={(e) => addVideoStore.regionChange(e)}
                  onColumnChange={(e) => addVideoStore.regionColumnChange(e)}
                  value={multiIndex} range={multiArray}>
                  <View className="picker">
                    {locationName}
                  </View>
                </Picker>
              </View>
              {/* <Text className="itemRight" onClick={() => addVideoStore.getLocation()}>获取定位</Text> */}
            </View>
            <View className="item position">
              <View className="itemLeft">
                <View className="location">{location.name}</View>
              </View>
              <Text className={locationClass} onClick={() => addVideoStore.getLocation()}>获取定位</Text>
            </View>
            <View className="item infoBox">
              <Textarea className="itemLeft" value={info}
                onInput={(event) => addVideoStore.changeInput('info', event)}
                maxlength={300} auto-height placeholder="请输入视频简介" />
              <Text className="itemRight">{infoLen}</Text>
            </View>
          </View>


          <Button
            onClick={async () => await addVideoStore.addVideo()}
            // disabled={!(validate && mobile && name)}
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
