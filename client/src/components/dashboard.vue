<template>
  <div class="dashboard">
    <div class="date">令和３年８月２日</div>
    <div class="content-wrapper">
      <div class="graph" >
        <Doughnut/>
      </div>
      <div class="weekly">weekly</div>
      <div class="monthly">monthly</div>
    </div>
  </div>
</template>

<script>
import Doughnut from './doughnuts.chart.vue';

export default {
  name:'dashboard',
  components:{
    Doughnut
  }
}
</script>

<style scoped>
/* dashboard */
.dashboard{
  background-color: yellowgreen;
  min-height: 100%;
  flex: 1;
  padding-bottom: 30px;
}

.date{
  background-color: darkseagreen;
  text-align: center;
  margin-bottom: 20px;
}

/* Extra Small device (desktop, less than 576px) */
@media (max-width:575px) {
  .graph,.weekly,.monthly{
    width:80%;
    height: 300px;
    margin: 5px auto;
  }

  .graph{
    height:500px;
  }
  
}

/* Small devices (desktops, 576px and up) */
@media (min-width: 576px) and (max-width: 768px) {
  .graph,.weekly,.monthly{
    width:80%;
    height: 300px;
    margin: 5px auto;
  }
  .graph{
    height:400px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 850px){
  .graph,.weekly,.monthly{    
    width:80%;
    height: 350px;
    margin: 5px auto;
  }
  .graph{
    height:600px;
  }

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 850px) and (max-width: 1200px){  
  .graph,.weekly,.monthly{
    width:80%;
    height: 350px;
    margin: 5px auto;
  }
  .graph{
    height:600px;
  }
  
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .content-wrapper{
    width:95%;
    /* 1224pxくらいになっている */
    height:95%;
    /* 657pxくらいになっている */
    margin: 0 auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 48%);
    grid-template-rows: repeat(4,145px);
    gap:10px 20px;
    background-color: lightskyblue;
  }
  .graph {
    grid-column: 1;
    grid-row: 1/5;
  }
  .weekly {
    background: hsl(60, 60%, 60%);
    grid-column: 2;
    grid-row: 1/3;
  }
  .monthly {
    background: hsl(180, 60%, 60%);
    grid-column: 2;
    grid-row: 3/5;
  
  }
}

</style>