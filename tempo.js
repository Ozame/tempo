const VueApp = Vue.createApp({
    methods: {
        startTimer() {
            console.log("starting timer")
            if (!this.timerInterval) {
                this.timerInterval = setInterval(() => (this.timePassed++), 1000)
            } else {
                this.clearTimer()
            }
            //Start timer here
        },
        clearTimer() {
            clearInterval(this.timerInterval)
            this.timerInterval = null
        },
        countdownFinished() {
            console.log("Countdown done!")
        }
    },
    data() {
        return {
            timePassed: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            timerInterval: null,
            looping: false

        }
    },
    computed: {
        timeLeft() {
            const timeLimit = this.hours * 3600 + this.minutes * 60 + this.seconds
            const left = timeLimit - this.timePassed
            if (left < 0) {
                if (!this.looping) {
                    this.clearTimer()
                }
                this.timePassed = 0
                this.countdownFinished()
            }
            return timeLimit - this.timePassed
        }
    }

})

const Counter = {
    template: '{{ formattedTimeLeft }}',
    props: {
        timeLeft: {
            type: Number,
            required: true
        }
    },

    computed: {
        formattedTimeLeft() {
            const timeLeft = this.timeLeft
            let hours = Math.floor(this.timeLeft / 3600)
            let minutes = Math.floor((this.timeLeft / 60) % 60)
            let seconds = timeLeft % 60
            if (hours < 10) {
                hours = `0${hours}`
            }
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            if (seconds < 10) {
                seconds = `0${seconds}`
            }
            return `${hours}:${minutes}:${seconds}`
        }

    },

}

VueApp.component('counter', Counter)
VueApp.mount('#clock')