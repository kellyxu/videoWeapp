/**
 * 提示
 */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./tips.less";

class Tips extends Component {
  static defaultProps = {
    data: {}
  };
  render() {
    const { icon, title, des, styles } = this.props.data;
    return (
      <View className="tips" style={styles}>
        <Image className="icon" mode="widthFix" src={icon} />
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
