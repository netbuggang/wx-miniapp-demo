Component({
  properties: {
    showFooterBtn: {
      type: Boolean,
      value: false
    },
    showCloseBtn: {
      type: Boolean,
      value: true
    }
  },
  data: {
    dialog: {
      type: "info",
      title: true,
      content: "",
      confirmText: "确定",
      cancelText: "取消",
      showCloseBtn: true,
    }
  },
  lifetimes: {
    attached() { }
  },
  methods: {
    open(config = {}) {
      config.content = config.content?.split("\n");
      config.tips = config.tips?.split("\n");
      this.setData({
        dialog: Object.assign({}, this.data.dialog, config),
      });

      this.selectComponent("#overlay").open();

      let _resolve, _reject;
      this.promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject
      });
      this.promise.resolve = _resolve;
      this.promise.reject = _reject;
      return this.promise;
    },
    onSubmit(e) {
      const { result } = e.currentTarget.dataset;
      this.close();
      return this.promise.resolve(result);
    },
    close() {
      this.selectComponent("#overlay").close();
    },
  }
})
