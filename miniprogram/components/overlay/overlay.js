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
    status: "hiden"
  },
  methods: {
    open() {
      this.setData({ status: "open" });
    },
    close() {
      this.setData({ status: "destory" });
      setTimeout(() => {
        this.setData({ status: "hide" });
      }, 350);
    },
    preventTouchMove(e) { }
  }
})
