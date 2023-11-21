import { defineStore } from "pinia"

export const useUTCTimerStore = defineStore("UTCTimer", {
  state: () => ({ timer: new Date() }),
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    update() {
      this.timer = new Date()
    },
  },
})
