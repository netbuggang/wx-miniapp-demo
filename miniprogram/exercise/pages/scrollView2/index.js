Page({
  onShareAppMessage() {
    return {
      title: "scroll-view",
      path: "page/component/pages/scroll-view/scroll-view"
    }
  },
  scrollInfo: {
    startX: 0,
    startY: 0,
    lastPage: false,
    scrollHeight: 0,
  },
  data: {
    scrollTop: 0,
    isScroll: false,
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
    const { deltaY, scrollHeight } = e.detail;

    this.scrollInfo.scrollHeight = scrollHeight;
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
  scroll2(e) {
    const { scrollHeight } = e.detail;
    this.scrollInfo.scrollHeight = scrollHeight;
  },
  touchstart(e) {
    const touch = e.touches[0];

    this.scrollInfo.startX = touch.pageX;
    this.scrollInfo.startY = touch.pageY;
  },
  touchmove(e) {
    const touch = e.touches[0];

    this.scrollInfo.endX = touch.clientX;
    this.scrollInfo.endY = touch.clientY;
  },
  touchend(e) {
    if (this.scrollInfo.endX === 0 || this.scrollInfo.startX === 0) return;

    const dx = this.scrollInfo.endX - this.scrollInfo.startX;
    const absDx = Math.abs(dx);
    const dy = this.scrollInfo.endY - this.scrollInfo.startY;
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      const direction = absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0;
      // 0上; 1 右; 2 下; 3 左
      this.onScrollNextPage(direction);
    }

    this.scrollInfo.endX = 0;
    this.scrollInfo.endY = 0;
  },
  onScrollNextPage(direction) {
    const { scrollHeight } = this.scrollInfo;
    const { scrollTop, windowHeight } = this.data;

    let diff;
    if (direction == 0) {
      diff = 1;
    } else if (direction == 2) {
      diff = -1;
    }

    this.setData({
      isScroll: true
    });

    wx.nextTick(() => {
      const _scrollTop = scrollTop + windowHeight * diff;
      if (_scrollTop >= 0 && (!scrollHeight || _scrollTop < scrollHeight)) {
        this.setData({
          scrollTop: _scrollTop,
        })
      };

      let timer = null;
      timer = setTimeout(() => {
        this.setData({
          isScroll: false
        });
        clearTimeout(timer);
      }, 300);
    })
  }
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