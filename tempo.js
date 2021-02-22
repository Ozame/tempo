const VueApp = Vue.createApp({
    methods: {
        startTimer() {
            if (!this.timerInterval && this.timeLimit > 0) {
                this.timerInterval = setInterval(() => (this.timePassed++), 1000)
                this.resetIsDisabled = false
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
            this.resetIsDisabled = true
        },
        countdownFinished() {
            let audio = new Audio('assets/gong.mp3')
            audio.play()
        }
    },
    data() {
        return {
            resetIsDisabled: true,
            timePassed: 0,
            hours: 0,
            minutes: 0,
            seconds: 5,
            timerInterval: null,
            looping: false

        }
    },
    computed: {
        timeLimit() {
            return this.hours * 3600 + this.minutes * 60 + this.seconds
        },
        timeLeft() {
            const left = this.timeLimit - this.timePassed
            if (left <= 0) {
                if (!this.looping) {
                    this.clearTimer()
                }
                this.timePassed = 0
                this.countdownFinished()
            }
            return left
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