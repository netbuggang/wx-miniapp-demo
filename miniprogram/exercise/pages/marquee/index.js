

Page({
  touchStartClientX: 0,
  touchStartClientY: 0,
  touchEndClientX: 0,
  touchEndClientY: 0,
  startY: 0,
  data: {
    list: [
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/f8559675-fa5e-4a63-a546-0f3d7cf3b175.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/342f523b-ee32-47c3-8822-327d11d772b0.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/ac85445b-ab1e-4a89-b9f2-ad5795365e5f.jpg",
      "https://res-wxec-unipt.lorealchina.com/prod/lan/20221130/665e9fea-c977-44fc-afeb-f7a72677e16e.jpg"
    ],
    canScroll: false,
    offsetX: 0,
    speed: -2,
    offsetWidth: 1872,
  },
  onLoad(options) {

  },
  onReady() {
    this.onAutoSlide();
  },
  onShow() {

  },
  onHide() {

  },
  onAutoSlide() {
    this.$autoSlideTimer = setInterval(this.onSlide, 30);
  },
  onSlide(moveX = 0) {
    const { offsetX, speed, offsetWidth } = this.data;
    let _offsetX = moveX || offsetX;

    // 滚动到左边界，处理无缝滚动
    if (_offsetX < -(offsetWidth / 2)) {
      _offsetX = 0;
    }
    // 滚动到右边界，处理无缝滚动
    if (_offsetX > 0) {
      _offsetX = -(offsetWidth / 2);
    }

    this.setData({
      offsetX: _offsetX + (moveX == 0 ? speed : 0)
    })
  },
  // 触摸开始事件
  sliderTouchStart(e) {
    const touch = e.touches[0];
    this.touchStartClientX = touch.clientX;
    this.touchStartClientY = touch.clientY;
    this.startY = touch.pageY;

    // 暂定自动滚动
    clearTimeout(this.$tempSlideTimer);
    clearInterval(this.$autoSlideTimer);

    this.$sliderFirstPointX = touch.clientX;
    this.$sliderLastOffsetX = this.data.offsetX;
  },
  // 触摸移动事件
  sliderTouchMove(e) {
    const touch = e.touches[0];
    this.touchEndClientX = touch.clientX
    this.touchEndClientY = touch.clientY

    const detalY = touch.pageY - this.startY * 1
    if (Math.abs(detalY) < 50) {
      //禁止上下滑动
      this.setData({ canScroll: false });
    }

    // 让轮播图跟着指头滑动
    const moveX = this.$sliderLastOffsetX + (touch.clientX - this.$sliderFirstPointX);
    this.onSlide(moveX);
  },
  // 触摸结束事件
  sliderTouchEnd(e) {
    this.setData({ canScroll: true });
    if (this.touchEndClientX === 0 || this.touchStartClientX === 0) return;

    const dx = this.touchEndClientX - this.touchStartClientX;
    const absDx = Math.abs(dx);
    const dy = this.touchEndClientY - this.touchStartClientY;
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      const direction = absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0
      // console.log(direction)
      // 0上; 1 右; 2 下; 3 左
      // ownerInstance.callMethod('changeDirection', { direction })

      if (direction == 3) {
        this.data.speed = -2;
      } else if (direction == 1) {
        this.data.speed = 2;
      }
    }
    this.touchEndClientX = 0;
    this.touchEndClientY = 0;

    // 继续开启自动滚动
    this.$tempSlideTimer = setTimeout(() => {
      this.onAutoSlide();
      clearTimeout(this.$tempSlideTimer);
    }, 2000)
  },
  // 触摸取消事件跟触摸结束事件相同
  sliderTouchCancel() {
    return this.sliderTouchEnd;
  }
})