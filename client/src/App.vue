<template>
  <div id="app">
    <Header/>
    <div class="flex">
      <Aside/>
      <Content class="content"/>
    </div>
    <Footer class="footer"/>
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
@import 'css/classname.css';
@import 'css/style.css';
</style>


