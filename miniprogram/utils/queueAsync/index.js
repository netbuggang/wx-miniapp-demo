/**异步队列
 * 
 * @param {*} fn 异步方法
 * @param {*} len 最大并发数
 * @description 用于微信小程序wx.getImageInfo同步调用最大限制报错加持，用法如下: 
 * @ 1.getApp().getImageInfo = queueAsync(wx.getImageInfo,10) // 在app.js或者utils里初始化一下
 * @ 2.await getApp().getImageInfo({src: xxx}) // 业务使用，可以替换wx.getImageInfo
 */
function queueAsync(fn, len) {
  const todoList = [];
  let doings = 0;

  const runOriginFunction = (...args) => fn(...args);
  function run(resolve, reject, args) {
    if (doings < len) {
      doings++;
      runOriginFunction(...args)
        .then(resolve)
        .catch(reject)
        .then(() => {
          doings--;
          const task = todoList.shift();
          task && run(task.resolve, task.reject, task.args);
        })
    } else {
      todoList.push({
        resolve, reject, args
      });
    }
  }

  return function (...args) {
    // debugger
    return new Promise((resolve, reject) => run(resolve, reject, args));
  }
}

export default queueAsync;