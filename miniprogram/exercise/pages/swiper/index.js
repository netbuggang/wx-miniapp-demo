var myslider = require('./utils/yxxrui.slider.js');
//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    curPage: 1,
    x: 0
  },
  onLoad: function () {
    myslider.initMySlider({
      that: this,
      datas: [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg'
      ],
      autoRun: true,
      blankWidth: 12,
      newImgWidth: 18,
      interval: 3000,
      duration: 500,
      direction: 'left',
      startSlide: function (curPage) {

      },
      endSlide: function (curPage) {

      }
    });
  }
})
