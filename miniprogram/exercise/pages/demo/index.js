const App = getApp();
Page({
  data: {

  },
  async onLoad(options) {
    const images = [
      "https://res-wxec-unipt.lorealchina.com/test/20220623/28db9fa1-3bb8-4c63-b84c-c12f184a6313.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/df547a16-f471-486e-b0af-5a0d250c862a.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/e3456849-6757-4d09-a34e-3e647a00d10d.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/704bcbc7-c422-4b0d-80b5-c4e2ce390e84.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/71100b6e-5372-4818-9670-883bc194729c.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/2793eb1c-23b9-4c32-89b0-e8d9a28b9bf8.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/2147d260-4219-468d-a587-ebe45883a536.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/d4f024a7-0ab4-47df-91bc-c32e840e1af0.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/c74a3609-e73b-4183-8032-b1b7d9daec11.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/1d942648-208c-41c9-ab6a-14e2349a4739.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220623/fc3b96ab-d3a5-4ebd-baa0-bc89dfae221d.jpg",
      "https://res-wxec-unipt.lorealchina.com/test/20220718/47edf44e-ac62-4b4b-aad0-0cfce2b20bc2.jpg"
    ]
    const list = [];
    images.forEach(item => {
      list.push(App.getImageInfo({ src: item }))
    });
    const res = await Promise.all(list)
    console.log(11111, res);
  },
  onTap() {
    this.setData({
      active: !this.data.active
    })
  }
})