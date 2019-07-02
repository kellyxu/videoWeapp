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
    selectIndex: [0,0,0],
    provinces: [],
  };

  componentWillMount() {
    Taro.hideTabBar({

    })
  }

  componentWillReact() { }

  async componentDidMount() {
    const { addVideoStore, commonStore } = this.props;
    await addVideoStore.init();

    const areaRange = commonStore.areaRange;
    if (areaRange) {
      const provinces = [areaRange, areaRange[0].childAreas, areaRange[0].childAreas[0].childAreas];
      this.setState({
        provinces
      })
      console.log('this.provinces', toJS(provinces))
    }
    
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  regionColumnChange(e) {
    const { addVideoStore, commonStore } = this.props;
    const { provinces } = this.state;
    const detail = e.detail;
    const { value, column } = detail;
    let selectIndex = this.state.selectIndex;
    //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
    if (column == 0) {
      selectIndex = [value, 0, 0];
    } else if (column == 1) {
      //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
      selectIndex = [selectIndex[0], value, 0];
    } else if (column == 2) {
      //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
      selectIndex = [selectIndex[0], selectIndex[1], value];
    }
    const temp = commonStore.areaRange;
    provinces[0] = temp;
    if ((temp[selectIndex[0]].childAreas).length > 0) {
      //如果第二列“市”的个数大于0,通过selectIndex变更provinces[1]的值
      provinces[1] = temp[selectIndex[0]].childAreas;
      const areaArr = (temp[selectIndex[0]].childAreas[selectIndex[1]]).childAreas || [];
      //如果第三列“区”的个数大于0,通过selectIndex变更provinces[2]的值；否则赋值为空数组
      provinces[2] = areaArr.length > 0 ? areaArr : [];
    } else {
      //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
      provinces[1] = [];
      provinces[2] = [];
    }
  },

  render() {
    const { addVideoStore, commonStore } = this.props;
    const { title, titleLen, info, infoLen, videoSrc, selectIndex, provinces, locationName } = addVideoStore;
    const multiArray = toJS(provinces);
    const multiIndex = toJS(selectIndex) || [0, 0, 0];
    console.log('multiArray', multiArray)
    console.log('multiIndex', multiIndex)
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
                    {`${multiArray[0][multiIndex[0]].name}，${multiArray[1][multiIndex[1]].name}，${multiArray[2][multiIndex[2]].name}`}
                  </View>
                </Picker>
              </View>
              <Text className="itemRight" onClick={() => addVideoStore.getLocation()}>获取定位</Text>
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
