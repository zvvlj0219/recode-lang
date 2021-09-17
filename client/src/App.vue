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
    Footer
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


