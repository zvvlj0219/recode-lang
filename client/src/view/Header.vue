<template>
  <div class="header">
    <div class="title">RECODE-LANG</div>
    <div class="acount-wrapper">
      <div>sample1234@gamil</div>
      <div class="dropdown-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Header'
}
</script>

<style scoped>
/* header */
.header{
  background-color:#38b000;
  color:lightcyan;
  height: 45px;
  display: flex;
  justify-content: space-between;
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