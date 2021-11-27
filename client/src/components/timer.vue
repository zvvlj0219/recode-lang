<template>
  <section class="timer">
    <div class="container grid text-lightcyan" >
      <div class="clock">
        <div class="outer-circle"></div>
        <div class="inner-circle">
          <div class="circle-content">
            <div class="selected_lang">{{selected_lang}}</div>
            <div
              class="logo_img"
            >
              <img 
                v-bind:src="srcurl"
                v-bind:alt="selected_lang"
              >
            </div>
            <div class="config_lang">
              <ModalComponent>
                <template v-slot:title>
                  <font-awesome-icon 
                    icon="cog" 
                    class="font-cog"
                  />
                </template>
                <template v-slot:modal>
                  <div class="radio-wrapper">
                    <ul >
                      <li 
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
      <div class="time-management">
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
            <div>設定時間: 
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
          >スタート</div>
          <div 
            class="btn cancel_btn"
            v-show="clockEvent"
            v-on:click="cancelTimer();clockEvent = false;"
          >中止</div>
        </div>
      </div>
      <div class="record-wrapper">
        <p class="text-center">過去の記録</p>
        <ul>
          <li 
            v-for="record in past_record"
            v-bind:key="record._id"
          >
            {{record.language}}&nbsp;&nbsp;
            {{Math.floor(record.study_time / 60)}}時間{{record.study_time}}分&nbsp;&nbsp;
            {{new Date(record.timestamps).getMonth()+1}}月{{new Date(record.timestamps).getDate()}}日
          </li>
        </ul>
      </div>
    </div>
  </section>
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
  computed:{
    srcurl(){
      return require(`../assets/${this.selected_lang}.png`);
    }
  },
  components:{
    ModalComponent
  },
  async created(){
    try{
      this.init();
    }catch(e){
      this.$store.dispatch('updateEmail',null);
      this.$store.dispatch('updateIdToken',null);
      this.$router.push('/login');
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
        if(scale > 1.21){
          clearInterval(intervalId);
          done();
        }
      },20)
    },
    async init(){
      this.past_record = await timerService.getTime();
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

      if(this.time_left == '00:00:00' || this.time_left == '00:00' || this.time_left < 0){
        clearTimeout(this.timeoutId);
        this.addRecord();
        this.clockEvent = false;
        this.init();
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
        //分で管理
        let setted_time = Number(this.setted_hour*60 + this.setted_minute);
        console.log(setted_time)
        await timerService.insertTime(this.selected_lang,setted_time);
      }catch(e){
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
/*pc*/
.timer .grid{
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(4,1fr);
  height:100vh;
}

/*clock style*/
.clock{
  width:600px;
  height:600px;
  grid-column: 1;
  grid-row: 1 / 5;
  position:relative;
  justify-self:center;
  align-self:flex-start;
}

.outer-circle {
  position:absolute;
  top:75px;
  left:75px;
  width:450px;
  height:450px;
  border-radius:50%;
  background-color:skyblue;
  z-index: 1;
}
.inner-circle {
  position:absolute;
  top:100px;
  left:100px;
  width:400px;
  height:400px;
  border-radius:50%;
  background-color:#495057;
  z-index: 3;
  display:flex;
  justify-content:center;
  align-items:center;
}
.dummy-circle {
  position:absolute;
  top:100px;
  left:100px;
  width:400px;
  height:400px;
  border-radius:50%;
  background-color:#ff6d00;
  z-index: 2;
}

/*circle content*/
.circle-content {
  width:280px;
  height:280px;
  color:#333;
}
.config_lang{
  text-align:end;
  color:darkgray;
  position:relative;
}

.selected_lang{
  text-align:center;
  font-size:4rem;
  color:lightcyan;
  opacity:0.8;
}

.logo_img{
  display:flex;
  margin:0 auto;
  width:230px;
  height:230px;
}


.selected_lang{
  margin-top:0;
}

.logo_img img{
  width:100%;
  height:auto;
  display:block;
  align-items:center;
}

.font-cog{
  opacity:0.8;
  border:5px solid rgba(224,255,255,0.8);
  border-radius:10px;
  padding:3px;
  width:30px;
  height:30px;
  position:absolute;
  top:-100px;
  right:10px;
}


.radio-wrapper {
  text-align:start;
  padding-left:50px;
}

.radio-wrapper li{
  font-size:1.2rem;
}


/*time manegement*/
.time-management{
  grid-column: 2;
  grid-row: 1 / 3;
  width:450px;
  height:200px;
}


.timer_text{
  text-align:center;
  height:130px;
  font-size:7rem;
}

.btn{
  width:250px;
  height:60px;
  text-align:center;
  margin:0 auto;
  font-size:2.5rem;
  margin-top:20px;
  border-radius:10px;
  color:#333;
}

.start_btn{
  background-color:skyblue;
}

.cancel_btn{
  background-color:lightcoral;
}

/*record wrapper*/
.record-wrapper{
  grid-column: 2;
  grid-row: 3 / 5;
  width:450px;
  height:200px;
  align-self:flex-start;
  border:4px solid lightcyan;
  border-radius:20px;
  font-size:1.2rem;
}

.record-wrapper  li{
  border-bottom:1px solid lightcyan;
  margin:5px 20px;
}

/* media query pc*/
@media (min-width:1100px) and (max-width:1300px){
  .time-management{
    grid-column: 2;
    grid-row: 1 / 3;
    width:300px;
    height:200px;
  }

  .record-wrapper{
    grid-column: 2;
    grid-row: 3 / 5;
    width:300px;
    height:200px;
    align-self:flex-start;
  }

}

/*tablet extra large 1150*/
@media (max-width:1200px){
  .timer .grid{
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: 500px 250px 250px;  
    gap:10px;
    height:100%;
  }

  .clock{
    grid-column:1;
    grid-row: 1;
    width:500px;
    height:500px;
    justify-self: center;
  }

  .outer-circle{
    width:400px;
    height:400px;
    top:50px;
    left:50px;
  }
  .inner-circle{
    width:350px;
    height:350px;
    top:75px;
    left:75px;
  }
  .dummy-circle{
    width:350px;
    height:350px;
    top:75px;
    left:75px;
  }
  .circle-content {
    width:250px;
    height:250px;
  }

  .selected_lang{
    font-size:3.5rem;
  }

  .selected_lang{
    margin-top:0;
  }

  .logo_img{
    width:200px;
    height:200px
  }

  .font-cog{
    border:5px solid rgba(224,255,255,0.8);
    border-radius:10px;
    padding:3px;
    width:30px;
    height:30px;
    top:-50px;
    right:20px;
  }

  .time-management{
    grid-column:1;
    grid-row: 2;
    justify-self: center;
    align-self:flex-start;
  }

  .record-wrapper{
    grid-column:1;
    grid-row: 3;
    justify-self: center;
  }
}

/*tablet large*/
@media (min-height:1000px){
  .timer .grid{
    height:100vh;
  }
}

/*tablet middle 750 && mobile large and middle*/
@media  (max-width:750px){
  .timer .grid{
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: 400px 300px 400px;  
    gap:20px;
    height:100%;
  }

  .clock{
    grid-column:1;
    grid-row: 1;
    width:300px;
    height:300px;
    justify-self: center;
    align-self:center;
  }

  .outer-circle{
    width:300px;
    height:300px;
    top:0;
    left:0;
  }
  .inner-circle{
    width:260px;
    height:260px;
    top:20px;
    left:20px;
  }
  .dummy-circle{
    width:260px;
    height:260px;
    top:20px;
    left:20px;
  }
  .circle-content {
    width:180px;
    height:180px;
  }
  .selected_lang{
    font-size:2.5rem;
  }

  .selected_lang{
    margin-top:0;
  }

  .logo_img{
    width:150px;
    height:150px;
  }

  .font-cog{
    border:5px solid rgba(224,255,255,0.8);
    border-radius:10px;
    padding:3px;
    width:30px;
    height:30px;
    top:-50px;
    right:10px;
  }

  .time-management{
    width:80%;
  }
  .record-wrapper{
    width:80%;
  }
}

/* mobile small*/
@media (max-width:576px){
  .timer .grid{
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: 300px 200px 300px;  
    gap:20px;
    height:100%;
    margin-bottom:55px;
  }

  .clock{
    grid-column:1;
    grid-row: 1;
    width:250px;
    height:250px;
    justify-self: center;
    align-self:center;
  }

  .outer-circle{
    width:250px;
    height:250px;
    top:0;
    left:0;
  }
  .inner-circle{
    width:230px;
    height:230px;
    top:10px;
    left:10px;
  }
  .dummy-circle{
    width:230px;
    height:230px;
    top:10px;
    left:10px;
  }
  .circle-content {
    width:180px;
    height:180px;
  }

  .selected_lang{
    margin-top:5px;
  }

  .logo_img{
    width:130px;
    height:130px;
  }

  .font-cog{
    border:5px solid rgba(224,255,255,0.8);
    border-radius:10px;
    padding:3px;
    width:30px;
    height:30px;
    top:-50px;
    right:10px;
  }


  .time-management{
    width:80%;
  }

  .timer_text{
    font-size:6rem;
    height:100px;
  }

  .btn{
    font-size:3rem;
    width:200px;
    height:60px;
  }

  .record-wrapper{
    width:80%;
    align-self:flex-start;
    font-size:1rem;
  }
}

@media (max-width:350px){
  .timer .grid{
    margin-bottom:20px;
  }

  .timer_text{
    font-size:5rem;
    height:100px;
  }

  .btn{
    font-size:2rem;
    width:200px;
    height:60px;
  }

  .record-wrapper{
    align-self:flex-start;
    font-size:0.9rem;
  }

}
</style>