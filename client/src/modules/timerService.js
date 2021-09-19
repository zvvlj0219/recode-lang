import axios from 'axios';

const url = 'api/v1/timer';

class TimerService {
  //get Time
  static getTime(){
    const  promiseExecutor = async ()=>{
      const res = await axios.get(url);
      const data = await res.data;
      return data;
    }
    return promiseExecutor();
  }
  //create Time
  static insertTime(lang,time){
    return axios.post(url,{
      language:lang,
      study_time:time
    })
  }
}

export default TimerService;