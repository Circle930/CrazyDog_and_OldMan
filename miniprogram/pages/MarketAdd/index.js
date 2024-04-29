Page({
  //保存正在编辑的商品
  data: {
    title: '',
    desc: '',
    
    credit: 0,
    maxCredit: getApp().globalData.maxCredit,
    presetIndex: 0,
    presets: [{
        name:"无预设",
        title:"",
        desc:"",
    },{
        name:"薯片",
        title:"原味薯片！蕃茄味，黄瓜🥒味",
        desc:"咔嘣脆！凭此商品可以向对方索要薯片。建议售价5",
    },{
        name:"螺蛳粉券",
        title:"权限",
        desc:"凭此券可以在家里无视吃螺蛳粉。建议售价10",
    },{
        name:"夜宵券",
        title:"夜宵放开闸",
        desc:"凭此券可以让自己在夜里狂野干饭。建议售价10",
    },{
        name:"薯条券",
        title:"薯条券",
        desc:"凭此券可以让对方买次薯条！。建议售价10",
    },{
        name:"冰可乐",
        title:"冰可乐",
        desc:"凭此券可以让对方买一瓶冰可乐。建议售价10",
    },{
        name:"惊喜券！",
        title:"来自小狗或老头的一次惊喜",
        desc:"凭此券集齐三张可以让对方准备一次惊喜，六张一次大惊喜！建议售价20",
    },{
        name:"陪酒",
        title:"喝酒🍺",
        desc:"凭此券可以让对方陪你喝一次酒（最好还是第二天不上班TT）建议售价15。",
    },{
        name:"电影券",
        title:"🎦",
        desc:"凭此券可以让对方看一次自己喜欢的电影🎬。建议售价10",
    },{
        name:"洗洗券",
        title:"🩲",
        desc:"凭此券可以让对方洗一次贴身衣物。建议售价10",
    },{
        name:"老头出门券",
        title:"召唤",
        desc:"凭此券可以让老头陪小狗出门建议售价20。",
    }],
    list: getApp().globalData.collectionMarketList,
  },

  //数据输入填写表单
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  onCreditInput(e) {
    this.setData({
      credit: e.detail.value
    })
  },
  onPresetChange(e){
    this.setData({
      presetIndex: e.detail.value,
      title: this.data.presets[e.detail.value].title,
      desc: this.data.presets[e.detail.value].desc,
    })
  },

  //保存商品
  async saveItem() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 12) {
      wx.showToast({
        title: '标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.credit <= 0) {
      wx.showToast({
        title: '一定要有积分',
        icon: 'error',
        duration: 2000
      })
      return
    }else{
        await wx.cloud.callFunction({name: 'addElement', data: this.data}).then(
            () => {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 1000
                })
            }
        )
        setTimeout(function () {
            wx.navigateBack()
        }, 1000)
    }
  },

  // 重置所有表单项
  resetItem() {
    this.setData({
      title: '',
      desc: '',
      credit: 0,
      presetIndex: 0,
      list: getApp().globalData.collectionMarketList,
    })
  }
})