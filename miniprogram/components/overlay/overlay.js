Component({
  properties: {
    // 遮罩样式-内联
    maskCustomStyle: {
      type: String,
      value: ""
    },
    // 是否显示遮罩
    showMask: {
      type: Boolean,
      value: true
    }
  },
  data: {
    status: "hide"
  },
  methods: {
    open() {
      this.setData({ status: "open" });
    },
    close(config = { animation: true }) {
      if (config.animation) {
        this.setData({ status: "destory" });
        setTimeout(() => {
          this.setData({ status: "hide" });
        }, 350);
      } else {
        this.setData({ status: "hide" });
      }
    },
    preventTouchMove(e) { }
  }
})
