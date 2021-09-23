<script>
import { Doughnut } from 'vue-chartjs';
import _ from 'lodash';
import all_langs from '../modules/languages.js';
export default {
  extends:Doughnut,
  data(){
    return {
      props:[
        {language:'JavaScript',study_time:1},
        {language:'React.js',study_time:2},
        {language:'Node.js',study_time:2},
      ],
      //1親コンポーネントからmongoDB から今日の分のデータを抽出しpropsで渡す、言語、時間
      //{language:'JavaScript',study_time:2}の形式で
    }
  },
  mounted () {
    const labels = this.props.map(el=>{
      return el.language;
    })

    const lodash_object = all_langs.filter(element=>{
      return _.findIndex(this.props, {'language': element.language}) !== -1 ;
    })
    const backgroundColor =  lodash_object.map(el=>{
      return el.color;
    });
    
    const study_time = this.props.map(el=>{
      return el.study_time;
    })

    const data = {
      labels:labels,
      datasets: [{
        label: 'My First Dataset',
        data: study_time,
        backgroundColor:backgroundColor,
        borderWidth:2,
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