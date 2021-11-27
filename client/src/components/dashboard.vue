<template>
  <section class="dashboard" >
    <h2 class="text-center text-lightcyan my-1">
      {{date}}
    </h2>
    <h3 
      class="norecordsmsg text-orange"
      v-if="norecords">本日のレコードがまだありません<br>「タイマー」または「ToDoリスト」でタスクをクリアしてダッシュボードに記録してください</h3>
    <div class="container grid" v-bind:class="{norecords : !today_records}">
      <div class="today" v-bind:class="{norecords : !today_records}">
        <Doughnut 
          v-bind:styles="pie_chart_styles"
          v-bind:today="today_records"
        />
      </div>
      <div class="table" v-if="today_records[0]">
        <table>
          <tr>
            <th>言語</th>
            <th>時間</th>
          </tr>
          <tr 
            v-for="el in today_records" 
            v-bind:key="el.id"
          >
            <td>{{el.language}}</td>
            <td>{{valid_time(el.study_time)}}</td>
          </tr>
        </table>
      </div>
      <div class="weekly">
        <Bar 
          v-bind:styles="bar_chart_styles"
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
      pieheight:400,
      piewidth:400,
      barheight:400,
      barwidth:400,
      windowWidth:window.innerWidth
    }
  },
  components:{
    Doughnut,
    Bar,
  },
  computed:{
    date(){
      let dt = new Date();
      let y = dt.getFullYear();
      let m = dt.getMonth();
      let d = dt.getDate();
      return `${y}年${m+1}月${d}日`;
    },
    pie_chart_styles(){
      return {
        height:`${this.pieheight}px`,
        width:`${this.piewidth}px`,
        margin:'0 auto'
      }
    },
    bar_chart_styles(){
      return {
        height:`${this.barheight}px`,
        width:`${this.barwidth}px`,
        margin:'0 auto'
      }
    }
  },
  watch:{
    windowWidth(){
      this.resize_charts();
    }
  },
  methods:{
    valid_time(time){
      if(time > 60){
        return `${Math.floor(time/60)} Hours ${time - 60} Minutes`
      }else{
        return `${time} Minutes`
      }
    },
    resize_charts(){
      const width = window.innerWidth;
      //exist record
      if (width < 576 && width > 400){
        this.pieheight = 400;
        this.piewidth = 400;
        this.barheight = 400;
        this.barwidth = 400;
      }else if (width < 400 && width > 300){
        this.pieheight = 300;
        this.piewidth = 300;
        this.barheight = 300;
        this.barwidth = 300;
      }else if (width < 300){
        this.pieheight = 200;
        this.piewidth = 200;
        this.barheight = 250;
        this.barwidth = 250;
      }
      //no records
      if(!this.today_records){
        this.pieheight = 150;
        this.piewidth = 150;
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
        const data = {
          language:el.language,
          study_time:el.study_time,
          timestamps:el.timestamps,
          _id:el._id
        }
        this.all_records.push(data);
      });

      todo.forEach(el=>{
        this.all_records.push(el);
      })
      //aggregate records
      this.weekly_records =  dashboardService.aggregate_weekly(this.all_records);
      this.today_records =  dashboardService.aggregate_today(this.all_records);
      if(!this.today_records[0]){
        this.norecords = true;
      }
    }catch(e){
      this.$store.dispatch('updateEmail',null);
      this.$store.dispatch('updateIdToken',null);
      this.$router.push('/login');
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
  min-height:1000px;
}

@media (min-height:1300px){
  .dashboard {
    min-height:1400px;
  }
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
</style>