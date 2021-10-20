<template>
  <div>
    <div class="form">
      <form>
        <div class="email">
          <label for="Email1">Email address</label>
          <input 
            type="email" 
            id="Email1" 
            v-model="login_email"
          >
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="passwaord">
          <label for="Password1" >Password</label>
          <input 
            type="password" 
            id="Password1"
            v-model="login_password"
          >
        </div>
        <div class="check">
          <input type="checkbox" id="Check1">
          <label  for="Check1">Check me out</label>
        </div>
        <input 
          type="button" 
          class="submit"
          v-on:click="submit_login()"
          value="submit"
        >
      </form>    
    </div>
  </div>
</template>

<script>
import authService from '../modules/authService';

export default {
  name:'login',
  data(){
    return {
      login_email:'',
      login_password:''
    }
  },
  methods:{
    async submit_login(){
      try{
        const response = await authService.login(this.login_email,this.login_password);
        const email = response.data.email;
        const token = response.data.token;
        this.$store.dispatch('updateEmail',email);
        this.$store.dispatch('updateIdToken',token);
        this.$router.push('/dashboard');
        this.login_email = '';
        this.login_password = '';
        console.log(response.data.email);
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>


