<template>
  <div class="timerComponent">
    <div class='timer_text'>
      <p  v-show="!active" class="setted_time">{{study_time}}</p>
      <p  v-show="active" class="time_left">{{time_left}}</p>
    </div>
    <form class="timer_form">
      <div>アラーム: 
        <select 
          class ='select_hour'
          v-model="setted_hour"
        >
          <option 
            v-for="n in 21"
            v-bind:key="n"
          >
          {{n-1 | adjustDigit}}
          </option>
        </select>
        <select 
          class ='select_minute'
          v-model="setted_minute"
        >
          <option 
            v-for="n in 60"
            v-bind:key="n"
          >
          {{n-1 | adjustDigit}}
          </option>
        </select>
      </div>
    </form>
    <div 
      class="start_btn"
      v-show="!active"
      v-on:click="startTimer"
    >start</div>
    <div 
      class="cancel_btn"
      v-show="active"
      v-on:click="cancelTimer"
    >cancel</div>
    <div 
      class="pause_btn"
      v-show="active"
      v-on:click="cancelTimer"
    >pause</div>
  </div>
</template>

<script>
export default {
  name:'timerComponent',
  data(){
    return {
      setted_hour:'00',
      setted_minute:'00',
      study_time:'00:00:00',
      time_left:'',
      active:false,
      timeoutId:null
    }
  },
  filters:{
    adjustDigit(number){
      if(number < 10){
        return `0${number}`;
      }
      return number;
    }
  },
  watch:{
    setted_hour(){
      this.study_time = `${this.setted_hour}:${this.setted_minute}:00`;
    },
    setted_minute(){
      this.study_time = `${this.setted_hour}:${this.setted_minute}:00`;
    }
  },
  methods:{
    startTimer(){
      this.active = true;
      //開始時間
      let startTime = Date.now();
      this.countDown(startTime);
    },
    countDown(startTime){
      //イベントループ
      this.timeoutId = setTimeout(()=>{
        this.countDown(startTime);
        console.log('settimeout')
      },1000);

      if(this.time_left == '00:00:00'){
        clearTimeout(this.timeoutId);
        this.addRecord();
        this.active = false;
      }

    
      //経過時間
      let elapsed_time = Date.now() - startTime;

      //設定した時間 ミリ秒に直す
      let setted_time = `${this.setted_hour*3600 + this.setted_minute*60}000`;
      //残り時間を算出
      let left = new Date(setted_time - elapsed_time + 300);
      let h = String(left.getHours()-9).padStart(2,'0');
      let m = String(left.getMinutes()).padStart(2,'0');
      let s = String(left.getSeconds()).padStart(2,'0');
      this.time_left = `${h}:${m}:${s}`;
    },
    cancelTimer(){
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.active = false;
    },
    addRecord(){
      console.log('ok')
    }
  }
}
</script>