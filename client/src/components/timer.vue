<template>
  <div class="router-content">
    <div class="timer" >
      <div class="clock-wrapper">
        <div class="outer-circle"></div>
        <div class="inner-circle"></div>
      </div>
      <div class="start">start</div>
    </div>
    <div class="recode-wrapper">
      <p>過去の記録</p>
      <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
      </ul>
      <div class="recode"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'timer',
  data(){
    return {
      language:'JavaScript',
      timer:30,
    }
  }
}
</script>

<style scoped>
.router-content {
  border-radius:2%;
}

.clock-wrapper {
  margin:0 auto;
  width:90%;
  height:90%;
  position:relative;
  background-color:skyblue;
}

.outer-circle {
  position:absolute;
  top:50px;
  left:35px;
  width:350px;
  height:350px;
  border-radius:50%;
  background-color:lightgreen;
}
.inner-circle {
  position:absolute;
  top:75px;
  left:60px;
  width:300px;
  height:300px;
  border-radius:50%;
  background-color:lightyellow;

}




.timer {
  background-color:rgba(211,211,211,0.5);
  border-radius:2%;
}

.recode-wrapper {
  background-color:rgba(144,238,144,0.5);
  border-radius:4%;
}


@media (max-width:576px) {
  .router-content {
    height:100vh;
    margin:15px 10px;
  }

  .timer {
    height:480px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);

  }

  .recode-wrapper {
    margin-top:10px;
    height:250px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }
}

@media (min-width:576px) and (max-width:767px) {
  .router-content {
    height:100%;
    margin:15px 10px;
  }

  .timer {
    height:480px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
 
  }

  .recode-wrapper {
    margin-top:10px;
    height:250px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }

}

@media (min-width:768px) and (max-width:991px) {
  .router-content {
    height:100%;
    margin:15px 10px;
  }

  .timer {
    height:480px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }

  .recode-wrapper {
    margin-top:10px;
    height:300px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  }


}

@media (min-width:992px) and (max-width:1199px)  {
  .router-content{
    width:95%;
    height:80%;
    margin:20px auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 31%);
    grid-template-rows: repeat(6,110px);
    gap:10px 20px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  }

  .timer {
    grid-column: 1/3;
    grid-row: 1/6;
  }
  
  .recode-wrapper {
    grid-column: 3;
    grid-row: 1/4;
  }


}

@media (min-width:1200px) and (max-width:1399px)  {
  .router-content{
    width:95%;
    height:80%;
    margin:20px auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 31%);
    grid-template-rows: repeat(6,110px);
    gap:10px 20px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);

  }

  .timer {
    grid-column: 1/3;
    grid-row: 1/6;
  }
  
  .recode-wrapper {
    grid-column: 3;
    grid-row: 1/4;
  }

}
@media (min-width:1400px) {
  .router-content{
    width:1100px;
    height:80%;
    margin:20px auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 31%);
    grid-template-rows: repeat(6,110px);
    gap:10px 20px;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }


  .timer {
    grid-column: 1/3;
    grid-row: 1/6;
  }
  
  .recode-wrapper {
    grid-column: 3;
    grid-row: 1/4;
  }
}


</style>