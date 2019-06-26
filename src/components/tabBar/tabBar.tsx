import './tabBar.less';

import { ComponentType } from 'react';

import { Image, Navigator, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

type PageStateProps = {
  tabBarStore: {
    menuOption: Array<any>;
    selected: string;
    init: Function;
    changeTab: Function;
  }
}

interface TabBar {
  props: PageStateProps;
}

@inject('tabBarStore')
@observer
class TabBar extends Component {

  componentDidMount () {
    const { tabBarStore } = this.props
    tabBarStore.init();
   }

  render() {
    const { tabBarStore } = this.props;
    const { menuOption, selected } = tabBarStore;
    return (
      <View className="tabBar">
        <View className="barList">
          {menuOption.map(item => {
            return (
              <View
                className="menuItem"
                key={item.title}
                onClick={()=>tabBarStore.changeTab(item)}
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

export default TabBar as ComponentType
