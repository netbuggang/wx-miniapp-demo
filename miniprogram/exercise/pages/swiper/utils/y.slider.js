function initMySlider(opt) {
  if (opt.that == null) {
    console.log('请传入正确的this');
    return;
  }
  var that = opt.that;
  //此处数据初始化后就不修改了
  var ySliderData = {};
  //数据包，必须为数组
  ySliderData.datas = opt.datas || [];
  //空白处的宽度
  ySliderData.blankWidth = opt.blankWidth ?? 12;
  //新图片凸出来的宽度
  ySliderData.newImgWidth = opt.newImgWidth ?? 18;
  //是否自动滚动
  ySliderData.autoRun = opt.autoRun;
  //每隔x毫秒滚动一次
  ySliderData.interval = opt.interval ?? 10;
  //滚动方向
  ySliderData.direction = opt.direction || 'left';

  var len = ySliderData.datas.length;
  if (len < 1) {
    console.log('数据数组必须设置');
    return;
  }

  //处理数据
  var fistImg = ySliderData.datas[0];
  var lastImg = ySliderData.datas[len - 1];
  ySliderData.datas.unshift(lastImg);//将最后一张图片重复放到前边，做无缝滚动
  ySliderData.datas.push(fistImg);//将第一张图片重复放到后边，做无缝滚动

  //计算各种参数
  var w = opt.imgWidth || wx.getSystemInfoSync().screenWidth;
  var kx = ySliderData.blankWidth;//白色空隙宽度12px
  var nx = ySliderData.newImgWidth;//新图片突出来18px
  var ox = kx + nx * 2;//每页中无效的宽度
  var fx = w - (ox + nx);
  //总宽度
  ySliderData.totalWidth = ySliderData.datas.length * (w - ox);
  ySliderData.firstX = -fx;

  that.setData({
    ySliderData: ySliderData,
    ySliderX: ySliderData.firstX,
  });
  dealEvent(that);

  if (ySliderData.autoRun) {
    autoRunMyslider(that, ySliderData.interval);
  }
}
function dealEvent(that) {
  //触摸开始事件
  that.sliderTouchStart = function (opt) {
    that.data.yTempTimer && clearTimeout(that.data.yTempTimer);
    //暂定自动滚动
    that.data.yAutoRunTimer && clearInterval(that.data.yAutoRunTimer);
    that.setData({
      ySliderLastX: that.data.ySliderX,
      ySliderFirstPointX: opt.touches[0].clientX,
      yAutoRunTimer: null
    });
  };
  //触摸移动事件
  that.sliderTouchMove = function (opt) {
    //让轮播图跟着指头滑动
    var pointx = opt.touches[0].clientX;
    var x = that.data.ySliderLastX + (pointx - that.data.ySliderFirstPointX);
    that.setData({
      ySliderX: x
    });
    slideTo(that, 0);
  };
  //触摸结束事件
  that.sliderTouchEnd = function (opt) {
    //继续开启自动滚动
    var mydata = that.data.ySliderData;
    if (mydata.autoRun) {
      that.data.yTempTimer = setTimeout(() => {
        autoRunMyslider(that, mydata.interval);
        clearTimeout(that.data.yTempTimer);
      }, 2000)
    }
  };
  //触摸取消事件跟触摸结束事件相同
  that.sliderTouchCancel = that.sliderTouchEnd;
  //记录用户设置的隐藏事件，等待执行完毕之后恢复此事件
  var oldHide = that.onHide;
  that.onHide = function () {
    that.data.yAutoRunTimer && clearInterval(that.data.yAutoRunTimer);
    that.setData({
      yAutoRunTimer: null
    });
    oldHide && oldHide();
  };
  //记录用户设置的显示事件，等待执行完毕之后恢复此事件
  var oldShow = that.onShow;
  that.onShow = function () {
    var mydata = that.data.ySliderData;
    if (mydata.autoRun) {
      autoRunMyslider(that, mydata.interval);
    }
    oldShow && oldShow();
  }
}
function autoRunMyslider(that, t) {
  that.data.yAutoRunTimer && clearInterval(that.data.yAutoRunTimer);
  var autoRunTimer = setInterval(function () {
    var dir = that.data.ySliderData.direction == 'right' ? 1 : -1;
    slideTo(that, dir);
  }, t);
  that.setData({
    yAutoRunTimer: autoRunTimer
  });
}
function slideTo(that, x) {
  var mydata = that.data.ySliderData;
  var i = Math.abs(x);
  var lastx = that.data.ySliderX;
  var perScreenX = mydata.totalWidth / mydata.datas.length;
  var totalWidth = mydata.totalWidth;

  // 滚动到左边界，处理无缝滚动
  if (lastx + x >= mydata.newImgWidth) {
    var nowx = mydata.newImgWidth - (totalWidth - perScreenX * 2);
    that.setData({
      ySliderX: nowx
    });
    lastx = that.data.ySliderX;

    return
  }
  // 滚动到右边界，处理无缝滚动
  if (lastx + x + totalWidth - perScreenX <= mydata.newImgWidth) {
    that.setData({
      ySliderX: mydata.firstX
    });
    lastx = that.data.ySliderX;

    return
  }

  if (x > 0) {
    that.setData({
      ySliderX: lastx + i
    });
  } else {
    that.setData({
      ySliderX: lastx - i
    });
  }
}
export default {
  initMySlider
}