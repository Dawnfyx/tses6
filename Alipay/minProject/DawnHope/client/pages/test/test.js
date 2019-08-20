Page({
  data: {
    title: 'Alipay',
    array: [{user: 'li'}, {user: 'zhao'}],
    text: "init Data"
  },
  changeText() {
    this.setData({
      text: 'changed data',
    });
  },
});
