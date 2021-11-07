<template>
  <div class="header">
    <div class="email">
      <p>{{loggedinEmail}}</p>
      <div 
        class="dropdown-list"
        v-on:click="toggleList"
      ></div>
    </div>
    <div 
      v-show="droplist" 
      class="logout"
      v-bind:class="{listactive :droplist}" 
    >
      
      <p v-on:click="logout">ログアウト</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Header',
  data(){
    return {
      droplist:false
    }
  },
  computed:{
    loggedinEmail(){
      return this.$store.getters.email;
    }
  },
  methods:{
    toggleList(){
      this.droplist = !this.droplist;
    },
    logout(){
      if(this.$store.getters.idToken){
        this.droplist = false;
        this.$store.dispatch('updateEmail',null);
        this.$store.dispatch('updateIdToken',null);
        this.$router.push('/login')
      }else{
        return;
      }
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
  z-index:10;
  width:100%;
}

.dropdown-list{
  position:relative;
  align-self:center;
  width: 0px;
  height: 0px;
  background: transparent;
  border-top: 9px solid lightcyan;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
.logout{
  background:#fff;
  color:#333;
  height:40px;
  width:150px;
  margin-left:auto;
  position:absolute;
  top:45px;
  right:10px;
}

.logout p {
  text-align:center;
  font-weight:bold;
  padding-top:7px;
  vertical-align:center;
}

.email{
  display:flex;
  justify-content:flex-end;
  height:45px;
  width:30%;
  margin-left:auto;
  margin-right:15px;
}

.email > p{
  align-self:center;
  padding-right:20px;
}

</style>