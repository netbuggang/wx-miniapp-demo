const STORAGE_KEY_ONE = "ADD-MYAPP-KEY-ONE";

Component({
  properties: {
    // 提示文字
    text: {
      type: String,
      value: "「添加小程序」访问更便捷!"
    },
    // 是否开启自定义导航栏，如果开启，会计算top的值
    custom: {
      type: Boolean,
      value: false
    }
  },
  data: {
    SHOW_TOP: false,
    marRight: 66,
    top: 0,
  },
  ready() {
    this.initTips();
  },
  methods: {
    initTips() {
      // 判断是否已经显示过
      let cacheOne = wx.getStorageSync(STORAGE_KEY_ONE);
      const now = Date.now();
      // 校验缓存数据 以及缓存时间是否过期(关闭后缓存一个月 一个月后重新提示用户)
      if (cacheOne && (now - cacheOne < 30 * 24 * 3600000)) return;
      // 处理根据系统信息处理位移箭头位置（重点）
      const systemInfo = wx.getSystemInfoSync();
      const client = wx.getMenuButtonBoundingClientRect();
      if (systemInfo && client) {
        this.setData({
          marRight: systemInfo.screenWidth - client.left - 28,
          top: this.properties.custom ? client.bottom + 4 : 0,
        });
      }
      // 没显示过，则进行展示
      this.setData({
        SHOW_TOP: true
      });
    },
    // 显示全屏添加说明
    showModal() {
      this.setData({
        SHOW_TOP: false,
        SHOW_MODAL: true
      });
    },
    okHandler() {
      const key = STORAGE_KEY_ONE;
      this.setData({
        SHOW_TOP: false
      });
      wx.setStorage({
        key,
        data: Date.now()
      });
    }
  }
})