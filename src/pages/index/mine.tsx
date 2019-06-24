import './mine.less';

import { ComponentType } from 'react';

import { Image, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import TabBar from '../../components/tabBar/tabBar';

type PageStateProps = {
  mineStore: {
    tab: Array<any>;
    init: Function;
    changeTab: Function;
  }
}

interface Mine {
  props: PageStateProps;
}

@inject('mineStore')
@observer
class Mine extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    const { mineStore } = this.props
    mineStore.init();
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { mineStore } = this.props;
    const { tab } = mineStore;
    return (
      <View className="mine">
        <View className="userInfo">
          <Image
            className="avatar"
            mode="widthFix"
            src={require("../../assets/images/avatar.png")}
          />
          <Text className="name">名字名字</Text>
          <Text className="text">Ant Design是一个服务于企业级产品的设计体系，让设计者专注于更好的用户体验。</Text>
        </View>

        <View className="content">
          <View className="tabHeader">
          {
            tab.map((item)=>{
              const active = item.active ? "active" : "";
              return <View className="item" key={item.code} onClick={()=>mineStore.changeTab(item)}>
                <View className={`${active} text`}>{item.name}</View>
                <View className={`${active} origin`}></View>
              </View>
            })
          }
          </View>
          <View className="list">
            <View className="item">
              <Image
                className="boxLeft"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="boxRight">
                <View className="header">
                  <View className="title">表演长沙不错吧撒的不三大</View>
                  <View className="btnBox">
                    <Image
                      className="editIcon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="btn">编辑</Text>
                  </View>
                </View>
                <View className="positionBox">
                  <View className="right">
                    <Image
                      className="icon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="">上海-青浦</Text>
                  </View>
                  <View className="left">
                    <Image
                      className="icon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="">昨天</Text>
                  </View>
                </View>
                <View className="videoNumber">
                  播放量
                  <Text className="number">1207</Text>
                </View>
              </View>
            </View>
            <View className="item">
              <Image
                className="boxLeft"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="boxRight">
                <View className="header">
                  <View className="title">表演长沙不错吧撒的不三大</View>
                  <View className="btnBox">
                    <Image
                      className="editIcon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="btn">编辑</Text>
                  </View>
                </View>
                <View className="positionBox">
                  <View className="right">
                    <Image
                      className="icon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="">上海-青浦</Text>
                  </View>
                  <View className="left">
                    <Image
                      className="icon"
                      mode="widthFix"
                      src={require("../../assets/images/edit.png")}
                    />
                    <Text className="">昨天</Text>
                  </View>
                </View>
                <View className="videoNumber">
                  播放量
                  <Text className="number">1207</Text>
                </View>
              </View>
            </View>
            </View>
        </View>
        
        <TabBar  />
      </View>
    )
  }
}

export default Mine  as ComponentType
