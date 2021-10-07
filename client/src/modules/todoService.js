import axios from 'axios';

const url = 'api/v1/todo';

class TodoService {
  //get langlist
  static getLang(){
    const promiseExecutor = async ()=>{
      const res = await axios.get(url);
      const data = await res.data;
      return data;
    }
    return promiseExecutor();
  }
  
  //create todos
  static insertTodos(lang,text){
    return axios.post(url,{
      language:lang,
      text:text
    })
  }
  
  //update todos
  static updateTodos(id,checked){
    return axios.put(`${url}/${id}`,{
      checked:checked
    })
  }

  //update tab lang
  static updateLang(list){
    return axios.put(url,{
      list:list
    })
  }
  //delete by id or many
  static commondelete(id,lang){
    return axios.delete(url,{
      data:{
        id:id,
        language:lang,
      }
    })
  }
}

export default TodoService;