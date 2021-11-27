<template>
  <div id="register">
    <h2>&lt;record-lang&gt;</h2>
    <form>
      <div>
        <label for="Email1" >Eメールアドレス : </label>
        <input 
          type="email" 
          id="Email1" 
          v-model="register_email"
        >
      </div>
      <div>
        <label for="exampleInputUsername1">ニックネーム : </label>
        <input 
          type="text" 
          id="exampleInputUsername1"
          v-model="register_username"
        >
      </div>
      <div >
        <label for="exampleInputPassword1" >パスワード : </label>
        <input 
          type="password" 
          id="exampleInputPassword1"
          v-model="register_password"
        >
      </div>
      <input 
        type="button" 
        v-on:click="submit_register()"
        value="新規登録"
      >
    </form>    
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

<style scoped>
#register{
  max-width:100%;
  height:100vh;
  color:lightcyan;
}
</style>


