"use strict";

var _notify = _interopRequireDefault(require("@wcjiang/notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var notify = new _notify["default"]({
  message: '有消息了。',
  // 标题
  effect: 'flash',
  // flash | scroll 闪烁还是滚动
  openurl: 'https://github.com/jaywcjlove/iNotify',
  // 点击弹窗打开连接地址
  onclick: function onclick() {
    // 点击弹出的窗之行事件
    console.log('---');
  },
  // 可选播放声音
  audio: {
    // 可以使用数组传多种格式的声音文件
    file: ['msg.mp4', 'msg.mp3', 'msg.wav'] // 下面也是可以的哦
    // file: 'msg.mp4'

  },
  // 标题闪烁，或者滚动速度
  interval: 1000,
  // 可选，默认绿底白字的  Favicon
  updateFavicon: {
    // favicon 字体颜色
    textColor: '#fff',
    // 背景颜色，设置背景颜色透明，将值设置为“transparent”
    backgroundColor: '#2F9A00'
  },
  // 可选chrome浏览器通知，默认不填写就是下面的内容
  notification: {
    title: '通知！',
    // 设置标题
    icon: '',
    // 设置图标 icon 默认为 Favicon
    body: '您来了一条新消息' // 设置消息内容

  }
});
notify.player();