import './mine.less';

import { toJS } from 'mobx';
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
    const { tab, list, tabActive } = mineStore;
    const { user, text } = commonStore;

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
            src={user && user.logo ? user.logo : require("../../assets/images/avatar.png")}
          />
          <Text className="name">{user.name}</Text>
          <Text className="text">{text}</Text>

        </View>

        <View style={{"background":"#4384FE"}}>
          <Image
            className="bolang"
            mode="widthFix"
            src={require("../../assets/images/bolang.png")}
          />
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
            toJS(list).length > 0 ? (<View className="list">
              {
                toJS(list).map((item) => {
                  return (
                    <View className="item" key={item.id}>
                      <Image
                        className="boxLeft"
                        mode="widthFix"
                        src={item.img}
                      />
                      <View className="boxRight">
                        <View className="header">
                          <View className="title">{item.title}</View>
                          {
                            tabActive === 0 ? (
                              <View className="btnBox">
                                <Image
                                  className="editIcon"
                                  mode="widthFix"
                                  src={require("../../assets/images/edit.png")}
                                />
                                <Text onClick={() => mineStore.goVideoDetail(item)} className="btn">编辑</Text>
                              </View>
                            ) : null
                          }

                        </View>
                        <View className="positionBox">
                          <View className="right">
                            <Image
                              className="icon"
                              mode="widthFix"
                              src={require("../../assets/images/position_icon.png")}
                            />
                            <Text className="">{item.province}-{item.street}-{item.city}</Text>
                          </View>
                          <View className="left">
                            <Image
                              className="icon"
                              mode="widthFix"
                              src={require("../../assets/images/date_icon.png")}
                            />
                            <Text className="">{item.time}</Text>
                          </View>
                        </View>
                        {
                          tabActive === 1 ? (
                            <View className="videoNumber">
                              播放量
                              <Text className="number">{item.hits}</Text>
                            </View>
                          ) : tabActive === 0 ? (
                            <View className="checkIng">
                              审核中
                            </View>
                          ) : (
                            <View className="unCheck">
                              未通过
                            </View>
                          )
                        }

                      </View>
                    </View>
                  )
                })
              }

            </View>
            ) : (<View style={{ "marginTop": "100px" }}><Tips data={tipData} /></View>)
          }
        </View>

      </View>
    )
  }
}

export default Mine as ComponentType
