import axios from 'axios';

const url = 'api/v1/account';

class authService {
  //login
  static login(email,password){
    return axios.post(`${url}/login`,{
      email:email,
      password:password
    })
  }
  //register
  static register(email,username,password){
    return axios.post(`${url}/register`,{
      email:email,
      username:username,
      password:password
    })
  }
}

export default authService;