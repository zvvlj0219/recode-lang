<template>
  <div class="aside-menu">
    <div class="menu-list">
      <router-link 
      class="page-link"
      v-for="item in aside"
      v-bind:key="item.name"
      v-bind:to="item.path"
      >{{item.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:'Aside',
  data(){
    return {
      aside:[
        {name:'ダッシュボード',path:'/dashboard'},
        {name:'タイマー',path:'/timer'},
        {name:'ToDoリスト',path:'/todo'},
      ]
    }
  }
}
</script>

<style scoped>
/* side bar */
.aside-menu{
  background-color:#343a40;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.page-link{
  margin:15px 40px;
  display:block;
  color:lightcyan;
  text-decoration:none;
}

/* Extra Small device (desktop, less than 576px) */
@media (max-width:576px) {
  .aside-menu{
    display: none;
  }
}

/* Small devices (desktops, 576px and up) */
@media (min-width: 576px) and (max-width: 768px) {
  .aside-menu{
    min-width:170px
  }
  .menu-list{
    margin-left: -7px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .aside-menu{
    min-width: 210px;
  }
}

/* Large and Extra Large devices (desktops, 992px and up) */
@media (min-width: 992px) {  
  .aside-menu{
    min-width: 230px;
  }
}
</style>