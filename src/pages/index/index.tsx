import React, { Component } from "react";
import {
  View,
  LivePlayer,
  Button,
  CoverView,
  ScrollView,
  Block,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer, inject } from "mobx-react";
import VideoBox from "../video";
import "./index.scss";

type PageStateProps = {
  store: {};
};

interface Iprops {
  props: PageStateProps;
}

interface Istate {
  liveHeight: string;
  isFullScreen: boolean;
  isMarkShow: boolean;
}
@inject("store")
@observer
class Index extends Component<Iprops, Istate> {
  livePlayer: any;
  state = {
    liveHeight: "300px",
    isMarkShow: false,
    isFullScreen: false,
  };
  componentDidMount() {
    this.livePlayer = Taro.createLivePlayerContext("LivePlayer");
    console.log(this.livePlayer, 123123);
  }

  componentDidShow() {}

  // 播放
  onPlay = () => {
    console.log(this.livePlayer, 12312);
    this.livePlayer.play();
  };
  // onPause
  onPause = () => {
    this.livePlayer.pause();
  };

  // 全屏
  onRequestFullScreen = () => {
    this.livePlayer.requestFullScreen({
      direction: 90,
    });
  };
  // 退出全屏
  onExitFullScreen = () => {
    this.livePlayer.exitFullScreen();
  };
  // 静音
  onMute = () => {
    this.livePlayer.mute();
  };
  // 恢复
  onResume = () => {
    this.livePlayer.resume();
  };
  // 停止
  onStop = () => {
    this.livePlayer.stop();
  };
  // 全屏
  onFullScreenChange = (eventhandle) => {
    if (eventhandle.mpEvent.detail.fullScreen) {
      this.setState({
        liveHeight: "100%",
        isFullScreen: true,
      });
    } else {
      this.setState({
        liveHeight: "300px",
        isFullScreen: false,
      });
    }
  };
  // 点击
  liveClick = () => {
    let {isMarkShow} =this.state
      this.setState({
        isMarkShow:!isMarkShow
      })
  };
  // 应该在这里阻止滑动穿透的
  disMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return;
  };

  render() {
    let { liveHeight,isMarkShow } = this.state;
    return (
      <View className="LiveBox">
        <View
          className="LivePlayerWarp"
          style={{ height: liveHeight }}
          onClick={this.liveClick}
        >
          <LivePlayer
            id="LivePlayer"
            className="livePlayer"
            autoplay={true}
            // orientation='horizontal'
            muted={true}
            onFullScreenChange={this.onFullScreenChange}
            src="rtmp://test-play.allinmd.cn/liveMeeting/c04d4d2f42fec44d6e4b967466785c8b3f9c_vflu?txSecret=997a31eaf23428a1aee3122acc8f043c&txTime=5f6efc3e"
          >
            
          </LivePlayer>
          <CoverView className="livePlayerControlWarp">
            {true && (
              <Block>
                <CoverView
                  onClick={this.onRequestFullScreen}
                  className="livePlayerControl"
                >
                  全屏1
                </CoverView>
                <CoverView
                  onClick={this.onExitFullScreen}
                  className="livePlayerControlFull"
                >
                  退出全屏
                </CoverView>
              </Block>
            )}
          </CoverView>
          
        </View>
        <ScrollView scrollY={true} scrollWithAnimation className="LiveBoxMain">
          <Button onClick={this.onPlay}> 播放</Button>
          <Button onClick={this.onPause}> 暂停</Button>
          <Button onClick={this.onRequestFullScreen}> 全屏</Button>
          <Button onClick={this.onExitFullScreen}> 退出全屏</Button>
          <Button onClick={this.onMute}> 静音</Button>
          <Button onClick={this.onPlay}> 播放</Button>
          <Button onClick={this.onPause}> 暂停</Button>
          <Button onClick={this.onRequestFullScreen}> 全屏</Button>
          <Button onClick={this.onExitFullScreen}> 退出全屏</Button>
          <Button onClick={this.onMute}> 静音</Button>
          <Button onClick={this.onPlay}> 播放</Button>
          <Button onClick={this.onPause}> 暂停</Button>
          <Button onClick={this.onRequestFullScreen}> 全屏</Button>
          <Button onClick={this.onExitFullScreen}> 退出全屏</Button>
          <Button onClick={this.onMute}> 静音</Button>
        </ScrollView>
        {/* <Button onClick={this.onStop}> 停止</Button>
        <Button onClick={this.onResume}> 恢复</Button> */}
      </View>
    );
  }
}

export default Index;
