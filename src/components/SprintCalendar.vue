<template>
  <div class='SprintCalendar'>
    <h1>{{ todayNow | moment("dddd, MMMM Do YYYY") }}</h1>
    <div class='container'>
      <div class='row'>
        <div id='app'>
          <div class='table-responsive'>
          <table class='table fixed'>
            <thead>
              <tr class='t-head'>
                <th></th>
                <th v-for="day in monthlyCal.thead" :key="day.num"><div :class="{ 'weekend': day.day == 'X', 'today' : day.num == parseDay, 'start' : day.num == sprintStart, 'end' : day.num == sprintEnd }"><div class="d-day">{{day.day}}</div><br><div class="digit">{{day.num}}</div></div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="day in monthlyCal.content" :key="day.num" class='t-content'>
                <td class=''>-</td>{{day}}
              </tr>
              <tr v-for="member in teamMembers" :key="member.name">
                <div class="member">{{member.name}}</div>
                <td v-for="day in member.task" :key="day.num">
                  <button v-show="day!=='X'" :av="member.name" :ax="day" v-on:click="tsingal(member.name,day)">{{day}}</button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
/* eslint-disable */
export default {
  name: 'SprintCalendar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      todayNow: new moment,
      month: moment(this.todayNow).month() + 1, 
      year: moment(this.todayNow).year(),
      startOfMonth: moment(this.todayNow).startOf('month'),
      endOfMonth: moment(this.todayNow).endOf('month'),
      dayWord: '',
      parseDay: moment(this.todayNow).format('D'),
      sprintStart: 12,
      sprintEnd: 23,
      monthlyCal: {
        'thead': [],
        'tcontent': []
      },
      teamMembers: [
        {name: 'HW', task: []},
        {name: 'JC', task: []},
        {name: 'PB', task: []},
        {name: 'GH', task: []},
        {name: 'KK', task: []},
        {name: 'SR', task: []},
        {name: 'JH', task: []},
        {name: 'BC', task: []},
        {name: 'AM', task: []}
      ]
    }
  },
  methods: {
    tsingal (e1,e2) {
      console.log(e1,e2)
    },
    initCal () {
        let month = this.todayNow.format('MMMM')

        for(var i = this.startOfMonth.date(); i <= this.endOfMonth.date();i++){
          switch (this.startOfMonth.day()) {
            case 0:
              this.dayWord = 'Sun'
              break
            case 1:
              this.dayWord = 'Mon'
              break
            case 2:
              this.dayWord = 'Tue'
              break
            case 3:
              this.dayWord = 'Wed'
              break
            case 4:
              this.dayWord = 'Thu'
              break
            case 5:
              this.dayWord = 'Fri'
              break
            case 6:
              this.dayWord = 'Sat'
              break
            default:
              console.log('day error')
          }
          if (this.dayWord == 'Sat' || this.dayWord == 'Sun') {
            this.monthlyCal.thead.push({'day':'X'})
            this.monthlyCal.tcontent.push({'y':this.year ,'m':this.month})
          } else {
            this.monthlyCal.thead.push({'day':this.dayWord,num:i})
            this.monthlyCal.tcontent.push({'y':this.year ,'m':this.month,'d':i})
          }
          this.startOfMonth.add(1,'days')
        }
        for (let i = 0; i < this.teamMembers.length; i++) {
          const element = this.teamMembers[i]
          console.log(element)
          for (let y = 0; y < this.monthlyCal.thead.length; y++) {
            console.log(this.monthlyCal.thead[y].day == 'X')
            if (this.monthlyCal.thead[y].day == 'X') {
              element.task.push('X')
            } else {
              element.task.push(y)
            }
          }
        }
    }
  },
  created() {
    this.initCal()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.table {
  width: 100%;
}
.t-head {
  height: 100px;
}
.today {
  position: relative;
}
.today:before {
  position: absolute;
  top: -4em;
  left: 0;
  z-index: 0;
  height: 95vh;
  width: 4.2em;
  content: ' ';
  background:#ffff33;
  z-index: -2;
  opacity: 0.2;
}
.mid {
  background: lightblue;
}
/* different for weekends  */
.weekend {
  visibility: hidden;
  opacity: 0;
}
.start {
  position: relative;
}
.start:before {
  position: absolute;
  top: -2em;
  left: 0;
  z-index: 0;
  height: 90vh;
  width: 4em;
  border-radius: 3em;
  content: ' ';
  background: #ccc;
  z-index: -2;
}
.end {
  position: relative;
}
.end:before {
  position: absolute;
  top: -2em;
  left: 0;
  z-index: 0;
  height: 90vh;
  width: 4em;
  border-radius: 3em;
  content: ' ';
  background: #ccc;
  z-index: -2;
}
.member {
  font-size: 1.4em;
  width: 2em;
  height: 2em;
  margin: 0.2em 0;
  padding: 0.6em;
  border-radius: 2em;
  background: #000;
  line-height: 2em;
  border: 1px solid #000;
  color: #fff;
}
td button {
  opacity: 0.5;
  background: #fff;
  outline: 0;
  width: 4em;
  height: 4em;
  border-radius: 2em;
  border: 1px solid #000;
}
td button:hover {
  background: #ccc;
  content: "+";
  color: #fff;
  cursor: pointer;
}
.d-day {
  font-size: 1em;
  position: relative;
}
.d-day:before {
  position: absolute;
  width: 2em;
  height: 1px;
  background: #000;
  content: ' ';
  top: 1.2em;
}
.digit {
  font-size: 2em;
  line-height: 0.1em;
}
</style>
