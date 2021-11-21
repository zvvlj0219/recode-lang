<script>
import { Bar } from 'vue-chartjs';
export default {
  extends:Bar,
  props:{
    weekly:{
      type:Array,
      required:true,
    }
  },
  watch:{
    weekly(){
      this.render();
    }
  },
  methods:{
    render(){
      let today = new Date();
      let day = today.getDay();
      let week = [];
      let labels = [];

      //for label
      for(let i=0;i<7;i++){
        let res = new Date()
        res.setFullYear(today.getFullYear());
        res.setMonth(today.getMonth());
        res.setDate(today.getDate()-day+i);
        week.push(res)
      }

      //label
      labels = week.map(el=>{
        let month = el.getMonth();
        let date = el.getDate();
        return `${month+1}/${date}`
      })
      
      //label
      const data = {
        labels:[
          `${labels[0]}Sun`,
          `${labels[1]}Mon`,
          `${labels[2]}Tue`,
          `${labels[3]}Wed`,
          `${labels[4]}Thu`,
          `${labels[5]}Fri`,
          `${labels[6]}Sat`
        ],
        datasets: [
          {
            label:'weelky record',
            //data array
            data:this.weekly.map(el=>{
              return el.study_time;
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            weight:1,
            hoverOffset: 1
          }
        ]
      };

      const options = {
        responsive: true,
        legend: {
          display:false
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10,
              stepSize: 1,
              callback:function (value) {
                return  `${value}Hours`;
              }
            }
          }]
        },
        title: {
          display: true,
          text: "Weekly record",
          fontSize: 18,
          position: 'top'
        },
      };
      this.renderChart(data,options)
    }
  }
}
</script>