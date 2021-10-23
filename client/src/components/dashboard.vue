<template>
  <div class="dashboard">
    <div class="date">令和３年８月２日</div>
    <div class="content-wrapper">
      <div class="graph" >
        <p 
          class="no-data"
          v-if="show_msg"
        >まだレコードがありません</p>
        <Doughnut v-bind:today="today_records"/>
        <div class="table-container">
          <table class="table">
            <tr>
              <th class="theader">language</th>
              <th class="theader">time</th>
            </tr>
            <tr 
              v-for="el in today_records" 
              v-bind:key="el.id"
            >
              <td>{{el.language}}</td>
              <td>{{el.study_time}} Hours</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="weekly">
        <Bar style="width:400px;margin:0 auto;" v-bind:weekly="weekly_records"/>
      </div>
    </div>
  </div>
</template>

<script>
import Doughnut from './doughnuts.chart.vue';
import Bar from './Bar.chart.vue';
import dashboardService from '../modules/dashboardService.js';

export default {
  name:'dashboard',
  data(){
    return {
      all_records:[],
      today_records:[],
      weekly_records:[],
      show_msg:false
    }
  },
  components:{
    Doughnut,
    Bar,
  },
  async mounted(){
    try{
      //一週間分のデータ
      let response = await dashboardService.getRecord();

      //分割代入
      let {timer,todo} = response;

      //データ代入
      timer.forEach(el=>{
        this.all_records.push(el);
      });

      todo.forEach(el=>{
        this.all_records.push(el);
      })

      //aggregate records
      this.weekly_records =  dashboardService.aggregate_weekly(this.all_records);
      this.today_records =  dashboardService.aggregate_today(this.all_records);
      console.log('today')
      console.log(this.today_records)
      if(!this.today_records[0]){
        this.show_msg = true;
      }
    }catch(e){
      console.log(e)
    }
  }
}
</script>

<style scoped>
/* dashboard */
.dashboard{
  flex: 1;
  padding-bottom: 30px;
}

.date{
  text-align: center;
  margin-top: 15px;
}

.table {
  width:350px;
  margin:15px auto;
  text-align:center;
}

.theader {
  color:dimgray;
  text-decoration:underline;
}

.no-data {
  margin-left:110px;
  color:#ff6d00;
}

/* Extra Small device (desktop, less than 576px) */
@media (max-width:575px) {
  .graph{
    width:80%;
    height: 600px;
    margin:0 auto;
  }  
  .weekly{
    width:80%;
    height: 400px;
    margin:0 auto 100px;
  }  
}

/* Small devices (desktops, 576px and up) */
@media (min-width: 576px) and (max-width: 768px) {
  .graph{
    width:80%;
    height: 600px;
    margin: 5px auto;
  }
  .weekly{
    width:80%;
    height:400px;
    margin:0 auto 100px auto;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 850px){
  .graph{    
    width:80%;
    height: 600px;
    margin: 5px auto;
  }
  .weekly{
    height:450px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 850px) and (max-width: 1200px){  
  .graph{
    width:80%;
    height: 600px;
    margin: 5px auto;
  }
  .weekly{
    height:450px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .dashboard{
    height:calc(100vh - 45px);
  }
  .content-wrapper{
    width:1200px;
    margin: 0 auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 48%);
    grid-template-rows: repeat(5,143px);
    gap:10px 20px;
  }
  .graph {
    grid-column: 1;
    grid-row: 1/5;
  }
  .weekly {
    grid-column: 2;
    grid-row: 2/4;
  }
}
</style>