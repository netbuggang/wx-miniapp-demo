import json from "./data"

Page({
  data: {
    specGroup: [],
    activeSkuInfo: null,
    activeSpecMap: {},
  },
  onLoad(options) {
    this.handleData(["N°33 糖渍金桔", "全新"])
  },

  handleData(currentSpecValues) {
    const specList = []
    const activeSpecMap = {}
    let currentSpec = {}
    const { goodsCategory, specs } = json

    const groupBy = (array, f) => {
      const groups = {}
      array.forEach((o, index) => {
        const group = JSON.stringify(f(o))
        groups[group] = groups[group] || []
        groups[group].push({
          $Id: Date.now().toString(36).substr(4, 8) + Math.random().toString(36).substr(2, 8),
          ...o
        })
      })
      return Object.keys(groups).map(group => {
        const value = JSON.parse(group)
        const activeItem = goodsCategory.attributes.find(
          ele => ele.code === value
        )
        const obj = {
          code: value,
          list: groups[group]
        }
        if (activeItem) {
          obj.name = activeItem.name
        }
        return obj
      })
    }

    specs.forEach(ele => {
      ele.specifications.forEach(item => {
        if (!specList.find(e => e.value === item.value)) {
          specList.push(item)
        }
      })
    })

    const specGroup = groupBy(specList, item => item.code)
    specGroup.forEach(ele => {
      ele.list.forEach(spec => {
        const skuList = []
        specs.forEach(sku => {
          const skuSpec = sku.specifications.find(
            ele => ele.value === spec.value
          )
          if (skuSpec) {
            skuList.push(sku.id)
            if (currentSpecValues.includes(spec.value)) {
              // spec.isActive = true
              // activeSpecMap[spec.code] = spec
              currentSpec = spec
            }
            if (sku.label.includes("热销商品")) {
              spec.$hot = true
            }
            if (!spec.$hot && sku.label.includes("新品")) {
              spec.$new = true
            }
          }
        })
        spec.skuList = skuList
      })
    })

    //初始化置灰操作
    specGroup.forEach(spec => {
      spec.list.forEach(ele => {
        if (ele.skuList.find(x => currentSpec.skuList.includes(x))) {
          ele.isDisabled = false
        } else {
          ele.isDisabled = true
          ele.isActive = false
        }
      })
    })

    this.setData({
      specGroup,
      activeSpecMap
    })
  },

  // 点击高亮
  choose(e) {
    const { info: currentSpec } = e.currentTarget.dataset
    const { specGroup, activeSpecMap } = this.data
    specGroup.forEach(spec => {
      // if (spec.code == currentSpec.code) {
      // 选中操作
      spec.list.forEach(ele => {
        if (ele.value == currentSpec.value) {
          ele.isActive = true
          ele.isDisabled = false
          activeSpecMap[ele.code] = ele
        } else {
          ele.isActive = false
        }
      })
      // } else {
      //   // 置灰操作
      //   spec.list.forEach(ele => {
      //     if (ele.skuList.some(x => currentSpec.skuList.includes(x))) {
      //       ele.isDisabled = false
      //     } else {
      //       ele.isDisabled = true
      //       ele.isActive = false
      //     }
      //   })
      // }
    })

    // 如果有属性没有选中的情况，默认选中可以选择的第一个
    // specGroup.forEach(spec => {
    //   const hasActive = spec.list.some(item => item.isActive)
    //   if (!hasActive) {
    //     const ele = spec.list.find(item => !item.isActive && !item.isDisabled)
    //     if (ele) {
    //       ele.isActive = true
    //       activeSpecMap[ele.code] = ele
    //     }
    //   }
    // })

    const activeSkuInfo = this.watchProductChoose(activeSpecMap)

    this.setData({
      specGroup,
      activeSpecMap,
      activeSkuInfo,
    })
  },
  // 判断是否选中商品
  watchProductChoose(activeSpecMap) {
    const { specGroup } = this.data;
    const chosenList = Object.values(activeSpecMap).map(item => item.skuList)
    if (chosenList.length < specGroup.length) return {}

    const result = chosenList.reduce((a, b) => {
      return a.filter(c => b.includes(c))
    })
    if (!result.length) return {}

    const activeId = result[0]
    const activeSkuInfo = json.specs.find(ele => ele.id === activeId)

    return activeSkuInfo
  }
})
