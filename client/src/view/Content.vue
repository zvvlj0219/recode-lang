<template>
  <div 
    class="router-wrapper"
  >
    <router-view class="router-content"></router-view>
  </div>
</template>
    
<script>
export default {
  name:'Content',
}
</script>

<style scoped>
.router-wrapper{
  flex:1;
  background-color:#212529;
  height:100%;
  color:lightcyan;
}
</style>
