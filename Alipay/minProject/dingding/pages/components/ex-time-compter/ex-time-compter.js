Component({
  mixins: [],
  data: {
    dctNumber: '00:00:00'
  },
  props: {
    endTime: '' //顶死用分单位
  },
  didMount() {
    
    let endTime = this.props.endTime;

    if(!endTime){
      return;
    }
      
    let timeMS = 0;
    let timeSS = 0;
    let timeMM = 0;
    let timeHH = 0;
    let timeString;

    // if(endTime % 60 == 0 && endTime > 60){
    //   timeMM = endTime%60;
    //   timeHH = (endTime - (endTime%60))/60;
    // } else{
    //   timeMM = endTime;
    // }
    timeString = endTime * 60;

    //debugger
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          timeString -= 1;
          timeSS = timeString%60;
          timeMM = parseInt(timeString/60%60);
          timeHH = parseInt(timeString/60/60)
          this.setData({dctNumber:  this.toDub(timeHH) +":" + this.toDub(timeMM) +":" + this.toDub(timeSS)});
          // console.log(timeSS);
          if(timeString <= 0){
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })

  },
  didUpdate() {
  },
  didUnmount() {},
  methods: {
    toDub(n) { //补0操作
      if (n < 10) {
        return '0' + n;
      }
      else {
        return '' + n;
      }
    },

  }
});
