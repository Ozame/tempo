const VueApp = Vue.createApp({
    methods: {
        startTimer() {
            if (!this.timerInterval) {
                this.timerInterval = setInterval(() => (this.timePassed++), 1000)
                this.timerHasStarted = true
            } else {
                this.clearTimer()
            }
        },
        clearTimer() {
            clearInterval(this.timerInterval)
            this.timerInterval = null
        },
        resetTimer() {
            this.clearTimer()
            this.timePassed = 0
            this.timerHasStarted = false
        },
        countdownFinished() {
            let audio = new Audio('assets/gong.mp3')
            audio.play()
        }
    },
    data() {
        return {
            timerHasStarted: false,
            timePassed: 0,
            hours: 0,
            minutes: 0,
            seconds: 5,
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
                    this.timerHasStarted = false
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