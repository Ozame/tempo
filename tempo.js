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
            this.timerIndex = 0
            this.currentTimer = this.timers[this.timerIndex].time
            this.resetIsDisabled = true
        },
        countdownFinished() {
            let audio = new Audio('assets/gong_3s.ogg')
            audio.play()
        },
        beep() {
            let audio = new Audio('assets/beep_1.ogg')
            audio.play()
        },
        submitTime() {
            this.currentTimer = this.timers[this.timerIndex].time
            this.toggleInputs()
        },
        toggleInputs() {
            let overlay = document.getElementById("input-overlay")
            if (overlay.style.display === "block") {
                overlay.style.display = "none"
            } else {
                overlay.style.display = "block"
            }
        }
    },
    data() {
        return {
            resetIsDisabled: true,
            timePassed: 0,
            hours: 0,
            minutes: 0,
            seconds: 5,
            currentTimer: 0,
            timerIndex: 0,
            timerInterval: null,
            looping: false,
            timers: [{
                    name: "Work",
                    time: 5,
                    color: "#00f9ff"
                },
                {
                    name: "Rest",
                    time: 2,
                    color: "#bb2167"
                }
            ],
        }
    },
    computed: {
        timeLimit() {
            // return this.hours * 3600 + this.minutes * 60 + this.seconds
            return this.currentTimer
        },
        timerTitle() {
            return this.timers[this.timerIndex].name
            //TODO: Place this in a good spot on page
        },
        timeLeft() {
            const left = this.timeLimit - this.timePassed
            if ( 1 <= left && left <= 3) {
                console.log(left)
                this.beep()
            }
            if (left === 0 && this.timerInterval) {
                this.timerIndex++

                if (this.looping) {
                    if (this.timerIndex === this.timers.length) {
                        this.timePassed = 0
                        this.timerIndex = 0
                        this.currentTimer = this.timers[this.timerIndex].time
                    } else {
                        this.currentTimer = this.timers[this.timerIndex].time
                    }

                } else {
                    if (this.timerIndex === this.timers.length) {
                        this.clearTimer()
                        this.timePassed = 0
                        this.timerIndex = 0
                        this.currentTimer = null
                    } else {
                        this.currentTimer = this.timers[this.timerIndex].time
                    }
                }

                this.timePassed = 0
                this.countdownFinished()
            }
            return left
        }
    }

})

const ListTimer = {
    template: '<p>{{ formattedTime }}</p>',
    style: {
    },
    props: {
        time: {
            type: Number,
            required: true
        },
        name: {type: String,
            required: true},
        color: {type: String,
                required: false}
    },
    computed: {
        formattedTime() {
            return formatTime(this.time)
        }
    }
}



const Counter = {
    template: '<span>{{ formattedTimeLeft }}</span>',
    style: {

    },
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
            noHours = hours === "00"
            noMinutes = minutes === "00"
            return `${noHours ? '' : hours + ':'}${noHours && noMinutes ? '' : minutes + ':'}${seconds}`

        }

    },

}

VueApp.component('counter', Counter)
VueApp.component('list-timer', ListTimer)
VueApp.mount('#clock')


function formatTime(time) {
            let hours = Math.floor(time / 3600)
            let minutes = Math.floor((time / 60) % 60)
            let seconds = time % 60
            if (hours < 10) {
                hours = `0${hours}`
            }
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            if (seconds < 10) {
                seconds = `0${seconds}`
            }
            noHours = hours === "00"
            noMinutes = minutes === "00"
            return `${hours}:${minutes}:${seconds}`
}