Page({
  data: {
    showZoom: true
  },
  onLoad(options) {

  },
  onReady() {
  },
  onTap() {
    this.setData({ showZoom: !this.data.showZoom })
  },
  randomColor() {
    let bg = "#";
    for (let i = 0; i < 6; i++) {
      bg += Math.floor(Math.random() * 16).toString(16);
    }
    return bg;
  },
  onPageScroll(e) {
    const { scrollTop } = e;
    if (scrollTop > 1 && this.data.showZoom) {
      this.setData({ showZoom: false })
    }
    if (scrollTop < 1 && !this.data.showZoom) {
      this.setData({ showZoom: true })
    }
  },
  onShareAppMessage() {

  }
})