<script>
import { Doughnut } from 'vue-chartjs';
import _ from 'lodash';
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
      console.log('today records')
      console.log(this.today)
      const labels = this.today.map(el=>{
        return el.language;
      })

      const lodash_object = all_langs.filter(element=>{
        return _.findIndex(this.today, {'language': element.language}) !== -1 ;
      })
      const backgroundColor = lodash_object.map(el=>{
        return el.color;
      });
      
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
        responsive: false,
        cutoutPercentage: 70,
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: "Today's record",
          fontSize: 18,
          position: 'top'
        },
      };
      this.renderChart(data,options)

    }
  }
}
</script>