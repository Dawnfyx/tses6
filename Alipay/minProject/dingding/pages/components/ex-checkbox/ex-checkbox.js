Component({
  mixins: [],
  data: {},
  props: {
    examSubject: '',
    titleNum: ''
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    checkboxChange(e){
      console.log('你选择的框架是：', e.detail.value);
    }
  },
});
