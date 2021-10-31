<template>
  <section class="dashboard">
    <h2 class="text-center text-lightcyan my-1">令和３年８月２日</h2>
    <h3 
      class="norecords text-orange"
      v-if="norecords">まだレコードがありません</h3>
    <div class="container grid">
      <div class="today">
        <Doughnut 
          v-bind:styles="chart_styles"
          v-bind:today="today_records"
        />
      </div>
      <div class="table">
        <table>
          <tr>
            <th>language</th>
            <th>time</th>
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
      <div class="weekly">
        <Bar 
          v-bind:styles="chart_styles"
          v-bind:weekly="weekly_records"
        />
      </div>
    </div>
  </section>
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
      norecords:false,
      height:400,
      width:400,
    }
  },
  components:{
    Doughnut,
    Bar,
  },
  computed:{
    chart_styles(){
      return {
        height:`${this.height}px`,
        width:`${this.width}px`,
        margin:'0 auto'
      }
    }
  },
  methods:{
    resize_charts(){
      const width = window.innerWidth;
      if (width < 576 && width > 400){
        this.height = 400;
        this.width = 400;
      }else if (width < 400 && width > 300){
        this.height = 300;
        this.width = 300;
      }else if (width < 300){
        this.height = 200;
        this.width = 200;
      }
    }
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
        this.norecords = true;
      }
    }catch(e){
      console.log(e)
    }
  },
  created(){
    window.addEventListener('resize',this.resize_charts);
    this.resize_charts();
  },
  beforeDestroy(){
    window.addEventListener('resize',this.resize_charts);
  },
}
</script>

<style scoped>
.dashboard {
  min-height:950px;
}

.table {
  justify-self:center;
  align-self:flex-start;
  padding:5px;
}

.table th {
  text-decoration:underline;
  color:dimgray;
  padding:0 30px;
}

.table td {
  text-align:center;
  color:lightcyan;
}

.norecords {
  margin-left:130px;
}
</style>