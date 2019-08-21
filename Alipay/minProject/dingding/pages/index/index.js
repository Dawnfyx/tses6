Page({
  data: {
    userInfo: {
      name: 'jack',
      phone: '15012341234',
      work: 'product manager',
    },
     examSubject: [
      {
        title: "标题标题标wsagr题标题1111",
        type: 1,
        option: [
          { name: 'angular', value: 'AngularJS' },
          { name: 'react', value: 'React'},
          { name: 'polymer', value: 'Polymer'},
          { name: 'vue', value: 'Vue.js' },
          { name: 'ember', value: 'Ember.js' },
          { name: 'backbone', value: 'Backbone.js', Answer: true },
        ],
      },
      {
        title: "标题标题标asgew题标题2222",
        type: 2,
        option: [
          { name: '1234', value: '1234'},
          { name: '123', value: '123'},
          { name: 'polymer', value: 'Polymer' },
          { name: 'vue', value: 'Vue.js' },
          { name: 'ember', value: 'Ember.js' },
          { name: 'backbone', value: 'Backbone.js', Answer: true },
        ],
      },
      {
        title: "标题标题标sdgdfh题标题3333",
        type: 1,
        option: [
          { name: 'angular', value: 'AngularJS' },
          { name: 'react', value: 'React'},
          { name: 'polymer', value: 'Polymer' },
          { name: 'vue', value: 'Vue.js' },
          { name: 'ember', value: 'Ember.js' },
          { name: 'backbone', value: 'Backbone.js', Answer: true },
        ],
      },
      {
        title: "标题标题标sdgdfh题标题4444",
        type: 1,
        option: [
          { name: 'angular', value: 'AngularJS' },
          { name: 'react', value: 'React'},
          { name: 'polymer', value: 'Polymer' },
          { name: 'vue', value: 'Vue.js' },
          { name: 'ember', value: 'Ember.js' },
          { name: 'backbone', value: 'Backbone.js', Answer: true},
        ],
      },
      {
        title: "标题标题标sdgdfh题标题5555",
        type: 2,
        option: [
          { name: '11111', value: '11111'},
          { name: '22222', value: '22222'},
          { name: '33333', value: '33333'},
          { name: '44444', value: '44444'},
          { name: '55555', value: '55555'},
          { name: '66666', value: '66666', Answer: true},
        ],
      }
    ]
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.httpRequest({
      url: 'http://www.imoocdsp.com/index/carousels',
      method: 'POST',
      data: {
        from: '支付宝',
        production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        // my.alert({content: res});
        console.log(JSON.stringify(res));
      },
      fail: function(res) {
        my.alert({content: 'fail' + res});
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  onSubmit(e) {
    // my.alert({
    //   content: e.detail.value,
    // });
    console.log('onSubmit', e.detail);
  },
  onReset(e) {
    console.log('onReset', e);
  },
});
