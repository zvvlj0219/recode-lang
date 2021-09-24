<script>
import { Doughnut } from 'vue-chartjs';
import _ from 'lodash';
import all_langs from '../modules/languages.js';
export default {
  extends:Doughnut,
  data(){
    return {
      mongo:[
        {language:'JavaScript',study_time:1},
        {language:'React.js',study_time:2},
        {language:'Node.js',study_time:2},
      ],
      //1親コンポーネントからmongoDB から今日の分のデータを抽出しpropsで渡す、言語、時間
      //{language:'JavaScript',study_time:2}の形式で
    }
  },
  props:{
    study_data:Object
  },
  mounted(){
    const labels = this.mongo.map(el=>{
      return el.language;
    })

    const lodash_object = all_langs.filter(element=>{
      return _.findIndex(this.mongo, {'language': element.language}) !== -1 ;
    })
    const backgroundColor =  lodash_object.map(el=>{
      return el.color;
    });
    
    const study_time = this.mongo.map(el=>{
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
</script>