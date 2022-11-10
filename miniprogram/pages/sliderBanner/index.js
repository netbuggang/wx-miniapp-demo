import { Throttle, PxToRpx } from "../../utils/util";
Page({
  data: {
    showZoom: true,
    disableScroll: true,
    windowInfo: {
      initialHeight: 1178
    },
    onReady: false
  },
  onLoad(options) {
    const { windowInfo: { initialHeight } } = this.data;
    const { windowHeight } = wx.getSystemInfoSync();

    this.setData({
      "windowInfo.pixelRatio": PxToRpx(windowHeight) / initialHeight
    }, () => {
      this.setData({ onReady: true })
    })
  },
  onReady() { },
  onMove: Throttle(function (e) {
    console.log(1111, e);
    this.setData({ showZoom: false }, () => {
      this.setData({ disableScroll: false })
    })
  }),
  onScrollToupper(e) {
    console.log("bindscrolltoupper: ", e)
    this.setData({ showZoom: true }, () => {
      this.setData({ disableScroll: true })
    })
  },
  randomColor() {
    let bg = "#";
    for (let i = 0; i < 6; i++) {
      bg += Math.floor(Math.random() * 16).toString(16);
    }
    return bg;
  },
  onShareAppMessage() { }
})