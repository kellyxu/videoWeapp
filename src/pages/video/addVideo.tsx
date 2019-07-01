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

@inject('addVideoStore','commonStore')
@observer
class AddVideo extends Component {

  config: Config = {
    navigationBarTitleText: '上传视频'
  }

  componentWillMount() {
    Taro.hideTabBar({
      
    })
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
    const { addVideoStore, commonStore } = this.props;
    const { title, titleLen, info, infoLen, videoSrc, positionName, selectIndex } = addVideoStore;
    const { areaRange } = commonStore;
    console.log('areaRange',toJS(areaRange))
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

          <PickerView value={selectIndex} onChange={()=>addVideoStore.regionChange()} >
            <PickerViewColumn>
            {
              
            }
            </PickerViewColumn>
          </PickerView>


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
