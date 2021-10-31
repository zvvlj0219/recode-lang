<template>
  <div 
    class="aside"
  >
    <nav>
      <ul>
        <li 
          v-for="item in aside"
          v-bind:key="item.name"
        >
          <router-link 
          class="text-lightcyan" 
          v-bind:to="item.path"
          >{{item.name}}</router-link>
        </li>
      </ul>
    </nav>
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
      ],
    }
  },
}
</script>

<style scoped>
.aside {
  align-self:flex-start;
  min-width:200px;
  background-color:var(--dark2-color);
  height:100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.aside a{
  margin:15px 40px;
  display:block;  
}
</style>