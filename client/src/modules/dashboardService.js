import axios from 'axios';

const url = 'api/v1/dashboard';

class DashboardService {
  //get record
  static getRecord(){
    const  promiseExecutor = async ()=>{
      const res = await axios.get(url);
      const data = await res.data;
      return data;
    }
    return promiseExecutor();
  }
  //aggregate data for weekly
  static aggregate_weekly(data){
    const weekly_records = [];
    
    for(let i=0;i<7;i++){
      let object = new Object;
      object.day = i;
      object.study_time = 0;
      weekly_records[i] = object;
    }
    
    data.forEach(el=>{
      let day = new Date(el.timestamps).getDay();//曜日
      // console.log(weekly_records[day].study_time);
      // console.log(el.study_time)
      weekly_records[day].study_time += el.study_time;
    });
    // console.log('weekly');
    // console.log(weekly_records)
    // console.log(typeof weekly_records)
    return weekly_records;
  }
  //aggregate data for today
  static aggregate_today(data){
    let today_records = [];
    let arr1 = [];
    let lang_box = [];
    let result = [];
    
    //今日の分のデータを抽出
    arr1 = data.filter(element=>{
      let dt = new Date();
      let today_year = dt.getFullYear();
      let today_month = dt.getMonth();
      let today_date = dt.getDate();
      let today = `${today_year}-${today_month}-${today_date}`;
      let jd = new Date(element.timestamps)
      let judgeday_year = jd.getFullYear();
      let judgeday_month = jd.getMonth();
      let judgeday_date = jd.getDate();
      let judgeday = `${judgeday_year}-${judgeday_month}-${judgeday_date}`;
      return today == judgeday;
    });
    //1言語だけを抽出
    for(let i=0;i<arr1.length;i++){
      let lang = Object.values(arr1[i])[1];
      lang_box.push(lang);
    }
    //2重複を省く
    lang_box.forEach((element,index)=>{
      if(result.indexOf(element) == -1){
        result.push(element);
        today_records.push({
          id:index,
          language:arr1[index].language,
          study_time:arr1[index].study_time,
        })
      }else{
        const duplicatedIndex = result.indexOf(element);
        const add_time = arr1[index].study_time;
        today_records[duplicatedIndex].study_time += add_time;
      }
    });
    // console.log('today');
    // console.log(today_records)
    // console.log(typeof today_records)
    return today_records;
  }
}

export default DashboardService;