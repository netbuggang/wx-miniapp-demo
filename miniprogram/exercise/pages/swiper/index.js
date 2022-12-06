var myslider = require('./utils/y.slider');
Page({
  data: {},
  onLoad() {
    myslider.initMySlider({
      that: this,
      datas: [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg'
      ],
      autoRun: true,
      blankWidth: 0,
      newImgWidth: 18,
      interval: 10,
      duration: 0,
      direction: 'left',
    });
  }
})
