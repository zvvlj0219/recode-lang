<template>
  <div id="app">
    <Header/>
    <router-view 
      v-if="!authentication"
      v-on:loginComplete="loginComplete"
    ></router-view>
    <div v-else class="main">
      <Aside />
      <Content />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './view/Header.vue';
import Aside from './view/Aside.vue';
import Content from './view/Content.vue';
import Footer from './view/Footer.vue';

export default {
  name: 'App',
  components:{
    Header,
    Aside,
    Content,
    Footer
  },
  data(){
    return {
      authentication:true,
      //とりあえずデータで管理し後々はvuexで管理する
    }
  },
  created(){
    if(!this.authentication){
      this.$router.push('/login');
    }
  },
  methods:{
    loginComplete(){
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style>
body{
  margin:0;
}

#id {
  width:100%;
}
/* main */
.main{
  display: flex;
}
</style>


