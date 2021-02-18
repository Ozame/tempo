const Counter = {
    data() {
      return {
        timer: 0
      }
    },
    mounted() {
        setInterval(() => {
          this.timer++
        }, 1000)
    }
  }
  
  Vue.createApp(Counter).mount('#clock')