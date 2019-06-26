import './app.less';
import '@tarojs/async-await';

import { Provider } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

import Index from './pages/index';
import addVideoStore from './store/addVideo';
import indexStore from './store/index';
import mineStore from './store/mine';
import registerStore from './store/register';
import replyStore from './store/reply';
import tabBarStore from './store/tabBar';
import videoDetailStore from './store/videoDetail';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  indexStore,
  registerStore,
  mineStore,
  tabBarStore,
  addVideoStore,
  videoDetailStore,
  replyStore,
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/index/mine',
      'pages/register/register',
      'pages/video/addVideo',
      'pages/video/videoDetail',
      'pages/video/reply',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#999999",
      selectedColor: "#00BCD4",
      borderStyle: "white",
      backgroundColor: "#fff",
      list: [
        {
          pagePath: "pages/index/index",
          text: "视频",
          iconPath: "./assets/images/home.png",
          selectedIconPath: "./assets/images/home_active.png"
        },
        {
          pagePath: "pages/index/mine",
          text: "我的",
          iconPath: "./assets/images/mine.png",
          selectedIconPath: "./assets/images/mine_active.png"
        },
        {
          pagePath: "pages/video/addVideo",
          text: "发布",
          iconPath: "./assets/images/mine.png",
          selectedIconPath: "./assets/images/mine_active.png"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
