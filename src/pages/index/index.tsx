import './index.less';

import { observable, toJS } from 'mobx';
import { ComponentType } from 'react';

import { Button, CoverImage, CoverView, Map, Text, View } from '@tarojs/components';
import { marker } from '@tarojs/components/types/Map';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config, MapContext } from '@tarojs/taro';

import TabBar from '../../components/tabBar/tabBar';

type PageStateProps = {
  indexStore: {
    longitude: number;
    latitude: number;
    type: string;
    markers: Array<marker>;
    polyline: Array<any>;
    controls: Array<any>;
    circles: Array<any>;
    scale: number;
    init: Function;
    getMapList: Function;
    changeLocation: Function;
    setlocation: Function;
    handleClickCallout: Function;
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

@inject('indexStore', 'commonStore')
@observer
class Index extends Component {

  config: Config = {
    navigationBarTitleText: '视频'
  }

  state: IndexState = {
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
    const { indexStore } = this.props;
    indexStore.init();
    const mapCtx = Taro.createMapContext('map');
    this.setState({
      mapCtx
    }, () => {
      this.getCenterLocation();
    })
  }

  componentWillUnmount() {
    this.onRegionChange();
  }

  componentDidShow() { }

  componentDidHide() { }

  // 获取中心点
  getCenterLocation() {
    const { indexStore } = this.props;
    this.state.mapCtx.getCenterLocation({
      success: async (res) => {
        this.getRegion();
        indexStore.setlocation(res.latitude,res.longitude)
        console.log('getCenterLocation', res)
      },
      fail: (e) => {
        console.log('error',e)
      },
    })
  }

  // 获取对角线
  getRegion() {
    const { indexStore } = this.props;
    this.state.mapCtx.getRegion({
      success: async (res) => {
        await indexStore.getMapList(res.northeast, res.southwest);
      },
      fail: (e) => {
        console.log('error',e)
      },
    })
  }

  onRegionChange(e?) {
    console.log('onRegionChange', e)
    // 获取中心点
    if(e.type === "end") {
      this.getCenterLocation();
    }
  }

  // 点击气泡
  onCalloutTap(e) {
    console.log('onCalloutTap', e)
    const { indexStore } = this.props;
    indexStore.handleClickCallout(e.markerId);
  }


  render() {
    const { indexStore } = this.props;
    const { longitude, latitude, markers, controls, polyline, circles, scale } = indexStore;
    return (
      <View className="index">
        <Map id="map" className="map" longitude={longitude} latitude={latitude} scale={scale}
          controls={controls} markers={markers} polyline={polyline} circles={toJS(circles)}
          showLocation={true}
          onRegionChange={this.onRegionChange} onCalloutTap={this.onCalloutTap}
        ></Map>
        {/* <TabBar  /> */}
        {/* <CoverView className="controls">
          <CoverImage className="img" src={require("../../assets/images/edit.png")} />
        </CoverView> */}

      </View>
    )
  }
}

export default Index as ComponentType
