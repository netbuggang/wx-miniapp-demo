Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  data: {
    scrollTop: 0,
    isScroll: true,
  },
  onReady() {
    const { screenHeight, windowHeight } = wx.getSystemInfoSync();
    console.log({ screenHeight, windowHeight });
    this.setData({ windowHeight });
  },
  binddragend(e) {
    console.log(11111, e)
  },
  scroll: throttle2(function (e) {
    console.log(22222, e)
    const { windowHeight } = this.data;
    const { deltaY } = e.detail;
    this.setData({
      scrollTop: this.data.scrollTop + (deltaY > 0 ? -windowHeight : +windowHeight),
      isScroll: false
    })

    let timer = null;
    timer = setTimeout(() => {
      this.setData({
        isScroll: true
      });
      clearTimeout(timer);
    }, 400);
  }, 400),
  bindanimationend(e) {
    console.log(33333, e)
  },
  bindtransitionend(e) {
    console.log(444444, e)
  },
})

function throttle2(fn, wait = 1000) {
  let pre = 0;
  return function () {
    let now = Date.now()
    if (now - pre > wait) {
      fn.apply(this, arguments);
      pre = now
    }
  }
}