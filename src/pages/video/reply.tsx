import './reply.less';

import { ComponentType } from 'react';

import { Button, Image, Input, Map, Text, Video, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import TabBar from '../../components/tabBar/tabBar';

type PageStateProps = {
  replyStore: {
    reply: string;
    changeInput: Function;
  }
}

interface Reply {
  props: PageStateProps;
}

@inject('replyStore')
@observer
class Reply extends Component {

  config: Config = {
    navigationBarTitleText: '回复'
  }

  componentWillMount() {
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
    const { replyStore } = this.props;
    const { reply } = replyStore;
    return (
      <View className="reply">
        <View className="header">
          <View className="item">
            <Image
              className="headImg"
              mode="widthFix"
              src={require("../../assets/images/avatar.png")}
            />
            <View className="detail">
              <View className="name">
                谢敏
                </View>
              <View className="text">
                一直都想去上海，羡慕～
                </View>
              <View className="date">
                <Text>2019-03-21</Text>
                <Text className="num">13回复</Text>
              </View>
            </View>
          </View>

        </View>
        <View className="comment">
          <View className="title">
            <Text>全部回复</Text>
            <Text className="number">121</Text>
          </View>
          <View className="list">
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  一直都想去上海，羡慕～
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  一直都想去上海，羡慕～
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>
            <View className="item">
              <Image
                className="headImg"
                mode="widthFix"
                src={require("../../assets/images/avatar.png")}
              />
              <View className="detail">
                <View className="name">
                  谢敏
                </View>
                <View className="text">
                  语雀是一款优雅高效的在线文档编辑与协同工具， 让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。
                </View>
                <View className="date">
                  <Text>2019-03-21</Text>
                  <Text className="num">13回复</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View className="footer">
          <Input
            className="input"
            type="text"
            maxLength={11}
            placeholder="喜欢就发表一下见解吧～"
            value={reply}
            onInput={(event) => replyStore.changeInput(event)}
          />
          <Button className="btn"
            disabled={!reply} >
            回复
          </Button>
        </View>

      </View>
    )
  }
}

export default Reply as ComponentType
