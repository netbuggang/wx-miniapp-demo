import { CacheHTTPResult } from "../../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(await this.promiseTest())
    console.log(await this.promiseTest(true))
    console.log(await this.promiseTest())
  },
  promiseTest: CacheHTTPResult(async function (refresh = false) {
    console.log(2222);
    await this.httpTest();
    return "promiseTest";
  }, true),
  async httpTest() {
    return new Promise((resolve, reject) => {
      console.log(11111);
      resolve("httpTest");
    })
  }
})