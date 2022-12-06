const order = ['demo1', 'demo2', 'demo3']

Page({
  data: {
    toView: 'green',
    offsetX: 0,
    scrollWidth: 0,
  },
  onReady() {
    wx.createSelectorQuery().select(".scroll-wrap").boundingClientRect((rect) => {
      console.info("boundingClientRect.rect: ", rect)
      // 开启滚动
      // this.setData({ scrollWidth: rect.width })
    }).exec()
  },
  changeDirection(e) {
    console.log(11111, e);
  },
  updateOffsetX(e) {
    this.setData({
      offsetX: e
    })
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
})