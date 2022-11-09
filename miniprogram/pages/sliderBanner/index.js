Page({
  data: {
    showZoom: true,
    openScroll: false,
  },
  onLoad(options) {

  },
  onReady() {
  },
  onTap() {
    // this.setData({ showZoom: !this.data.showZoom })
  },
  onMove(e) {
    console.log(1111, e);
    this.setData({ showZoom: false })
  },
  onScrollToupper(e) {
    console.log("bindscrolltoupper: ", e)
    this.setData({ showZoom: true })
  },
  onTransitionEnd(e) {
    console.log(22222, e);
    this.setData({ openScroll: !this.data.openScroll })
  },
  randomColor() {
    let bg = "#";
    for (let i = 0; i < 6; i++) {
      bg += Math.floor(Math.random() * 16).toString(16);
    }
    return bg;
  },
  onShareAppMessage() {

  }
})