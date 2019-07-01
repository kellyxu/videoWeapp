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
    data: {}
  };

  render() {
    const { icon, title, des, styles } = this.props.data;
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
