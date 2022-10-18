/**
 * 延时器
 * @param {number} ms 时间-毫秒
 */
export function Sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * 异常处理的Toast
 * @param {object|string} error 错误信息
 * @param {number} duration 动画持续时间
 * @param {function} cb 回调函数
 */
export function ShowErrorToast(error, duration = 3000, cb = () => { }) {
  wx.hideToast();
  if (cb) {
    setTimeout(() => {
      cb();
    }, duration);
  }
  if (typeof error == "string" && error.length > 2000) {
    return wx.showToast({
      icon: "none",
      title: "服务器异常",
      duration,
    });
  } else {
    return wx.showToast({
      icon: "none",
      title: typeof error == "string" ? error : error.msg || error.message || error.errorMessage || JSON.stringify(error),
      duration,
    });
  }
}

/**
 * 成功处理的Toast
 * @param {string} title 提示信息
 * @param {number} duration 动画持续时间
 */
export function ShowSuccessToast(title, duration = 3000) {
  wx.hideToast();
  return wx.showToast({
    icon: "success",
    title,
    duration,
  });
}

/**
 * 异常处理的alert
 * @param {object|string} error 错误信息
 * @param {string} title 错误标题
 * @param {string} buttonText 按钮文字
 */
export async function ShowErrorAlert(error, title = "", buttonText = "") {
  return wx.showModal({
    title: title,
    content: typeof error == "string" ? error : error.msg || error.message || error.errorMessage || JSON.stringify(error),
    confirmText: buttonText || "我知道了",
    showCancel: false,
  });
}

/**
 * 防抖函数
 * @param {function} fn 需要防抖的函数
 * @param {number} delay 延迟时间
 */
export function Debounce(fn, delay = 100) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}

/**
 * 节流函数
 * @param {function} fn 需要节流的函数
 * @param {number} delay 延迟时间
 */
export function Throttle(fn, delay = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, delay);
  };
}

/**
 * 获取小程序当前页面地址
 */
export function GetCurrentPageUrl() {
  var pages = getCurrentPages();    //获取加载的页面
  var currentPage = pages[pages.length - 1];  //获取当前页面的对象
  var url = currentPage.route;  //当前页面url
  var options = currentPage.options;   //获取url中所带的参数
  //拼接url的参数
  var currentPage = url + '?';
  for (var key in options) {
    var value = options[key]
    currentPage += key + '=' + value + '&';
  }
  currentPage = currentPage.substring(0, currentPage.length - 1);
  return "/" + currentPage;
}

/**
 * 获取小程序链接?后的参数
 * @param {*} url 小程序链接
 */
export function GetUrlQuery(url) {
  const theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substr(url.indexOf("?") + 1);
    const strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

/**
 * 打开外部小程序
 * @param {*} appId 
 * @param {*} path 
 */
export async function NavigateToMiniProgram(appId, path) {
  return wx.navigateToMiniProgram({ appId, path }).catch(error => {
    if (error.errMsg == "navigateToMiniProgram:fail can only be invoked by user TAP gesture.") {
      wx.showModal({
        content: "即将前往活动页面",
        confirmText: "我知道了",
        showCancel: false,
        success: () => wx.navigateToMiniProgram({ appId, path })
      });
    }
  });
}

/**
 * 日期格式化
 * @param {*} fmt 如：YYYY-mm-dd HH:MM表示2019-06-06 19:45
 * @param {*} date 日期
 */
export function DateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

/**
 * 缓存http请求
 * @param httpPromise 要缓存的函数
 * @param needRefresh 是否需要强制刷新机制
 */
export function CacheHTTPResult(httpPromise, needRefresh) {
  if (typeof httpPromise !== 'function') {
    throw new TypeError('Expected a function')
  }

  let cache = undefined;
  return function (...args) {
    // 最后一个参数是刷新的功能
    if (needRefresh && args[args.length - 1] === true) {
      cache = undefined;
    }

    return (cache =
      cache ||
      httpPromise.apply(this, args).catch((error) => {
        cache = undefined;
        return Promise.reject(error);
      }));
  };
}

/**页面滚动到某个元素（顶部）
 * 
 * @param {*} ele 
 * @param {*} duration 
 */
export function ScrollToElement(ele, duration = 300) {
  const query = wx.createSelectorQuery();
  query.select(ele).boundingClientRect();
  query.exec(function (res) {
    if (res[0].top <= 0) {
      wx.pageScrollTo({
        scrollTop: res[0].top,
        duration
      });
    }
  });
}