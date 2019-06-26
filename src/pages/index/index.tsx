import './index.less';

import { observable, toJS } from 'mobx';
import { ComponentType } from 'react';

import { Button, Map, Text, View } from '@tarojs/components';
import { marker } from '@tarojs/components/types/Map';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import TabBar from '../../components/tabBar/tabBar';

type PageStateProps = {
  indexStore: {
    longitude: number;
    latitude: number;
    markers: Array<marker>;
    polyline: Array<any>;
    controls: Array<any>;
    circles: Array<any>;
    init: Function;
  }
}

interface Index {
  props: PageStateProps;
}

@inject('indexStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '视频'
  }

  componentWillMount() {
    const { indexStore } = this.props;
    // indexStore.init();
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
    const { indexStore } = this.props;
    const { longitude,latitude, markers, controls, polyline, circles } = indexStore;
    console.log('1233',longitude,latitude,toJS(indexStore));
    return (
      <View className="index">
        <Map id="map" longitude={longitude} latitude={latitude} scale={14} 
        controls={controls} markers={markers} polyline={polyline} circles={toJS(circles)}
        show-location style="width: 100%; height: 100%;"></Map>
        {/* <TabBar  /> */}
      </View>
    )
  }
}

export default Index as ComponentType
