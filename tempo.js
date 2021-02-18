const Counter = {
    data() {
      return {
        time: 3600,
        timer: 0

      }
    },
    mounted() {
        
    },
    computed: {
        hours() {
            return this.minutes/60
        },
        minutes() {
            return this.timer/60
        },
        seconds() {
            return this.timer
        }
    },
    methods: {
        startTimer: () => {
            console.log("starting timer")>
           //Start timer here
        }
    }
  }
  
  Vue.createApp(Counter).mount('#clock')