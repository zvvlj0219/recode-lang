<template>
  <div>
    <div >
      <form>
        <div>
          <label for="Email1" >Email address</label>
          <input 
            type="email" 
            id="Email1" 
            v-model="register_email"
          >
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div>
          <label for="exampleInputUsername1">User name</label>
          <input 
            type="text" 
            id="exampleInputUsername1"
            v-model="register_username"
          >
        </div>
        <div >
          <label for="exampleInputPassword1" >Password</label>
          <input 
            type="password" 
            id="exampleInputPassword1"
            v-model="register_password"
          >
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox"  id="exampleCheck1">
          <label  for="exampleCheck1">Check me out</label>
        </div>
        <input 
          type="button" 
          v-on:click="submit_register()"
          value="submit"
        >
      </form>    
    </div>
  </div>
</template>

<script>
import authService from '../modules/authService';

export default {
  name:'register',
  data(){
    return {
      register_email:'',
      register_username:'',
      register_password:''
    }
  },
  methods:{
    async submit_register(){
      try{
        const response = await authService.register(
          this.register_email, 
          this.register_username,  
          this.register_password
        )
        console.log(response);
        this.register_email = '' ;
        this.register_username = '' ;
        this.register_password = '' ;
        this.$router.push('/login');
      }catch(e){
        console.log(e)
      }
    },
  }
}
</script>


