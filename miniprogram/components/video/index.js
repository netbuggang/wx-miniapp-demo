/** 多媒体组件 */
Component({
  properties: {
    poster: {
      type: String,
      value: ''
    },
    src: {
      type: String,
      value: ''
    },

    loop: {
      type: Boolean,
      value: false
    },

    autoplay: {
      type: Boolean,
      value: false
    },

    style: {
      type: String,
      value: ''
    },
  },

  data: {
    // 视频高度
    materialHeight: 0
  },

  methods: {
    videoLoder(e) {
      this.createSelectorQuery().select(`#__my__video`).boundingClientRect(rect => {
        const { windowWidth } = wx.getSystemInfoSync();
        const ratio = 750 / windowWidth;
        const eleWidth = rect.width * ratio;
        const viewHeight = eleWidth / (e.detail.width / e.detail.height)
        this.setData({
          materialHeight: viewHeight
        })
      }).exec();
    },
  }
})
