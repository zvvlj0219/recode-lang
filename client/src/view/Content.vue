<template>
  <div class="router-wrapper">
    <router-view class="router-content"></router-view>
  </div>
</template>
    
<script>
export default {
  name:'Content'
}
</script>

<style scoped>
.router-wrapper{
  flex:1;
  background-color:rgba(216,243,220,0.4);
}
</style>
