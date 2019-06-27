import './index.less';

import { observable, toJS } from 'mobx';
import { ComponentType } from 'react';

import { Button, Map, Text, View } from '@tarojs/components';
import { marker } from '@tarojs/components/types/Map';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config, MapContext } from '@tarojs/taro';

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
  },
  commonStore: {
    init: Function;
    getUserInfo: Function;
  },
}

interface Index {
  props: PageStateProps;
}
interface IndexState {
  mapCtx: any;
  // mapCtx: MapContext
}

@inject('indexStore','commonStore')
@observer
class Index extends Component {

  config: Config = {
    navigationBarTitleText: '视频'
  }

  state:IndexState = {
    mapCtx: "",
  };

  async componentWillMount() {
    const { indexStore } = this.props;
    await indexStore.init();
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    const mapCtx = Taro.createMapContext('map');
    console.log('mapCtx',mapCtx)
    this.setState({
      mapCtx
    },()=>{
      this.getRegion();
    })
    
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getRegion() {
    this.state.mapCtx.getRegion({
      success: (res)=>{
        console.log(res)
      },
      fail: (res)=>{
        console.log(res)
      },
    })
  }

  render() {
    const { indexStore } = this.props;
    const { longitude,latitude, markers, controls, polyline, circles } = indexStore;
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
