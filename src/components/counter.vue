<template>
    <div>
        <v-layout v-if="loaded">
            <v-flex shrink>
                <p class="regular-text__bold paragraph timer-text">{{displayHours}}</p>
            </v-flex>
            <v-flex shrink>
                <p class="regular-text__bold paragraph timer-text">:</p>
            </v-flex>
            <v-flex shrink>
                <p class="regular-text__bold paragraph timer-text">{{displayMinutes}}</p>
            </v-flex>
            <v-flex shrink>
                <p class="regular-text__bold paragraph timer-text">:</p>
            </v-flex>
            <v-flex shrink>
                <p class="regular-text__bold paragraph timer-text">{{displaySeconds}}</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'counter-timer',
    // props: ['year', 'month', 'date', 'hour', 'minute', 'second', 'milisecond'],
    props: ['start_date', 'exp_date'],
    data(){
        return{
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0, 
            loaded: false,
        }
    },
    created(){
        this.showRemaining()
    },
    methods:{
        formatNum(num){
            return num < 10 ? '0' + num : num
        },
        showRemaining(){
            const endDate = new Date(this.start.getTime() + (30 * 60 * 1000));

            const timer = setInterval(() => {
                const now = new Date();
                const distance = endDate.getTime() - now.getTime();

                if(distance < 0){
                    clearInterval(timer);
                    return;
                }

                const hours = Math.floor((distance % this._days) / this._hours)
                const minutes = Math.floor((distance % this._hours) / this._minutes)
                const seconds = Math.floor((distance % this._minutes) / this._seconds)
                this.displaySeconds = this.formatNum(seconds);
                this.displayMinutes = this.formatNum(minutes);
                this.displayHours = this.formatNum(hours);
                this.loaded = true;
            }, 1000)
        }
    },
    computed: {
        _seconds: () => 1000,
        _minutes(){
            return this._seconds * 60
        },
        _hours(){
            return this._minutes * 60
        },
        _days(){
            return this._hours * 24
        },
        start(){
            return new Date(this.start_date)
        }
    }
}
</script>

<style scoped>

</style>