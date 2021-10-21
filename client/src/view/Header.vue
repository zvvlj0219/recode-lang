<template>
  <div class="header">
    <div class="title">RECORD-LANG</div>
    <div class="acount-wrapper">
      <div>{{loggedinEmail}}</div>
      <div class="dropdown-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Header',
  computed:{
    loggedinEmail(){
      return this.$store.getters.email;
    }
  }
}
</script>

<style scoped>
/* header */
.header{
  background-color:#495057;
  height: 45px;
  color:lightcyan;
  display: flex;
  justify-content: space-between;
  z-index:10;
}

.title{
  align-self: flex-start;
  line-height: 45px;
  margin-left: 15px;
  margin-top: 0;
}

.acount-wrapper{
  align-self: center;
  margin-left: 10px;
  margin-top: 0;
  display: flex;
  color:rgba(224,255,255,.6)
}

.dropdown-list{
  width: 0px;
  height: 0px;
  align-self: center;
  margin-left: 10px;
  margin-right: 10px;
  background: transparent;
  border-top: 9px solid black;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
</style>