// exercise/pages/verticalSwiper/index.js
Page({

  data: {
    imgUrl: "https://res-wxec-unipt.lorealchina.com/lancome/material/images/",
    currentIndex: 0,
    duration: 400,
    list: [
      {
        images: [
          {
            url: "scroll_paging_11.png",
          },
        ],
      },
      {
        images: [
          {
            url: "scroll_paging_21.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_22.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_23.png",
            isFloat: true,
          }
        ],
        hotView: [
          {
            position: [1305, 270, 74, 270],
            link: ""
          }
        ]
      },
      {
        images: [
          {
            url: "scroll_paging_31.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_32.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_33.png",
            isFloat: true,
          }
        ],
      },
      {
        images: [
          {
            url: "scroll_paging_41.png",
          },
        ],
      },
      {
        images: [
          {
            url: "scroll_paging_51.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_52.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_53.png",
            isFloat: true,
          }
        ],
      },
      {
        images: [
          {
            url: "scroll_paging_61.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_62.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_63.png",
            isFloat: true,
          }
        ],
      },
      {
        images: [
          {
            url: "scroll_paging_71.png",
            isFloat: true,
          },
          {
            url: "scroll_paging_72.png",
            isFloat: true,
          }
        ],
      },
    ]
  },

  onLoad(options) {

  },

  onReady() {

  },

  onShow() {

  },
  bindchange(e) {
    // console.log(1111, e)
    const { current } = e.detail;
    this.setData({
      currentIndex: current
    });
  },
  bindtransition(e) {
    // console.log(2222, e)
  },
  bindanimationfinish(e) {
    // console.log(3333, e)
    // const { current } = e.detail;
    // this.setData({
    //   currentIndex: current
    // });
  },
  onShareAppMessage() {

  }
})