Page({
  data: {
    list: [
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/f8559675-fa5e-4a63-a546-0f3d7cf3b175.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/342f523b-ee32-47c3-8822-327d11d772b0.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/ac85445b-ab1e-4a89-b9f2-ad5795365e5f.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/665e9fea-c977-44fc-afeb-f7a72677e16e.jpg"
    ],
    isCanScroll: true,
  },
  onLoad(options) {

  },
  onReady() {
    this.setData({ scrollWidth: this.data.list.length * 2 * 234 })
  },
  onShow() {

  },
  onHide() {

  },
  canScroll(e) {
    this.setData({
      isCanScroll: e === true
    })
  }
})