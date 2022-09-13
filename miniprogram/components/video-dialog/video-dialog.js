let $VideoContext = null;

Component({
  properties: {
  },
  data: {
    dialog: {
      path: "",
      poster: "",
    },
    videoHeight: 0,
  },
  pageLifetimes: {
    hide() {
      $VideoContext?.pause();
    }
  },
  lifetimes: {
    attached() {
      $VideoContext = $VideoContext || wx.createVideoContext('$dialog-video', this);
    }
  },
  methods: {
    open(config = {}) {
      this.setData({ dialog: Object.assign({}, this.data.dialog, config) });
      this.selectComponent('#overlay').open();
      $VideoContext?.play();
      let _resolve, _reject;
      this.promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject
      });
      this.promise.resolve = _resolve;
      this.promise.reject = _reject;
      return this.promise;
    },
    getVideoH(e) {
      if (this.data.videoHeight) return;
      const viewHeight = 750 / (e.detail.width / e.detail.height);
      this.setData({ videoHeight: viewHeight });
    },
    close() {
      $VideoContext?.pause();
      // $VideoContext.seek(0);
      // $VideoContext.stop();
      this.selectComponent('#overlay').close();
    }
  }
})
