//logs.js
import { formatTime } from '../../utils/util'

Page({
  data: {
    logs: [] as string[]
  },
  onShow() {
    this.setData!({
      logs: (wx.getStorageSync('logs') || []).map((log: number) => {
        return formatTime(new Date(log))
      })
    })
  },
})
