import create from "../../plugins/wx-omix/create.js";
import store from "../../store/index.js";
import { getUrlQueryParams } from "../../utils/util";
import { _navigateTo } from "../../utils/activity/utils";
const App = getApp();
const TempHeight = [];
create.Component(store, {
  use: ["userInfo"],
  options: {
    addGlobalClass: true
  },
  externalClasses: ["class"],
  properties: {
    src: {
      type: String,
      value: "",
    },
    mode: {
      type: String,
      value: "",
    },
    customStyle: {
      type: String,
      value: "",
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    /**需要展示的宽度（rpx值），默认750 */
    width: {
      type: Number,
      value: 750
    }
  },
  data: {
    imagePath: "",
    hotZonePosition: [],
    imagesInfo: [],
    swiperHeight: 0,
  },
  observers: {
    // TODO: 小程序wx.getImageInfo并发数最多10，暂时注销这种方式。后续使用promise异步队列处理
    // async "src"(value) {
    //   const { width } = await wx.getImageInfo({
    //     src: value,
    //   });
    //   this.formatData(value, width);
    // },
  },
  pageLifetimes: {
    show() {
    }
  },
  lifetimes: {
    attached() {
      this.formatData(this.data.src, this.data.width);
    }
  },
  methods: {
    formatData(url, originalWidth) {
      const query = getUrlQueryParams(url);

      // 带跳转链接的图
      let imagesInfo = [];
      if (query.imagesInfo) {
        imagesInfo = JSON.parse(decodeURIComponent(query.imagesInfo));
      }

      // 热区图
      let hotZonePosition = [];
      if (query.hotZonePosition) {
        hotZonePosition = JSON.parse(decodeURIComponent(query.hotZonePosition));
        hotZonePosition?.forEach(ele => {
          const { x, y, width, height, naturalImgHeight, naturalImgWidth } = ele;
          if (originalWidth) {
            const dpr = originalWidth / naturalImgWidth;
            ele.x = x * dpr;
            ele.y = y * dpr;
            ele.width = width * dpr;
            ele.height = height * dpr;
            ele.naturalImgHeight = naturalImgHeight * dpr;
            ele.naturalImgWidth = naturalImgWidth * dpr;
          }
        });
      }

      this.setData({
        imagesInfo,
        hotZonePosition,
        imagePath: url
      });
    },
    onTapImage(e) {
      const item = e?.currentTarget?.dataset?.item || this.data.imagesInfo?.[0];
      console.info("CustomImage.onTapImage.imagesInfo: ", item);
      if (!item?.linkUrl) return;

      // 执行跳转
      if (item.appId) {
        wx.navigateToMiniProgram({
          appId: item.appId,
          path: item.linkUrl
        });
      } else {
        _navigateTo(item.linkUrl);
      }
    },
    async onTapHot(e) {
      const { item } = e.currentTarget.dataset;
      console.info("CustomImage.onTapHot.dataset: ", item);

      switch (item.type) {
        case "link":
          // 跳转类型是自定义链接
          _navigateTo(item.linkUrl);
          break;
        case "videoPlay":
          // 跳转类型是视频播放链接
          // TODO:
          break;
        case "popup":
          // 跳转类型是弹窗
          // TODO:
          break;
        case "coupon":
          // 跳转类型是优惠券
          await App.HttpService.receiveCoupon({
            id: item.couponCode,
            appScene: "图片热区",
          });
          wx.showToast({ title: "领取成功" });
          break;
      }
    },
    getSwiperHeight(e) {
      const { width, height } = e.detail;
      const { imagesInfo, width: containerWidth } = this.data;
      const dpr = containerWidth / width;
      TempHeight.push(height * dpr);
      if (TempHeight.length == imagesInfo.length) {
        this.setData({
          swiperHeight: Math.max(...TempHeight)
        });
      }
    },
  }
})
