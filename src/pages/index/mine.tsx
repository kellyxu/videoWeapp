import './mine.less';

import { ComponentType } from 'react';

import { Image, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import Tips from '../../components/tips/tips';
import { ICommontStore, IMineStore } from '../../store/interface';

type PageStateProps = {
  mineStore: IMineStore;
  commonStore: ICommontStore;
}

interface Mine {
  props: PageStateProps;
}

@inject('mineStore', 'commonStore')
@observer
class Mine extends Component {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  async componentDidMount() {
    const { mineStore } = this.props
    await mineStore.init();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { mineStore, commonStore } = this.props;
    const { tab, list } = mineStore;
    const { name, text } = commonStore;

    const tipData = {
      icon: require("../../assets/images/empty.png"),
      title: '',
      des: ['暂无数据']
    };

    return (
      <View className="mine">
        <View className="userInfo">
          <Image
            className="avatar"
            mode="widthFix"
            src={require("../../assets/images/avatar.png")}
          />
          <Text className="name">{name}</Text>
          <Text className="text">{text}</Text>
        </View>

        <View className="content">
          <View className="tabHeader">
            {
              tab.map((item) => {
                const active = item.active ? "active" : "";
                return <View className="item" key={item.code}
                  onClick={async () => await mineStore.changeTab(item.value)}>
                  <View className={`${active} text`}>{item.name}</View>
                  <View className={`${active} origin`}></View>
                </View>
              })
            }
          </View>
          {
            list.length > 0 ? (<View className="list">
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
            ) : (<Tips data={tipData} />)
          }
        </View>

      </View>
    )
  }
}

export default Mine as ComponentType
