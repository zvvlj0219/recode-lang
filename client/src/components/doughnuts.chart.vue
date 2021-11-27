<script>
import { Doughnut } from 'vue-chartjs';
import all_langs from '../modules/languages.js';
export default {
  extends:Doughnut,
  props:{
    today:{
      type:Array,
      required:true,
    },
  },
  watch:{
    today(){
      this.render();
    }
  },
  methods:{
    render(){
      //label
      const labels = this.today.map(el=>{
        return el.language;
      })
      //background color
      let backgroundColor = [];
      this.today.forEach(data=>{
        let colorIndex;
        all_langs.forEach((lang,index)=>{
          if(lang.language == data.language){
            colorIndex = index;
          }
        })
        backgroundColor.push(all_langs[colorIndex].color)
      })
      
      //study_time data
      const study_time = this.today.map(el=>{
        return el.study_time;
      })

      const data = {
        labels:labels,
        datasets: [{
          data: study_time,
          backgroundColor:backgroundColor,
          borderWidth:2,
          borderColor:'lightgrey',
          weight:1,
          hoverOffset: 4
        }]
      };

      const options = {
        responsive: true,
        cutoutPercentage: 70,
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: "今日の記録",
          fontSize: 18,
          position: 'top'
        },
      };
      this.renderChart(data,options)
    }
  }
}
</script>

<style scoped>
#doughnut-chart {
  margin:0 auto;
}
</style>