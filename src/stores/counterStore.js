import { defineStore } from "pinia"
 
export default defineStore("counter", {
  state() {
    return {
      count: 0,
    }
  },
  getters: {
    getCount(state) {
      return state.count
    }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})