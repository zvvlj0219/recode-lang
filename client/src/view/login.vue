<template>
  <div id="login">
    <h2>&lt;record-lang&gt;</h2>
    <form>
      <h3 v-if="errormsg" class="errormsg">
        Eメールアドレスもしくはパスワードが間違っています。
        ログインしなおしてください。
      </h3>
      <div>
        <label for="Email1">Email address</label>
        <input 
          type="email" 
          id="Email1" 
          v-model="login_email"
        >
        <div id="emailHelp" class="form-text">
          <p class="text-dimgray">We'll never share your email with anyone else.</p>
        </div>
      </div>
      <div>
        <label for="Password1" >Password</label>
        <input 
          type="password" 
          id="Password1"
          v-model="login_password"
        >
      </div>
      <input 
        type="button" 
        class="submit"
        v-on:click="submit_login()"
        value="login"
      >
    </form>    
  </div>
</template>

<script>
import authService from '../modules/authService';

export default {
  name:'login',
  data(){
    return {
      login_email:'',
      login_password:'',
      errormsg:false
    }
  },
  methods:{
    async submit_login(){
      try{
        const response = await authService.login(this.login_email,this.login_password)
        const email = response.data.email;
        const token = response.data.token;
        this.$store.dispatch('updateEmail',email);
        this.$store.dispatch('updateIdToken',token);
        this.$router.push('/dashboard');
        this.login_email = '';
        this.login_password = '';
        console.log(response.data.email);
      }catch(e){
        this.errormsg = true;
      }
    }
  }
}
</script>

<style scoped>
#login{
  height:100vh;
  color:lightcyan;
}

.errormsg{
  color:lightcoral;
}
</style>


