<template>
  <div id="app">
    <Header/>
    <div class="main">
      <Aside/>
      <Content/>
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
    Footer,
  },
}
</script>

<style>
body{
  margin:0;
  max-height:100vh;
}
/* main */
.main{
  display: flex;
  height:100%;
}

/*
@media (max-width:576px){
  body{
    max-height:calc(100vh - 45px);
  }
}*/
</style>


