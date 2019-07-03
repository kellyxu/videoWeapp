import './tips.less';

import { ComponentType } from 'react';

import { Image, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
/**
 * 提示
 */
import Taro, { Component } from '@tarojs/taro';

interface PageStateProps {
  data: {
    icon?: string;
    title: string,
    des: string[];
    styles?: string;
  };
}

@observer
class Tips extends Component<PageStateProps> {
  static defaultProps = {
    data: {
      icon: require("../../assets/images/empty.png"),
      title: '',
      des: ['暂无数据']
    }
  };

  render() {
    const { icon, title, des, styles } = this.props.data;
    console.log('tips',this.props)
    return (
      <View className="tips" style={styles}>
        {
          icon ? (<Image className="icon" mode="widthFix" src={icon} />) : null
        }
        {title ? <Text className="title">{title}</Text> : null}
        {des.length > 0
          ? des.map(text => {
            return (
              <Text key={text} className="des">
                {text}
              </Text>
            );
          })
          : null}
      </View>
    );
  }
}

export default Tips;
