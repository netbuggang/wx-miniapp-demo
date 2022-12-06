// exercise/pages/gallery/index.js
Page({
  data: {
    productSeries: [
      [
        '/images/house1.png',
        '/images/house2.png',
        '/images/house3.png',
        '/images/house2.png',
        '/images/house3.png',
        '/images/house4.png'
      ],
      [
        '/images/house1.png',
        '/images/house2.png',
        '/images/house3.png',
        '/images/house2.png',
        '/images/house3.png',
        '/images/house4.png'
      ]
    ],
    speed: 40,
    seriesWidth: 400,
    duration: 60000
  },
  onShow() {
    if (this.productSeries[0].length > 4) {
      this.seriesWidth = 190 * this.productSeries[0].length - 10
      this.duration = Math.floor(this.seriesWidth / this.speed * 1000)
    } else { // 当一行图片太少时就没必要加动画了
      this.seriesWidth = null
      this.duration = 0
    }
  }
})