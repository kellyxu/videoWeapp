import './register.less';

import { ComponentType } from 'react';

import { Button, Image, Input, Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';

type PageStateProps = {
  registerStore: {
    mobile: string,
    validate: string,
    name: string,
    btnText: string,
    changeInput: Function,
    getValidate: Function,
    goIndex: Function,
  }
}

interface Register {
  props: PageStateProps;
}


@inject('registerStore')
@observer
class Register extends Component {

  config: Config = {
    navigationBarTitleText: '注册'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  render() {
    const { registerStore } = this.props;
    const { mobile, validate, name, btnText } = registerStore;
    return (
      <View className='register'>
        <View className="main">
          <Image
            className="logo"
            mode="widthFix"
            src={require("../../assets/images/logo.png")}
          />
          <View className="item">
            <View className="inputBox">
              <Input
                className="input"
                type="number"
                maxLength={11}
                placeholder="请输入电话号码"
                value={mobile}
                onInput={(event)=>registerStore.changeInput('mobile',event)}
              />
            </View>
          </View>
          <View className="validate">
            <View className="validate-left">
              <Input
                className="input"
                type="number"
                placeholder="请输入6位验证码"
                value={validate}
                onInput={(event)=>registerStore.changeInput('validate',event)}
              />
            </View>
            <View className="validate-right" 
              onClick={()=>registerStore.getValidate()}
            >
              {btnText}
            </View>
          </View>
          <View className="item">
            <View className="inputBox">
              <Input
                className="input"
                type="text"
                maxLength={11}
                placeholder="请输入真实姓名"
                value={name}
                onInput={(event)=>registerStore.changeInput('name',event)}
              />
            </View>
          </View>
          
          <Button
            onGetUserInfo={(event)=>registerStore.goIndex(event)}
            // disabled={!(validate && mobile && name)}
            openType="getUserInfo"
            className="save"
          >
            <Image
              className="saveBtn"
              mode="widthFix"
              src={require("../../assets/images/registerBtn.png")}
            />
          </Button>
         
        </View>

      </View>

    )
  }
}

export default Register as ComponentType
