<template>
  <div class="router-content">
    <div class="timer" >
      <div class="clock-wrapper">
        <div class="outer-circle"></div>
        <div class="inner-circle">
          <div class="circle-content">
            <div class="selected_lang">{{selected_lang}}</div>
            <div class="lang_logo">ロゴ:{{selected_lang}}</div>
            <div class="config_lang">
              <ModalComponent>
                <template v-slot:title>
                  <div>ここに歯車</div>
                </template>
                <template v-slot:modal>
                  <div>
                    <ul class="radio-wrapper">
                      <li 
                        class="radio-list"
                        v-for="lang in all_langs"
                        v-bind:key="lang.language"
                      >
                        <input  
                          type="radio" name="lang"
                          v-model="selected_lang"
                          v-bind:id="lang.language"
                          v-bind:value="lang.language"
                        >
                        <label 
                          v-bind:for="lang.language"
                        >{{lang.language}}</label>
                      </li>
                    </ul>
                  </div>
                </template>
              </ModalComponent>
            </div>
          </div>
        </div>
        <transition
          v-bind:css="false"
          v-if="clockEvent"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          appear
        >
          <div class="dummy-circle"></div>
        </transition>
      </div>
    </div>
    <ModalComponent>
      <template v-slot:title>
        <div class='timer_text'>
          <div v-show="!clockEvent" class="setted_time">
            <div v-if="setted_hour !== '00'">
              {{setted_hour}}:{{setted_minute}}:00
            </div>
            <div v-else>
              {{setted_minute}}:00
            </div>
          </div>
          <div v-show="clockEvent" class="time_left">{{time_left}}</div>
        </div>
      </template>
      <template v-slot:modal>
        <div>アラーム: 
          <select 
            class ='select_hour'
            v-model="setted_hour"
          >
            <option 
              v-for="i in 21"
              v-bind:key="i"
            >
            {{i-1 | adjustDigit}}
            </option>
          </select>
          <span>時間</span>
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
          <span>分</span>
        </div>
      </template>
    </ModalComponent>
    <div class="button-wrapper">
      <div 
        class="btn start_btn"
        v-show="!clockEvent"
        v-on:click="startTimer();clockEvent = true;"
      >start</div>
      <div 
        class="btn cancel_btn"
        v-show="clockEvent"
        v-on:click="cancelTimer();clockEvent = false;"
      >cancel</div>
    </div>
    <div class="recode-wrapper">
      <p>過去の記録</p>
      <ul>
        <li 
          v-for="record in past_record"
          v-bind:key="record._id"
        >
          {{record.language}}:
          {{Math.floor(record.study_time)}}時間{{record.study_time*60}}分:
          {{new Date(record.timestamps).getMonth()+1}}月{{new Date(record.timestamps).getDate()}}日
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ModalComponent from './ModalComponent';
import all_langs from '../modules/languages.js';
import timerService from '../modules/timerService.js';

export default {
  name:'timer',
  data(){
    return {
      selected_lang:'Node.js',
      all_langs:all_langs,
      clockEvent:false,
      setted_hour:'00',
      setted_minute:'25',
      time_left:'',
      timeoutId:null,
      past_record:[]
    }
  },
  components:{
    ModalComponent
  },
  async created(){
    try{
      this.past_record = await timerService.getTime();
    }catch(e){
      console.log(e)
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
  methods:{
    beforeEnter(el){
      el.style.transform = 'scale(1)';
    },
    enter(el,done){
      let scale = 1;
      const intervalId = setInterval(()=>{
        el.style.transform = `scale(${scale})`;
        scale += 0.03;
        if(scale > 1.17){
          clearInterval(intervalId);
          done();
        }
      },30)
    },
    startTimer(){
      console.log(this.setted_hour,this.setted_minute);
      this.clockEvent = true;
      //開始時間
      let startTime = Date.now();
      if(this.study_time == '00:00:00' || this.study_time == '00:00'){
        this.clockEvent = false;
      }else{
        this.countDown(startTime);
      }
    },
    countDown(startTime){
      //イベントループ
      this.timeoutId = setTimeout(()=>{
        this.countDown(startTime);
      },1000);

      if(this.time_left == '00:00:00' || this.time_left == '00:00'){
        clearTimeout(this.timeoutId);
        this.addRecord();
        this.clockEvent = false;
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
      if(h == '00'){
        this.time_left = `${m}:${s}`
      }else{
      this.time_left = `${h}:${m}:${s}`;
      }
    },
    cancelTimer(){
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.clockEvent = false;
    },
    async addRecord(){
      try{
        const setted_time = Number(this.setted_hour + this.setted_minute/60);
        await timerService.insertTime(this.selected_lang,setted_time);
      }catch(e){
        console.log(e);
      }
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
  z-index: 3;
  display:flex;
  justify-content:center;
  align-items:center;
}
.dummy-circle {
  position:absolute;
  top:75px;
  left:60px;
  width:300px;
  height:300px;
  border-radius:50%;
  background-color:lightyellow;
  z-index: 2;
}

.circle-content {
  width:200px;
  height:200px;
}

.radio-wrapper {
  list-style:none;
}

.timer {
  background-color:rgba(211,211,211,0.5);
  border-radius:2%;
}

.timerComponent_container {
  background-color:lightgrey;
  border-radius:4%;
}

.button-wrapper {
  width:200px;
  margin:0 auto;
}

.recode-wrapper {
  background-color:rgba(144,238,144,0.5);
  border-radius:4%;
}


@media (max-width:576px) {
  .router-content {
    height:100%;
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