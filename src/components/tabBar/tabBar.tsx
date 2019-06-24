import './tabBar.less';

import { Image, Navigator, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

type PageStateProps = {
  tabBarStore: {
    menuOption: Array<any>;
    selected: string;
    onTabChange: Function;
  }
}

interface TabBar {
  props: PageStateProps;
}

@inject('tabBarStore')
@observer
class TabBar extends Component {

  render() {
    const { tabBarStore } = this.props;
    const { menuOption, selected, onTabChange } = tabBarStore;
    return (
      <View className="tabBar">
        <View className="barList">
          {menuOption.map(item => {
            return (
              <View
                className="menuItem"
                key={item.title}
                onClick={onTabChange.bind(this, item.name)}
              >
                <Image
                  className="icon"
                  mode="widthFix"
                  style="width: 24px;"
                  src={
                    selected.includes(item.name)
                      ? item.selectedIconPath
                      : item.iconPath
                  }
                />
                <Text className={`${selected.includes(item.name)?"active":""} title`}>{item.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

}

export default TabBar;
