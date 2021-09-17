<template>
  <div class="router-content">
    <div class="timer" >
      <div class="clock-wrapper">
        <div class="outer-circle"></div>
        <div class="inner-circle"></div>
        <transition
          v-bind:css="false"
          v-if="clockEvent"

          v-on:enter="enter"
          v-on:after-enter="afterEnter"

          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
        >
          <div class="inner-circle"></div>
        </transition>
      </div>
    </div>
    <div class="timerComponent_container">
      <timerComponent/>
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
import timerComponent from './timerComponent';

export default {
  name:'timer',
  data(){
    return {
      language:'JavaScript',
      timer:30,
    }
  },
  components:{
    timerComponent,
  }
}
</script>

<style scoped>
/*transition*/
.clock-enter,.clock-leave-to {
  position:absolute;
  top:75px;
  left:60px;
  width:300px;
  height:300px;
  border-radius:50%;
  background-color:lightyellow;
  z-index: 2;

}

.clock-enter-active,.clock-leave-active {
  transform: scale(1.2);

}

.clock-enter-to,.clock-leave {
  position:absolute;
  top:75px;
  left:60px;
  width:300px;
  height:300px;
  border-radius:50%;
  background-color:lightyellow;
  z-index: 2;

}


</style>

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
  z-index: 1;
}
.inner-circle {
  position:absolute;
  top:75px;
  left:60px;
  width:300px;
  height:300px;
  border-radius:50%;
  background-color:lightyellow;
  z-index: 2;
  transition: transform 0.5s ease;

}




.timer {
  background-color:rgba(211,211,211,0.5);
  border-radius:2%;
}

.timerComponent_container {
  background-color:lightgrey;
  border-radius:4%;
}

.timerComponent {
  margin:0 auto;
}

.recode-wrapper {
  background-color:rgba(144,238,144,0.5);
  border-radius:4%;
}


@media (max-width:576px) {
  .router-content {
    height:100vh;
    width:100%;
    margin:15px 10px;
  }

  .timer {
    height:450px;
    width:95%;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);

  }

  .timerComponent_container {
    height:200px;
    width:95%;
  }

  .timerComponent {
    width:350px;
  }

  .recode-wrapper {
    margin-top:10px;
    height:250px;
    width:95%;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }
}

@media (min-width:576px) and (max-width:767px) {
  .router-content {
    height:100%;
    width:100%;
    margin:15px 10px;
  }

  .timer {
    height:480px;
    width:95%;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
 
  }

  .timerComponent_container {
    height:200px;
    width:95%;
  }

  .timerComponent {
    width:310px;
  }

  .recode-wrapper {
    margin-top:10px;
    height:250px;
    width:95%;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }

}

@media (min-width:768px) and (max-width:992px) {
  .router-content {
    height:100%;
    width:100%;
    margin:15px 10px;
  }

  .timer {
    height:480px;
    width:97%;
    box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  
  }

  .timerComponent_container {
    height:200px;
    width:97%;
  }

  .timerComponent {
    width:400px;
  }

  .recode-wrapper {
    margin-top:10px;
    height:300px;
    width:97%;
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
@media (min-width:1300px) {
  .router-content{
    width:1000px;
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