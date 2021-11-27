<template>
  <div id="login">
    <h2>&lt;record-lang&gt;</h2>
    <form>
      <h3 v-if="errormsg" class="errormsg">
        Eメールアドレスもしくはパスワードが間違っています。
        ログインしなおしてください。
      </h3>
      <div>
        <label for="Email1">Eメールアドレス :</label>
        <input 
          type="email" 
          id="Email1" 
          v-model="login_email"
        >
      </div>
      <div>
        <label for="Password1" >パスワード :</label>
        <input 
          type="password" 
          id="Password1"
          v-model="login_password"
        >
      </div>
      <div class="flex">
        <input 
          type="button" 
          class="submit"
          v-on:click="submit_login()"
          value="ログイン"
        >
        <input 
          type="button" 
          value="→新規登録"
          v-on:click="$router.push('/register')"
        >
      </div>
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
        if(email && token){
          this.$router.push('/dashboard');
          this.login_email = '';
          this.login_password = '';
          console.log(response.data.email);
        }
      }catch(e){
        this.errormsg = true;
        console.log(e)
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


