import './index.less';

import { observable, toJS } from 'mobx';
import { ComponentType } from 'react';
import { ICommontStore, IIndexStore } from 'src/store/interface';

import { Button, CoverImage, CoverView, Image, Map, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config, MapContext } from '@tarojs/taro';

type PageStateProps = {
  indexStore: IIndexStore,
  commonStore: ICommontStore,
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
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentWillUnmount() {
    this.onRegionChange();
  }

  componentDidShow() {
    const mapCtx = Taro.createMapContext('map');
    this.setState({
      mapCtx
    }, () => {
      this.getCenterLocation();
    })
  }

  componentDidHide() { }

  // 获取中心点
  getCenterLocation() {
    const { indexStore } = this.props;
    this.state.mapCtx.getCenterLocation({
      success: async (res) => {
        console.log('获取中心点', res)
        this.getRegion();
        this.getScale();
        indexStore.setlocation(res.latitude, res.longitude)
      },
      fail: (e) => {
        console.log('error', e)
      },
    })
  }

  // 获取对角线
  getRegion() {
    const { indexStore } = this.props;
    this.state.mapCtx.getRegion({
      success: async (res) => {
        console.log('获取对角线', res)
        await indexStore.getMapList(res.northeast, res.southwest);
      },
      fail: (e) => {
        console.log('error', e)
      },
    })
  }

  // 获取层级
  getScale() {
    const { indexStore } = this.props;
    this.state.mapCtx.getScale({
      success: async (res) => {
        console.log('获取层级', res)
        await indexStore.setScale(res.scale);
      },
      fail: (e) => {
        console.log('error', e)
      },
    })
  }

  onRegionChange(e?) {
    console.log('onRegionChange', e)
    // 获取中心点
    if (e.type === "end") {
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
    const { indexStore, commonStore } = this.props;
    const { longitude, latitude, markers, controls, polyline, circles, scale, iconLeft, iconTop } = indexStore;
    const { user } = commonStore;
    return (
      <View className="index">
        <Map id="map" className="map" longitude={longitude} latitude={latitude} scale={scale}
          controls={controls} markers={markers} polyline={polyline} circles={toJS(circles)}
          showLocation={true}
          onRegionChange={this.onRegionChange} onMarkerTap={this.onCalloutTap}
        ></Map>

        <CoverView className="center" style={{ 'left': iconLeft, 'top': iconTop }}>
          <CoverImage
            className="addIcon"
            src={require("../../assets/images/center.png")} />
        </CoverView>

        <CoverView className="footer">
          <CoverView className="add" onClick={() => {
            if (user && user.uid) {
              indexStore.addVideo()
            } else {
              Taro.navigateTo({
                url: '/pages/register/register'
              })
            }
          }
          }>
            <CoverView>发布视频</CoverView>
          </CoverView>
        </CoverView>

        <CoverView className="my" onClick={() => {
          Taro.navigateTo({
            url: '/pages/index/mine'
          })
        }}>
          <CoverImage
            className="addIcon"
            src={user && user.logo ? user.logo : require("../../assets/images/avatar.png")} />
        </CoverView>


      </View>
    )
  }
}

export default Index as ComponentType
